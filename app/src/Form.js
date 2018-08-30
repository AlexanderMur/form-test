import React from "react";
import IsEmail from 'isemail';

export default class Form extends React.Component {
  state = {
    name: '',
    email: '',
    pwd: '',
    pwd_confirmation: '',
    submitted: false,
    errors: {
      pwd: {
        invalid: false,
      }
    }
  };

  onChange = (/**Event*/ event) => {
    const target = event.target;
    const errors = {...this.state.errors};

    if (target.name === 'email') {
      errors.email = !IsEmail.validate(target.value);
    }
    if (target.name === 'pwd') {
      errors.pwd = this.validatePassword(target.value);
    }
    if (target.name === 'pwd_confirmation') {
      errors.pwd_confirmation = this.state.pwd !== target.value;
    }

    this.setState({
      [target.name]: target.value,
      errors,
    });
  };
  onSubmit = (/**Event*/ e) => {
    let {name,email, pwd, pwd_confirmation,errors} = this.state;

    errors.email = !IsEmail.validate(email);
    errors.pwd = this.validatePassword(pwd);
    errors.pwd_confirmation = pwd !== pwd_confirmation;
    if (errors.email || errors.pwd.invalid || errors.pwd_confirmation) {
      this.setState({
        errors,
      });
    } else {

      this.props.onSuccess({name,email,pwd,pwd_confirmation,submitted:true})
    }

    e.preventDefault();
  };
  validatePassword = (pass) => {
    const errors = {
      invalid: false
    };
    if (pass.length < 8) {
      errors.minLength = true;
      errors.invalid = true;
    }
    if (!/[A-ZА-Я]/.test(pass)) {
      errors.upperCase = true;
      errors.invalid = true;
    }
    if (!/[0-9]/.test(pass)) {
      errors.numbers = true;
      errors.invalid = true;
    }
    return errors;
  };
  render() {
    let {name,email, pwd, pwd_confirmation,errors} = this.state;
    return (
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.onChange}
                value={name}
                placeholder="Введите имя"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
                type="email"
                className={"form-control " + (errors.email && 'is-invalid')}
                id="email"
                name="email"
                onChange={this.onChange}
                value={email}
                placeholder="Введите почту"
            />
            <div className="invalid-feedback">
              Неправильная почта
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Пароль</label>
            <input
                type="password"
                name="pwd"
                onChange={this.onChange}
                value={pwd}
                className={"form-control " + (errors.pwd.invalid && 'is-invalid')}
                id="pwd"
                placeholder="Пароль"
                autoComplete={'on'}
            />
            <div className="invalid-feedback">
              Пароль должен содержать хотя бы одну заглавную букву, 1 цифру, и быть не короче 8 символов
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd_confirmation">Подтвердите пароль</label>
            <input
                type="password"
                name="pwd_confirmation"
                onChange={this.onChange}
                value={pwd_confirmation}
                className={"form-control " + (errors.pwd_confirmation && 'is-invalid')}
                id="pwd_confirmation"
                placeholder="Пароль"
                autoComplete={'on'}
            />

            <div className="invalid-feedback">
              Пароли не совпадают
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
    );
  }
}
