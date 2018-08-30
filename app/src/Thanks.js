import React from "react";
import IsEmail from 'isemail';

export default class App extends React.Component {
  render(){
    let {name, email} = this.props
    return (
          <div className="jumbotron text-xs-center">
            <h1 className="display-3">Добро пожаловать, {name}</h1>
            <p className="lead"><strong>Please check your email {email}</strong> for further instructions on how to complete
              your account setup.</p>
            <hr/>
            <p>
              Having trouble? <a href="#">Contact us</a>
            </p>
            <p className="lead">
              <a className="btn btn-primary btn-sm" href="/" role="button">Home</a>
            </p>
          </div>
    )
  }
}

