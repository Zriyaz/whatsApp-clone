import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AttachFile from "@material-ui/icons/AttachFile"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmotionsIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';


import "./chat.css"
import db from "./firebase"
import firebase from "firebase"
import {useStateValue} from "./StateProvider"


const Chat = (props) => {

	const [input, setInput] = useState("")
	const [seed, setSeed] = useState('')
	const {roomId} = useParams()
	const [roomName, setRoomName] = useState('')
	const [messages, setMessages] = useState([])
	const [{user}, dispatch] = useStateValue()

	useEffect(()=>{
		setSeed(Math.floor(Math.random() * 5000))

	},[roomId])

	useEffect(()=>{

		if(roomId){
			db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>(
				setRoomName(snapshot.data().name)
			))

			db.collection('rooms').doc(roomId).collection('messages').orderBy
			('timestamp', 'asc').onSnapshot(snapshot =>(
				setMessages(snapshot.docs.map(doc=>(
					doc.data()
				)))
			))
			
		}

	},[roomId])

	const sendMessage = (e) =>{
		e.preventDefault()
		db.collection('rooms').doc(roomId).collection('messages').add({
			message : input,
			name : user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		setInput("")
	}
  return (
    <div className="chat">
    	<div className="chat_header">
    		<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

    		<div className="chat_headerInfo">
    			<h3>{roomName}</h3>
    			<p>
    				Last seen{" "}
    				{
    					new Date(
    					 	messages[messages.length-1]?.
    					 	timestamp?.toDate()).toUTCString()}
    			</p>
    		</div>
    		<div className="chat_headerRight">
    			<IconButton>
    			 <DonutLargeIcon />
    			</IconButton>
    			 <IconButton>
    			   <AttachFile />
    			 </IconButton>
    			<IconButton>
    			  <MoreVertIcon />
    			 </IconButton>	
    		</div>
    	</div>

    	<div className="chat_body">

    		{messages.map((message,index)=>(
    			<p key={index} className={`chat_massages  ${
    			  message.name === user.displayName && 'chat_receiver'}`}>

    		      <span className="chat_name">{message.name}</span>
    			  {message.message}	
    			  <span className="chat_timestamp">
    			  {new Date(message.timestamp?.toDate()).toUTCString()}
    			  </span>
            	</p>
    		))}
    	</div>

    	<div className="chat_footer">
    		<InsertEmotionsIcon />

    		<form>
    			<input 
    			  placeholder="Enter a message" 
    			  type="text" 
    			   onChange = {e => setInput(e.target.value)}
    			   value ={input}
    			  />
    			<button 
    			  onClick = {sendMessage} 
    			  type="submit"
    			  value ={input}
    			  >
    			  Send a massage</button>
    		</form>
    		<MicIcon />
    	</div>

    </div>
  )
}

export default Chat;