import React, { useContext,  useEffect } from 'react'
//for switching
import { useHistory } from 'react-router-dom'
//context providers for username, room name
import { MainContext } from '../../mainContext'
//context provider for socket instance
import { SocketContext } from '../../socketContext'
//context provider for users present in room
import { UsersContext } from '../../usersContext'
//ui elements
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri"
import { useToast } from "@chakra-ui/react"


const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom } = useContext(MainContext)
    const history = useHistory()
    const toast = useToast()
    const { setUsers } = useContext(UsersContext)

    //Checks to see if there's a user already present

    useEffect(() => {
        socket.on("users", users => {
            setUsers(users)
        })
    })

    //Emits the login event and if successful redirects to chat and saves user data
    const handleClick = () => {
        socket.emit('login', { name, room }, error => {
            if (error) {
                console.log(error)
                return toast({
                    position: "top",
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
            history.push('/storytime')
            return toast({
                position: "top",
                autoDismiss: false,
                title: "Hey there",
                description: `Welcome to StoryTime! The rules are simple. You have 10 seconds to type, once that's up, the next user gets a chance! `,
                status: "success",
                duration: null,
                isClosable: true,
            })
        })
    }

    return (
        <Flex className='login' flexDirection='column' mb='8'>
            <Heading as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px'>StoryTime</Heading>
            <Flex className="form" gap='1rem' flexDirection={{ base: "column", md: "row" }}>
                <Input variant='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='User Name' value={name} onChange={e => setName(e.target.value)} />
                <Input variant='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='Room Name' value={room} onChange={e => setRoom(e.target.value)} />
                <IconButton colorScheme='blue' isRound='true' icon={<RiArrowRightLine />} onClick={handleClick}></IconButton>
            </Flex>
        </Flex>
    )
}

export default Login