import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import StoryTime from "./components/StoryTime/StoryTime";
import { SocketProvider } from "./socketContext";
import { MainProvider } from "./mainContext";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { UsersProvider } from "./usersContext";
import ErrorPage from "./components/ErrorPage";

//chakra is basically nice UI styling elements for this
//Main Provider holds username and room name
//Users provider holds users present in a room
//Socket Provider holds socket instance


function App() {
  return (
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Flex className="App" align="center" justifyContent="center">
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/storytime" component={StoryTime} />
                  <Route  component={ErrorPage} />
                </Switch>
              </Router>
            </Flex>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App