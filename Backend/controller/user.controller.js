import User from '../models/user.model.js';

export const createUser = async (username, email, password) => {
  const newUser = new User({ username, email, password });
  await newUser.save();
  return newUser;
}

export const getUserByUsername = async (username) => {
  return await User.findOne({ username });
}

export const loginUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (user) {
    const isMatch = await user.comparePassword(password);
    if(isMatch) {
      const token = user.generateAuthToken();
      return {user, token};
    } else {
      throw new Error('Authentication failed, incorrect password');
    }
  } else {
    throw new Error('User not found');
  }
}