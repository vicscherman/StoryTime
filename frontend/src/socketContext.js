import React from 'react'
import io from 'socket.io-client'
//create socketcontext w/ react
const SocketContext = React.createContext()

const SocketProvider = ({ children }) => {
    //set our back end endpoint
    const ENDPOINT = 'localhost:5000';
    //call on our endpoint with io
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }