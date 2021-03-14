//initialize express app and passed it to http server
const app = require('express')()
const http = require ('http').createServer(app)
// allow cross origin resource sharing (different people chatting!)
const cors = require('cors')
//set back end port to 5000 or whatever it ends up being when deployed
const PORT = process.env.PORT || 5000

const {addUser,getUser, deleteUser, getUsers} =require('./users') 


//initialize socket, pass the http const to it
const io = require('socket.io')(http)



//use cors for the app
app.use(cors())
//invoke on method w/ connection as the event name, and a callback. Callback holds that socket instance to listen to/emit events
io.on('connection', (socket)=>{
    //3 events to listen for, logging in, sending messages, disconnecting
    socket.on('login', ({name, room}, callback) =>{

    })

    socket.on('sendMessage', message =>{

    })

    socket.on('disconnect', ()=> {

    })

})
















//setting our home route, test message to display on screen
app.get('/', (req, res)=>{
    res.send('Back end server running')
})

//listen on this port, console log to test
http.listen(PORT, () =>{
    console.log(`server listening on ${PORT}`)
})

