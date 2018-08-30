import './libs.scss';
import './main.scss';

import 'bootstrap';
import ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";



ReactDOM.render(
    <App/>,
    document.querySelector('.my-form'),
);


if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    ReactDOM.render(
        <NewApp/>,
        document.querySelector('.my-form'),
    );
  });
}

const $ = require('jquery');
window.$ = window.jQuery = $;





