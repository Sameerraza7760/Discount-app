import {
  Avatar,
  Button,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
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
const useStyles = makeStyles((theme) => {
  const themeInstance = useTheme();

  return {
    root: {
      display: "flex",
      height: "100vh",
      width: "100%",
      flexWrap: "wrap",
    },

    sidebar: {
      width: "250px",
      backgroundColor: "lightgreen",
      padding: theme.spacing(2),
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },

    chatContainer: {
      flex: 1,
      overflowY: "auto",
      padding: theme.spacing(2),
      width: "100%",
      backgroundColor: "#ecf0f1",
    },

    inputContainer: {
      padding: theme.spacing(2),
      borderTop: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: "8px",
      marginTop: "40px",
      bottom: 0,
      width: "80%",
      position: "fixed",
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
      width: "70%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },

    sendButton: {
      width: "130px",
      height: "40px",
      backgroundColor: "#3498db",
      color: "#fff",
      borderRadius: "5px",
    },
    backbtn: {
      width: "130px",
      height: "40px",
      backgroundColor: "#3498db",
      color: "#fff",
      borderRadius: "5px",
    },

    [themeInstance.breakpoints.down("sm")]: {
      sidebar: {
        width: "100%",
      },
      chatContainer: {
        width: "100%",
      },
    },
  };
});

const Userchat = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [adminName, setAdminName] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [yoursid, setYoursid] = useState(null);
  const [chatRoomiD, setChatRoomId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAdmin() {
      const querySnapshot = await getDocs(collection(db, "Admin"));
      const adminarray = [];
      querySnapshot.forEach((doc) => {
        adminarray.push({ id: doc.id, ...doc.data() });
      });
      setAdminName(adminarray);
    }
    getAdmin();
  }, []);

  useEffect(() => {
    if (adminId && yoursid) {
      const chatRoomId = yoursid + adminId;
      setChatRoomId(chatRoomId);
    }
  }, [adminId, yoursid]);

  useEffect(() => {
    if (chatRoomiD) {
      getAllMessages();
    }
  }, [chatRoomiD]);

  const handleSidebarItemClick = (item) => {
    setAdminId(item.id);
    setYoursid(auth?.currentUser?.uid);
  };

  const handleSendMessage = async () => {
    if (adminId && yoursid) {
      const chatroomid = yoursid + adminId;
      const messageData = {
        message: newMessage,
        email: auth?.currentUser?.email,
        senderId: yoursid,
        recieverId: adminId,
        timestamp: serverTimestamp(),
        chatRoomid: chatroomid,
      };
      setChatRoomId(chatroomid);
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

  const getAllMessages = () => {
    const q = query(
      collection(db, "messeges"),
      where("chatRoomid", "==", chatRoomiD)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messeges = [];
      querySnapshot.forEach((doc) => {
        messeges.push(doc.data());
      });
      setMessages(messeges);
    });

    return () => unsubscribe();
  };

  return (
    <div className={classes.root}>
      {/* Sidebar */}

      <Paper className={classes.sidebar}>
        <List>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate("/home")}
            className={classes.backbtn}
            style={{ marginBottom: "20px" }}
          >
            Back
          </Button>
          {adminName.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleSidebarItemClick(user)}
            >
              <ListItemAvatar>
                <Avatar>{user.email.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.email.slice(0, 5)} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Chat Area */}
      <div className={classes.chatContainer}>
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
            onClick={handleSendMessage}
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Userchat;
