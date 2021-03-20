import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { createContext, useEffect, useState } from 'react';
import Destination from './Pages/Destination/Destination';
import { auth } from './firebase/firebase';


export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user=> {
      setLoggedInUser(user);
    })
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login  />
          </Route>
          <Route exact path="/destination">
            <Redirect to='/destination/bike'/>
          </Route>
          <Route path="/destination/:id">
            <Destination />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
