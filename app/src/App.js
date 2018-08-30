import React from "react";
import IsEmail from 'isemail';
import Thanks from "./Thanks";
import Form from "./Form";

export default class App extends React.Component {

  state = {
    name: '',
    email: '',
    pwd: '',
    pwd_confirmation: '',
    submitted: false,
  }

  render() {
    let {name,email,submitted} = this.state;

    if (!submitted) {
      return (
          <Form onSuccess={(obj)=>this.setState(obj)}/>
      );
    } else {
      return (
          <Thanks name={name} email={email}/>
      );
    }
  }
}
