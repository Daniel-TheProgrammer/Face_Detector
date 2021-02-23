import React from "react";
import "./faceRecognition.css";

const FaceRecognition = ({boxes, image}) => {
    let rows = [];
    const drawBoxes = () => {
        //draw multiple boxes
        if(boxes instanceof Array){
            const multilpleBoxes = boxes.map(box =>{
                return (<div key={box.topRow} className="bounding-box" style={{
                    top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.botRow, 
                    left: box.leftCol
                    }}></div>)
            })
            return multilpleBoxes;
        //draw one box
        } else if (boxes.botRow){
            return (<div className="bounding-box" style={{
                top: boxes.topRow, 
                right: boxes.rightCol, 
                bottom: boxes.botRow, 
                left: boxes.leftCol
                }}></div>)
        //draw zero boxes
        } else {
            return <div></div>
        }
    }

    rows = drawBoxes();

    if({image}){
        return (
            <div className="center ma">
                <div className="absolute mt2 ">
                    <img id="inputimage" src={image} width="500px" height="auto" alt="" />
                    {rows}
                </div>
            </div>
        );
    }
}

export default FaceRecognition;