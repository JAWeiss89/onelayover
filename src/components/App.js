import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Notications from './Notifications';
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
  const [notificationText, setNotificationText] = useState(null);

  const notify = (text) => {
    setNotificationText(text);
    setTimeout(() => {
      setNotificationText(null);
    }, 6000);
  }

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
      {notificationText && <Notications notificationText={notificationText} notify={notify} />}

      <Route exact path="/">
        {user ? <Redirect to="/layovers/"/> : <LandingPage /> }
      </Route>

      <Route exact path="/login">
        {user ? <Redirect to="/layovers/"/> : <LoginPage setUser={setUser} notify={notify} /> }
      </Route>

      <Route exact path="/signup" setUser={setUser}>
        {user ? <Redirect to="/layovers/"/> : <SignUpPage setUser={setUser} notify={notify} /> }
      </Route>

      <Route exact path="/layovers/">
        <LayoversPage />
      </Route>

      <Route exact path="/layovers/:layover_code">
        <LayoverDetailPage notify={notify} />
      </Route>

      <Route exact path="/layovers/:layover_code/activities/:id">
        <ActivityDetailPage notify={notify} />
      </Route>
    </div>
  );
}

export default App;
