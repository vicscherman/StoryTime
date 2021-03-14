import React, { useState } from 'react'
//create reactcontext
const MainContext = React.createContext()
//setting hooks for name, room, setname setroom
const MainProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    //return these props to the maincontext provider, render them as children
    return (
        <MainContext.Provider value={{ name, room, setName, setRoom }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainProvider } 