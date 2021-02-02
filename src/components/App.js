import React from 'react';
import Navbar from './Navbar';
import { Route } from 'react-router-dom';
import SignUpPage from '../page-components/SignUpPage';
import '../styles/App.css';



function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <h1><span className="App-logo-one">one</span><span className="App-logo-layover">layover</span></h1>
      <h2>landing soon!<i className="fas fa-plane"></i></h2> */}
      <Route exact path="/">
        <h1>Landing Page</h1>
      </Route>
      <Route exact path="/login">
        <h1>Login Page</h1>
      </Route>
      <Route exact path="/signup">
        < SignUpPage />
      </Route>
      <Route exact path="/layovers/">
        <h1>List of layovers</h1>
      </Route>
      <Route exact path="/layovers/:layover_code">
        <h1>Layover detail page</h1>
      </Route>
    </div>
  );
}

export default App;
