const Child = require('../models/Child');

const registerChild = async (childData) => {
  if (childData.role === 'Child' && !childData.password) {
    throw new Error('Password is required for Child');
  }

  if (childData.role === 'Child' && (!childData.parentId || !childData.birthDate || !childData.dni)) {
    throw new Error('ParentId, birthDate, and dni are required for Child');
  }

  const newChild = new User(childData);
  return await newChild.save();
};

const getAllChildren = async () => {
  return await Child.find();
};

module.exports = {
  registerChild,
  getAllChildren
};