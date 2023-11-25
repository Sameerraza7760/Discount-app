import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  List,
  makeStyles,
  Paper,
  Avatar,
} from "@material-ui/core";
import { UserOutlined } from "@ant-design/icons";
import SendIcon from "@material-ui/icons/Send";
import {
  auth,
  getDocs,
  onSnapshot,
  where,
  query,
  collection,
  db,
  addDoc,
  serverTimestamp,
} from "./../../../Config/firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },

  sidebar: {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(2),
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  chatContainer: {
    flex: 1,
    overflowY: "auto",
    padding: theme.spacing(2),
  },
  messageList: {
    maxHeight: "calc(100% - 40px)",
    overflowY: "auto",
  },
  inputContainer: {
    padding: theme.spacing(2),
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    // marginTop:'500px'
    // height:'1400px'
  },
  input: {
    marginRight: theme.spacing(2),
    width: "100%",
    marginTop: "600px",
  },
}));

const Adminchat = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [slidebarName, setSlidebarName] = useState([]);

  useEffect(() => {
    const userUID = auth.currentUser?.uid;
    // console.log("hy broo==>",userUID)
    localStorage.setItem("Yourid", userUID);

    const userEmail = auth.currentUser?.email;
    localStorage.setItem("yourEmail", userEmail);
    const constumerNames = async () => {
      const Email = localStorage.getItem("yourEmail");

      if (Email) {
        try {
          const querySnapshot = await getDocs(
            collection(db, "messeges"),
            where("costumerEmail", " != ", Email)
          );
          const constumer = [];
          querySnapshot.forEach((doc) => {
            constumer.push({ id: doc.id, ...doc.data() });
          });
          setSlidebarName(constumer);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        console.error("Email is undefined or null.");
      }
    };

    constumerNames();
  });

  let chatRoomId;
  const handleSidebarItemClick = async (item) => {
    console.log("hy==>", item);

    chatRoomId = item.chatRoomId;
    localStorage.setItem("chatID", item.chatRoomId);

    try {
      const q = query(
        collection(db, "messeges"),
        where("chatRoomId", "==", String(chatRoomId))
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messeges = [];
        querySnapshot.forEach((doc) => {
          messeges.push(doc.data());
        });
        console.log(messages);

        displayMesseges(messeges);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // getAllMesseges();

  const displayMesseges = (messege) => {
    setMessages(messege);

    console.log(messege);
  };

  const sendMessege = async () => {
    let chatRoomId = localStorage.getItem("chatID");
    console.log("hi==>", chatRoomId);
    let recieverid = localStorage.getItem("friendid");

    const Email = localStorage.getItem("yourEmail");
    if (chatRoomId) {
      try {
        const docref = await addDoc(collection(db, "messeges"), {
          messege: newMessage,
          chatRoomId: chatRoomId,
          timestamp: serverTimestamp(),
          costumerEmail: Email,
          recieverid: recieverid,
          senderid: auth.currentUser.uid,
        });
        setNewMessage("");
      } catch (error) {
        console.log("Error sending message:", error.message);
      }
    } else {
      console.log("chatRoomId is undefined. Cannot send message.");
    }
  };

  return (
    <div className={classes.root}>
      {/* Sidebar */}
      <Paper className={classes.sidebar}>
        <List>
          {Array.from(new Set(slidebarName.map((item) => item.costumerEmail)))
            .filter((email) => email !== auth.currentUser.email)
            .map((email, index) => {
              const item = slidebarName.find(
                (item) => item.costumerEmail === email
              );

              return (
                <div>
                  <Button
                    type="primary"
                    style={{
                      paddingTop: "4%",
                      fontFamily: "sans-serif",
                      width: "200px",
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "15px",
                    }}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    {email.replace(/\d+/g, "").split("@")[0]}
                  </Button>
                </div>
              );
            })}
        </List>
      </Paper>

      {/* Main Chat Area */}
      <div className={classes.chatContainer}>
        {/* Input for New Message */}

        <Paper className={classes.messageList}>
          {/* Display messages here */}
          {messages.map((item) => (
            <div key={item.id}>{item.messege}</div>
          ))}
        </Paper>

        <div className={classes.inputContainer}>
          <Input
            className={classes.input}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={sendMessege}
            style={{ marginTop: "550px" }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Adminchat;
