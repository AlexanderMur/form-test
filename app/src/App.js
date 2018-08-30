import React from "react";

export default class App extends React.Component {


  render() {
    return (
        <form>

          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input type="text"
                   className="form-control"
                   id="name"
                   name="name"
                   placeholder="Введите имя"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input type="email"
                   className="form-control"
                   id="email"
                   name="email"
                   placeholder="Введите почту"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Пароль</label>
            <input type="password"
                   name="pwd"
                   className="form-control"
                   id="pwd"
                   placeholder="Пароль"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd_confirmation">Подтвердите пароль</label>
            <input type="password"
                   name="pwd_confirmation"
                   className="form-control"
                   id="pwd_confirmation"
                   placeholder="Пароль"
            />
          </div>
          <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
    );
  }
}
