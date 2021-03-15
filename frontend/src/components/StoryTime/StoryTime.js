import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../mainContext";
import { SocketContext } from "../../socketContext";
import { UsersContext } from "../../usersContext";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiList } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import ScrollToBottom from "react-scroll-to-bottom";
import { useToast } from "@chakra-ui/react";
import "./StoryTime.scss";
//just a test page for now

const StoryTime = () => {
  const { name, room, setName, setRoom } = useContext(MainContext);
  const { users } = useContext(UsersContext);
  const history = useHistory();
  //for logging the message box
  const [message, setMessage] = useState("");
  //for rendering in main box
  const [messages, setMessages] = useState([]);
  //for determining which is the current active user
  const [activeMessage, setActiveMessage] = useState({ user: "", text: "" });
  //for disabling the ability to type for users when it's not their turn
  const [disableInputBox, setDisableInputBox] = useState(true)
  const socket = useContext(SocketContext);
  const toast = useToast();

  window.onpopstate = (e) => logout();
  //Checks to see if there's a user present to log in
  useEffect(() => {
    if (!name) return history.push("/");
  }, [history, name]);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      // commit active message & then clear it
      console.log(`[sendMessage] new msg (${message.text})`, message);
      messages.push(message);
      console.log("useEffect messags",messages)
      setActiveMessage({user:"", text: ""});
      setMessages([...messages]);
    });

    socket.on("updateMessage", (message) => {
      console.log(`[updateMessage] msg(${message.text})`);
      setActiveMessage({ ...message });
    });

    socket.on("chosenUser", (chosenName) => {
      console.log(`chosen user is (${chosenName})`);
      setDisableInputBox( name=== chosenName ? false : true)
      
    });

    socket.on("notification", (notif) => {
      toast({
        position: "top",
        title: notif?.title,
        description: notif?.description,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [socket, toast]);

  const logout = () => {
    setName("");
    setRoom("");
    history.push("/");
    history.go(0);
  };

  const handleSendMessage = () => {
    socket.emit("sendMessage", { user: name, text: message });
    
  };

  const handleUpdateMessage = (e) => {
    // update active message with the latest character:
    let newMessage = e.target.value;
    console.log("Handleupdatemessage", newMessage);
    socket.emit("updateMessage", { user: name, text: newMessage });
    setMessage(e.target.value);
  };

  return (
    <Flex
      className="room"
      flexDirection="column"
      width={{ base: "100%", sm: "575px" }}
      height={{ base: "100%", sm: "auto" }}
    >
      <Heading
        className="heading"
        as="h4"
        bg="white"
        p="1rem 1.5rem"
        borderRadius="10px 10px 0 0"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiList />}
              isRound="true"
              bg="blue.300"
              color="white"
            />
            <MenuList>
              {users &&
                users.map((user) => {
                  return (
                    <MenuItem minH="40px" key={user.id}>
                      <Text fontSize="sm">{user.name}</Text>
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>
          <Flex
            alignItems="center"
            flexDirection="column"
            flex={{ base: "1", sm: "auto" }}
          >
            <Heading fontSize="lg">
              {" "}
              {room.slice(0, 1).toUpperCase() + room.slice(1)}
            </Heading>
            <Flex alignItems="center">
              <Text
                mr="1"
                fontWeight="400"
                fontSize="md"
                opacity=".7"
                letterSpacing="0"
              >
                {name}
              </Text>
              <Box h={2} w={2} borderRadius="100px" bg="green.300"></Box>
            </Flex>
          </Flex>
          <Button color="gray.500" fontSize="sm" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Heading>

      <ScrollToBottom className="messages" debug={false}>
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <Box
              key={i}
              className={`message ${msg.user === name ? "my-message" : ""}`}
              m=".2rem 0"
            >
              <Text fontSize="xs" opacity=".7" ml="5px" className="user">
                {msg.user}
              </Text>
              <Text
                fontSize="sm"
                className="msg"
                p=".4rem .8rem"
                bg="white"
                borderRadius="15px"
                color="white"
              >
                {msg.text}
              </Text>
            </Box>
          ))
        ) : (
          <Flex
            alignItems="center"
            justifyContent="center"
            mt=".5rem"
            bg="#EAEAEA"
            opacity=".2"
            w="100%"
          >
            <Box mr="2">-----</Box>
            <BiMessageDetail fontSize="1rem" />
            <Text ml="1" fontWeight="400">
              No messages
            </Text>
            <Box ml="2">-----</Box>
          </Flex>
        )}
        <div>
          {activeMessage.text.length > 0
            ? `${activeMessage.user} is typing: ${activeMessage.text}`
            : ""}
        </div>
      </ScrollToBottom>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          disabled={disableInputBox}
          onChange={(e) => handleUpdateMessage(e)}
        />
        <IconButton
          colorScheme="green"
          isRound="true"
          icon={<RiSendPlaneFill />}
          onClick={handleSendMessage}
          disabled={disableInputBox || message === "" ? true : false}
        >
          Send
        </IconButton>
      </div>
    </Flex>
  );
};

export default StoryTime;
