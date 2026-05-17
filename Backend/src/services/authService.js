import admin from '../firebase/firebaseAdmin.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const loginUserService = async (firebaseToken) => {
  const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

  const { uid, email, name } = decodedToken;

  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    user = await User.create({
      name: name || 'User',
      email,
      firebaseUid: uid,
    });
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};
