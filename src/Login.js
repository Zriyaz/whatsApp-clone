import React from 'react';
import {Button} from "@material-ui/core"
import {auth, provider} from "./firebase"


import {useStateValue} from "./StateProvider"
import {actionTypes} from "./Reducer"
import "./Login.css"



const Login = (props) => {

	const [{}, dispatch] = useStateValue()

  const SignIn = () =>{
  	auth.signInWithPopup(provider).then((result)=>{

  	 dispatch({
  	 	type: actionTypes.SET_USER,
  	 	user : result.user
  	 })		
  	}).catch((err)=>console.log(err.message))

  }	
  return (
    <div className="login">
      <div className="login_container">
      	<img
      	  src="image/WhatsApp.svg" 
      	  alt="Pic"
      	/>
      	<div className="login_text">
      		<h1>Sign In to WhatsApp</h1>
      	</div>
      	<Button type="submit" onClick={SignIn}>Sign In with Google</Button>
      </div>	
    </div>
  )
}

export default Login;