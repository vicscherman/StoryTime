//our logged in users will be an array
//To do: set limits on number of users, set Interval to round robin through to active user
const users = [];
//takes in Socket ID, username, and room

const addUser = (id, name, room) => {
  //first check to see if the user already exists. Do this by username
  const userExists = users.find(
    (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  //conditions for logging in with error messages
  if (userExists) return { error: "User already exists!" };
  if (!name && !room) return { error: "You need to input a room and username" };
  if (!name || !room) return { error: "Make sure to put in your username or room name" };
  //to check if our room is full/set max players for game. If the room exists and the length of the users array > 5 we  return error
  if ( room && users.length > 4) return {error: "Sorry that room is full!"}
  //define our user, push it to users array, return user
  const user = { id, name, room };
  users.push(user);
  return { user };
};
// lets us get user based off id. Find a user where the user.id  is equal to the specified ID
const getUser = (id) => {
  let user = users.find((user) => user.id == id);
  return user;
};
//delete users based on ID
const deleteUser = (id) => {
  //first find index of user where the id is equal to the deleteuser ID
  const userIndex = users.findIndex((user) => user.id === id);
  //if the userindex exists, we remove it from that 1 element from the array, return the 0th element
  if (userIndex !== -1) return users.splice(userIndex, 1)[0];
};

const getUsers = (room) => users.filter((user) => user.room === room);




module.exports = { addUser, getUser, deleteUser, getUsers , users};
