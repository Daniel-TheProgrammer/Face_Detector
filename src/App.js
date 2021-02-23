import React, { Component } from "react";
import './App.css';
import Navigtaion from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import TextOutput from "./components/TextOutput/TextOutput";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particleOptions = {
  "particles": {
    "number": { "value": 30, "density": {"enable": true, "value_area": 200} },
    "size": { "value": .5 }
  },
  "interactivity": {
    "events": { "onhover": { "enable": true, "mode": "repulse" }}
  }
}

const initialState = {
    inputField: "",
    imageUrl: "",
    boxes: {},
    route: "signin",
    isSignedin: false,
    ouputText: "",
    user:  {
      name: "", 
      id: "",
      email: "",
      entries: 0,
      joined: "",
    }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  loadUser = (newUser) => {
    this.setState({user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      entries: newUser.entries,
      }
    })
  }

  imageConcepts = (concepts) => {
    let outputArray = [];
    
    // if concepts[0].value > .95 we add it to our output array 
    concepts.forEach(concept => {
      if(concept.value > .95) {
        outputArray.push(concept.name);
      }
    });

    let outputString = "";

    for(let i = 0; i < outputArray.length; i++){
      if (i !== outputArray.length - 1) {
        outputString += outputArray[i] + ", ";
      } else {
        outputString += "and " + outputArray[i] + ".";
      }
    }

    return `${outputArray.length} words that describe your image are: ${outputString}`
    
  }

  calculateFaceLocation = (response) => {
    let returnedFaces = [];
    
    // determine if response/input is zero faces, an array of faces, or a single face
    // get bounding boxes from the response
    if(!response.faceBoxes.regions){

    } else if (response.faceBoxes.regions.length > 1){
      returnedFaces = response.faceBoxes.regions.map(box =>{
        return box.region_info.bounding_box;
      })
    } else {
      returnedFaces = response.faceBoxes.regions[0].region_info.bounding_box;
    }
    
    //get dimensions of the input image
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    let boundingBoxes = {};
    
    // determine if bounding box is singular or an array of boxes
    // get cooridinates of box/boxes corner points
    if(returnedFaces.length > 1){
      boundingBoxes = returnedFaces.map(face => {
        return {
          leftCol: width * face.left_col,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          botRow: height - (face.bottom_row * height),
        }
      })
    } else {
      boundingBoxes = {
        leftCol: width * returnedFaces.left_col,
        topRow: returnedFaces.top_row * height,
        rightCol: width - (returnedFaces.right_col * width),
        botRow: height - (returnedFaces.bottom_row * height),
      }
    }
    
    return boundingBoxes;
  }
  
  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  inputChange = (event) => {
    this.setState({inputField: event.target.value});
  }

  keyPress = (event) => {
    if(event.key === "Enter"){
      this.onPictureSubmit();
    }
  }

  onPictureSubmit = (event) => {
    if(this.state.imageUrl === this.state.inputField){
      return 1
    }

    this.setState({imageUrl: this.state.inputField});
    
    fetch("https://calm-beyond-96205.herokuapp.com/imageurl", { // https://calm-beyond-96205.herokuapp.com http://localhost:3000/imageurl
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            inputField: this.state.inputField,
        })
      })
      .then(response => response.json())
      .then(response => { 
        
        if(response){

          let updatedEntries = 0;
          if(response.faceBoxes.regions){
            updatedEntries = response.faceBoxes.regions.length;
          } else {
            updatedEntries = 1;
          }
            fetch("https://calm-beyond-96205.herokuapp.com/image", {
              method: "put",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  id: this.state.user.id,
                  entries: updatedEntries //number of entries to update
              })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
          this.setState({ouputText: this.imageConcepts(response.concepts)});
      })
      .catch(err => console.log("OnPictureSubmit error: ", err));
  }

  onRouteChange = (route) => {
      if(route === "signout"){
        this.setState(initialState)
      } else if(route === "home") {
        this.setState({isSignedin: true})
      } 
      this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <header>
          <Logo />
          <Navigtaion onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
        </header>

        {
          this.state.route === "home"
            ? 
              <div>
                <Rank 
                    name={this.state.user.name} 
                    entries={this.state.user.entries} 
                />
                <ImageLinkForm inputChange={this.inputChange} keyPress={this.keyPress} onPictureSubmit={this.onPictureSubmit}/>
                <TextOutput text={this.state.ouputText} />
                <FaceRecognition boxes={this.state.boxes} image={this.state.imageUrl} />
              </div>
            : 
              this.state.route === "signin" || this.state.route === "signout"
            ? 
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : 
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;
