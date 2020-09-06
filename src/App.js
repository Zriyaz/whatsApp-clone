import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router , Switch,Route} from "react-router-dom"


import Sidebar from "./Sidebar"
import Chat from "./Chat"
import Login from "./Login"
import './App.css';

import {useStateValue} from "./StateProvider"
function App() {

    const [{user}, dispatch] = useStateValue()

  return (

    <div className="app">
      {!user ? (
        <Login />
      ) : (

    <div className="app_body">
      <Router>
           <Sidebar />
           <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
           <Route exact path ="/">
             <Chat />
           </Route> 
        </Switch>
       </Router> 
     </div>
    )}    
    </div>
  );
}

export default App;
