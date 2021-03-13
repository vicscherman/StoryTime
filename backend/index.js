//initialize express app and passed it to http server
const app = require('express')()
const http = require ('http').createServer(app)
// allow cross origin resource sharing (different people chatting!)
const cors = require('cors')
//set back end port to 5000 or whatever it ends up being when deployed
const PORT = process.env.PORT || 5000
//use cors for the app
app.use(cors())
//setting our home route, test message to display on screen
app.get('/', (req, res)=>{
    res.send('Back end server running')
})

//listen on this port, console log to test
http.listen(PORT, () =>{
    console.log(`server listening on ${PORT}`)
})