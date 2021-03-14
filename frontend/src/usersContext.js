import React, { useState } from 'react'
//create context
const UsersContext = React.createContext()
// hooks for logged in users. Initialize value as empty array
const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])

       //provide users values as children to userscontext 
    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider } 