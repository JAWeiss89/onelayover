import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from '../page-components/LandingPage';
import SignUpPage from '../page-components/SignUpPage';
import LayoversPage from '../page-components/LayoversPage';
import LayoverDetailPage from '../page-components/LayoverDetailPage';
import LoginPage from '../page-components/LogInPage';
import ActivityDetailPage from '../page-components/ActivityDetailPage';
import '../styles/App.css';
import OnelayoverAPI from '../onelayoverAPI';



function App() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (localStorage._token && localStorage.userID) {
        let foundUser = await OnelayoverAPI.getUser(localStorage.userID);
        setUser(foundUser);
      }
    }
    checkIfLoggedIn();
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      {/* <h1><span className="App-logo-one">one</span><span className="App-logo-layover">layover</span></h1>
      <h2>landing soon!<i className="fas fa-plane"></i></h2> */}
      <Route exact path="/">
        {user ? <Redirect to="/layovers/"/> : <LandingPage /> }
      </Route>

      <Route exact path="/login">
        {user ? <Redirect to="/layovers/"/> : <LoginPage setUser={setUser} /> }
      </Route>

      <Route exact path="/signup" setUser={setUser}>
        {user ? <Redirect to="/layovers/"/> : <SignUpPage setUser={setUser} /> }
        
      </Route>
      <Route exact path="/layovers/">
        <LayoversPage />
      </Route>
      <Route exact path="/layovers/:layover_code">
        <LayoverDetailPage />
      </Route>
      <Route exact path="/layovers/:layover_code/activities/:id">
        <ActivityDetailPage />
      </Route>
    </div>
  );
}

export default App;
