import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Route } from 'react-router-dom';
import SignUpPage from '../page-components/SignUpPage';
import LayoversPage from '../page-components/LayoversPage';
import LayoverDetailPage from '../page-components/LayoverDetailPage';
import LoginPage from '../page-components/LogInPage';
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
        <h1>Landing Page</h1>
      </Route>
      <Route exact path="/login">
        <LoginPage setUser={setUser} />
      </Route>
      <Route exact path="/signup" setUser={setUser}>
        <SignUpPage setUser={setUser} />
      </Route>
      <Route exact path="/layovers/">
        <LayoversPage />
      </Route>
      <Route exact path="/layovers/:layover_code">
        <LayoverDetailPage />
      </Route>
    </div>
  );
}

export default App;
