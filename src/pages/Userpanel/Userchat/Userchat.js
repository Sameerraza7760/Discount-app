import React, { useState,useEffect } from 'react';
import { Avatar, Button, Input, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { getDocs,db,collection,onSnapshot,query,where,addDoc,auth,serverTimestamp } from './../../../Config/firebase/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },

  
  sidebar: {
    width: '200px',
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(2),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  chatContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
  },
  messageList: {
    maxHeight: 'calc(100% - 40px)',
    overflowY: 'auto',
  },
  inputContainer: {
    padding: theme.spacing(2),
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    // marginTop:'500px'
    // height:'1400px'
  },
  input: {
    marginRight: theme.spacing(2),
    width: '100%',
    marginTop:'590px'
  },
  message: {
 
    padding: theme.spacing(2),
    borderRadius: '8px',
    backgroundColor: '#e1e1e1',
    maxWidth: '80%',
   
  },
}));

const Userchat = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [adminName,setAdminName]=useState([])





  

useEffect(()=>{
    const getAdminName=async()=>{
        const querySnapshot = await getDocs(collection(db, "Admin"));
        const admin_array=[]
        querySnapshot.forEach((doc) => {
            admin_array.push({ id: doc.id, ...doc.data()})
        })
  
        console.log(admin_array);

        setAdminName(admin_array)

       
    }

    getAdminName()
},[])

let yoursID;
let chatRoomId;
let friendid;
let youremail;





const handleSidebarItemClick = (item) => {
  
if(item){
  
  yoursID = auth.currentUser.uid;
  friendid = item.id;
  youremail=auth.currentUser.email
  console.log(yoursID,friendid,youremail);

  if (yoursID && friendid) {
    chatRoomId = yoursID < friendid ? yoursID + friendid : friendid + yoursID;
    localStorage.setItem('chatid', chatRoomId);
    localStorage.setItem('friendid',friendid)
  
  } else {
    console.log("yoursID or friendid is undefined. Cannot set chatRoomId.");
  }
}
};

let chatId = localStorage.getItem('chatid');
let recieverid=localStorage.getItem('friendid')


const handleSendMessage = async () => {
  if (chatId) {
    try {
      const docref = await addDoc(collection(db, "messeges"), {
        messege: newMessage,
        chatRoomId: chatId,
        timestamp: serverTimestamp(),
        costumerEmail:auth.currentUser.email,
        recieverid:recieverid,
        senderid:auth.currentUser.uid
      });

      
      setNewMessage('')

   
    } catch (error) {
      console.log("Error sending message:", error.message);
    }
  } else {
    console.log("chatRoomId is undefined. Cannot send message.");
  }
};



const getAllMesseges = () => {
    const q = query(collection(db, 'messeges'), where("chatRoomId", '==', chatId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messeges = [];
      querySnapshot.forEach((doc) => {
        messeges.push(doc.data());
      });
  
      displayMesseges(messeges);
    });
  
  };
  
  getAllMesseges();
  
  const displayMesseges = (messege) => {
  //   console.log("here ==> ", messege);
    setMessages(messege);
  };
  return (
    <div className={classes.root}>
    {/* Sidebar */}
    <Paper className={classes.sidebar}>
      <List>
        {adminName.map((user) => (
          <ListItem key={user.id} button onClick={() => handleSidebarItemClick(user)} >
            <ListItemAvatar>
              <Avatar>{user.email.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.email.slice(0,5)} />
          </ListItem>
        ))}
      </List>
    </Paper>

    {/* Main Chat Area */}
    <div className={classes.chatContainer}>
      {/* Input for New Message */}
    

      <Paper className={classes.messageList}>
        {/* Display messages here */}
        {messages?.map((item) => (
          <div key={item.id}>{item.messege}</div>
        ))}
      </Paper>



      <div className={classes.inputContainer}>
        <Input
          className={classes.input}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
          onPressEnter={handleSendMessage}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          style={{marginTop:'550px'}}
        >
          Send
        </Button>
      </div>
    </div>
  </div>
  );
};

export default Userchat;