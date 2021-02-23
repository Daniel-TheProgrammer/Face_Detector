import React from "react";
import validator from 'validator';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            signInEmail: "",
            signInPassword: "",
        }
    }

    keyPress = (event) => {
        if(event.key === "Enter"){
            this.onRegisterSubmit(event);
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onRegisterSubmit = (event) => {
        event.preventDefault()

        const formName = validator.trim(this.state.name)
        const formEmail = validator.trim(this.state.signInEmail)
        
        fetch("https://calm-beyond-96205.herokuapp.com/register", { // https://calm-beyond-96205.herokuapp.com http://localhost:3000/register
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: formName,
                email: formEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange("home")
            } 
        })
    }

    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center transparent-bg">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset onKeyPress={this.keyPress} id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input  onChange={this.onNameChange}
                                        name="name" 
                                        type="text" 
                                        id="name"
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input  onChange={this.onEmailChange}
                                        name="email-address" 
                                        type="email" 
                                        id="email-address" 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input  onChange={this.onPasswordChange}
                                        name="password"  
                                        type="password" 
                                        id="password" 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input  onClick={this.onRegisterSubmit}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Register" 
                            />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Register;