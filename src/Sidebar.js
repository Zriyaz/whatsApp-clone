import React, {useState, useEffect} from 'react';
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {SearchOutlined} from "@material-ui/icons"

import db from "./firebase"
import SidebarChat from "./SidebarChat"
import "./sidebar.css"

import {useStateValue} from "./StateProvider"
//import {actionTypes} from "./Reducer"


const Sidebar = ({addNewChat}) => {

    const [rooms, setRooms] = useState([])
    const [{user}] = useStateValue()

    useEffect(()=>{
        db.collection("rooms").onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc)=>({
                id : doc.id,
                data : doc.data()
            })))
        ))
    },[])
  return (
    <div className="sidebar">
    	<div className="sidebar_header">	
    		<Avatar src={user?.photoURL} />
    		<div className="sidebar_headerRight">
    		   <IconButton>
    			 <DonutLargeIcon />
    			</IconButton>
    			 <IconButton>
    			   <ChatIcon />
    			 </IconButton>
    			<IconButton>
    			  <MoreVertIcon />
    			 </IconButton>
    			
    		</div>
    	</div>

    	<div className="sidebar_search">
    		<div className="sidebar_searchContainer">
    			<SearchOutlined />
    		    <input placeholder="search" type="text" />
    		</div>
    	</div>

    	<div className="sidebar_chats">
    		<SidebarChat addNewChat />	
    		{rooms.map(room =>(
                <SidebarChat 
                  key = {room.id} 
                  id = {room.id}
                  name = {room.data.name} 
                />
            ))
        }
    	</div>
    </div>
  )
}

export default Sidebar;