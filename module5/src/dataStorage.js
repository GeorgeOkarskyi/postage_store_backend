const { v4: uuidv4 } = require('uuid');
const { API_ROOT_PATH } = require('./constants')

let users = [];

function addUser({ name, email }) {
  const user = {
    id: uuidv4(),
    name,
    email,
    hobbies: []
  };

  users.push(user);
  return { user, links: generateUserLinks(user.id) };
}

function deleteUser(userId) {
  const userIndex = users.findIndex(user => user.id === userId);

  if(userIndex !== -1){
    users.splice(userIndex, 1);
    return true;
  }
  return false;
}

function getUsers() {
  return users.map(user => ({ user, links: generateUserLinks(user.id) }));
}

function updateUserHobbies(userId, newHobbies) {
  const user = users.find(user => user.id === userId);

  if (user) {
    user.hobbies = [...new Set([...user.hobbies, ...newHobbies])];
    return { user, links: generateUserLinks(user.id) };
  }
  return null;
}

function getUserHobbies(userId) {
  const user = users.find(user => user.id === userId);
  if (user) {
    return { hobbies: user.hobbies, links: generateUserLinks(user.id) };
  }
  return null;
}

function generateUserLinks(userId) {
  return {
    self: `${API_ROOT_PATH}/${userId}`,
    hobbies: `${API_ROOT_PATH}/${userId}/hobbies`
  };
}

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  updateUserHobbies,
  getUserHobbies
};