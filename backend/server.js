//initialize express app and passed it to http server
const app = require("express")();
const http = require("http").createServer(app);
// allow cross origin resource sharing (different people chatting!)
const cors = require("cors");
//set back end port to 5000 or whatever it ends up being when deployed
const PORT = process.env.PORT || 5000;

const { addUser, getUser, deleteUser, getUsers, users } = require("./users");

//initialize socket, pass the http const to it
const io = require("socket.io")(http);

//use cors for the app
app.use(cors());



 


//SOCKET STUFF
//invoke on method w/ connection as the event name, and a callback. Callback holds that socket instance to listen to/emit events
io.on("connection", (socket) => {
  //3 events to listen for, logging in, sending messages, disconnecting
  socket.on("login", ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return callback(error);
    console.log("these are the users", users);
    //join the specified room
    socket.join(user.room);
    //send notification to room of joined user
    socket.in(room).emit("notification", {
      title: "Someone's joined",
      description: `${user.name} has just joined StoryTime!`,
    });
    //we update the users list in the room
    io.in(room).emit("users", getUsers(room));
    callback();
    //for having the game start at 5 users.
    if (users.length ==5){
      let chosenUser = 0;

      setInterval(() => {
        if (users.length == 0) {
          return;
        }
        chosenUser++;
        if (chosenUser >= users.length) {
          chosenUser = 0;
        }
        console.log("Chosen user is", chosenUser);
        console.log(users[chosenUser]);
        //for passing to the front end a chosen user. we'll use this to disable/enable typing for users
        io.in(users[chosenUser].room).emit("chosenUser", users[chosenUser].name);
      }, 10000);
    }

  });


  
 


  //take message from client end and emit message event with the user's name and the message they're sending
  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    console.log(`[sendMessage] received: '${message}' from user(${user})`);
    io.in(user.room).emit("sendMessage", message);
    console.log("sent message", message);
  });

  socket.on("updateMessage", (message) => {
    const user = getUser(socket.id);
    console.log(
      `[updateMessage] received: '${message.text}' from user(${message.user})`
    );
    io.in(user.room).emit("updateMessage", message);
    console.log("updated message", message);
  });

  // delete user through socket id, emit a notification event to the other users, update the list of users in the room
  socket.on("disconnect", () => {
    console.log("user disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit("notification", {
        title: "Someone left",
        description: `${user.name} just left StoryTime`,
      });
     
      io.in(user.room).emit("users", getUsers(user.room));
      clearInterval();
      console.log("Here are the users left in chat", users);
      console.log("Number of remaining users is ", users.length);
    }
  });
});

//setting our home route, test message to display on screen
app.get("/", (req, res) => {
  res.send("Back end server running");
});

//listen on this port, console log to test
http.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
