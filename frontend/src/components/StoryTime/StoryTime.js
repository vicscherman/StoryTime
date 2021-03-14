import React,  {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { UsersContext } from '../../usersContext'
import { Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { FiList } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'
import ScrollToBottom from 'react-scroll-to-bottom';
import { useToast } from "@chakra-ui/react"
import './StoryTime.scss'
//just a test page for now

const StoryTime = () =>{
  const {name, room, setName, setRoom} = useContext(MainContext)
  const {users} =useContext(UsersContext)
  const history = useHistory()

  const logout = () =>{
    setName('');
    setRoom('')
    history.push('/')
    history.go(0)
   
  }
   

    return (
      <div>
      <Button color='gray.500' fontSize='sm' onClick={logout}>Logout</Button>
      </div>
    )
}

export default StoryTime