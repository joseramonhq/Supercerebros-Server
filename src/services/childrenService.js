const Children = require('../models/children');

const registerChildren = async (childrenData) => {
  if (childrenData.role === 'Children' && !childrenData.password) {
    throw new Error('Password is required for Children');
  }

  if (childrenData.role === 'Children' && (!childrenData.parentId || !childrenData.birthDate || !childrenData.dni)) {
    throw new Error('ParentId, birthDate, and dni are required for Children');
  }

  const newChildren = new User(childrenData);
  return await newChildren.save();
};

const getAllChildren = async () => {
  return await Children.find();
};

module.exports = {
  registerChildren,
  getAllChildren
};