import {
  Button,
  Input,
  List,
  Paper,
  makeStyles
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import {
  addDoc,
  auth,
  collection,
  db,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "./../../../Config/firebase/firebase";
import { useTheme } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  const themeInstance = useTheme();

  return {
    root: {
      display: 'flex',
      height: '100vh',
      width: '100%',
      flexWrap: 'wrap',
    },

    sidebar: {
      width: '250px',
      backgroundColor: 'lightgreen',
      padding: theme.spacing(2),
    
    },

    chatContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: theme.spacing(2),
      width: '100%',
      backgroundColor: '#ecf0f1',
    },

    inputContainer: {
      padding: theme.spacing(2),
      borderTop: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: '8px',
      marginTop: '40px',
      bottom: 0,
      width: '80%',
      position: 'fixed',
    },

    userMessage: {
      backgroundColor: "gray",
      color: "#fff",
      padding: "10px",
      borderRadius: "12px",
      maxWidth: "70%",
      alignSelf: "flex-end",
      wordWrap: "break-word",
      marginBottom: "5px",
    },
  
    receiverMessage: {
      backgroundColor: "grey",
      color: "#fff",
      padding: "10px",
      borderRadius: "12px",
      maxWidth: "100%",
      alignSelf: "flex-start",
      wordWrap: "break-word",
      marginBottom: "5px",
    },
    input: {
      marginRight: theme.spacing(2),
      width: '70%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },

    sendButton: {
      width: '130px',
      height: '40px',
      backgroundColor: '#3498db',
      color: '#fff',
      borderRadius: '5px',
    },
    backbtn:{
      width: '130px',
      height: '40px',
      backgroundColor: '#3498db',
      color: '#fff',
      borderRadius: '5px',
    },

    [themeInstance.breakpoints.down('sm')]: {
      sidebar: {
        width: '100%',
      },
      chatContainer: {
        width: '100%',
      },
    },
  };
});



const Adminchat = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setNames] = useState([]);
  const [chatRoomId, setChatRoomId] = useState([]);


  const navigate=useNavigate()
  useEffect(() => {
    const getAllName = async () => {
      try {
        const docsRef = collection(db, "messeges");
        const querySnapshot = await getDocs(docsRef);
        const Names = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNames(Names);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    getAllName();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "messeges"),
      where("chatRoomid", "==", chatRoomId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messeges = [];
      querySnapshot.forEach((doc) => {
        messeges.push(doc.data());
      });

      console.log(messeges);
      setMessages(messeges);

      return () => unsubscribe();
    });
  }, [chatRoomId]);

  const handleSidebarItemClick = async (item) => {
    setChatRoomId(item.chatRoomid);
  };

  const sendMessege = async () => {
    
    if (chatRoomId && newMessage.trim() !== '') {
      const messageData = {
        message: newMessage,
        email: auth?.currentUser?.email,
        senderId: auth?.currentUser?.uid,

        timestamp: serverTimestamp(),
        chatRoomid: chatRoomId,
      };

      const messagesRef = collection(db, "messeges");

      try {
        await addDoc(messagesRef, messageData);

        console.log("Message sent successfully!");
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    } else {
      console.log("id not found");
    }
  };

  return (
    <div className={classes.root} id="root" >
      {/* Sidebar */}
      <Paper className={classes.sidebar} id="slidebar" >

        <Paper className={classes.sidebar}>
          <List>
          <Button
            variant="contained"
            color="primary"
            endIcon={ <ArrowBackIcon />}
            onClick={()=>navigate('/adminHome')}
            className={classes.backbtn}
            style={{marginBottom:'20px'}}
          >
            Back
          </Button>
            {Array.from(new Set(name.map((item) => item.email)))
              .filter((email) => email !== auth.currentUser.email)
              .map((email, index) => {
                const item = name.find((item) => item.email === email);

                return (
                  <div key={index}>
                    {/* Updated button styles */}
                    <Button
                      type="primary"
                      className={classes.sidebarButton}
                      onClick={() => handleSidebarItemClick(item)}
                    >
                      {email.replace(/\d+/g, "").split("@")[0]}
                    </Button>
                  </div>
                );
              })}
          </List>
        </Paper>
      </Paper>

      {/* Main Chat Area */}
      <div className={classes.chatContainer} id="chatContainer" >
        {/* Input for New Message */}
         
        <Paper className={classes.messageList}>
          {/* Display messages here */}
          {messages.map((item, index) => (
            <div
              key={index}
              className={
                item.sender === "user"
                  ? classes.userMessageContainer
                  : classes.receiverMessageContainer
              }
            >
              <div
                className={
                  item.sender === "user"
                    ? classes.userMessage
                    : classes.receiverMessage
                }
              >
                {item.message}
              </div>
            </div>
          ))}
        </Paper>

        <div className={classes.inputContainer}>
          {/* Updated input styles */}
          <Input
            className={classes.input}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          {/* Updated button styles */}
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={sendMessege}
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Adminchat;
