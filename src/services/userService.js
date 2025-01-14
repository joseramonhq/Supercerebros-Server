const User = require('../models/User');

const registerUser = async (userData) => {
  if (userData.role === 'Tutor' && !userData.password) {
    throw new Error('Password is required for Tutor');
  }

  if (userData.role === 'Children' && (!userData.parentId || !userData.birthDate || !userData.dni)) {
    throw new Error('ParentId, birthDate, and dni are required for Children');
  }

  const newUser = new User(userData);
  return await newUser.save();
};

const getAllUsers = async () => {
  return await User.find();
};

module.exports = {
  registerUser,
  getAllUsers
};
