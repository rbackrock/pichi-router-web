import React from 'react';
import ReactDOM from 'react-dom';
import store from "@src/store";
import Router from "@router/router";
import Provider from "react-redux/es/components/Provider";
import '@src/index.css';

const App = (props) => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
