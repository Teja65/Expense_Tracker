import admin from '../config/firebase.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const toAuthUser = (user) => ({
  uid: user.firebaseUid,
  email: user.email,
  name: user.name,
  picture: user.picture || '',
});

const getProvider = (decoded) => {
  const signInProvider = decoded.firebase?.sign_in_provider;

  return signInProvider === 'google.com' ? 'google' : 'password';
};

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: 'Firebase ID token is required',
      });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded.email) {
      return res.status(400).json({
        message: 'Firebase account must include an email address',
      });
    }

    const userData = {
      firebaseUid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email?.split('@')[0] || 'User',
      picture: decoded.picture || '',
      provider: getProvider(decoded),
    };

    const user = await User.findOneAndUpdate(
      {
        $or: [{ firebaseUid: decoded.uid }, { email: decoded.email }],
      },
      userData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    const accessToken = generateToken(user);

    res.cookie('token', accessToken, cookieOptions);

    res.status(200).json(toAuthUser(user));
  } catch (error) {
    console.error(error);

    res.status(401).json({
      message: 'Authentication failed',
    });
  }
};

export const checkEmail = async (req, res) => {
  const email = String(req.query.email || '').trim().toLowerCase();

  if (!email) {
    return res.status(400).json({
      message: 'Email is required',
    });
  }

  const savedUser = await User.findOne({ email }).select('email provider');

  try {
    const firebaseUser = await admin.auth().getUserByEmail(email);
    const providers = firebaseUser.providerData.map(
      (provider) => provider.providerId,
    );

    const provider = providers.includes('google.com') ? 'google' : 'password';

    return res.status(200).json({
      exists: true,
      provider,
      providers,
    });
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      return res.status(500).json({
        message: 'Unable to check email provider',
      });
    }
  }

  res.status(200).json({
    exists: Boolean(savedUser),
    provider: savedUser?.provider || null,
    providers: savedUser?.provider ? [savedUser.provider] : [],
  });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(toAuthUser(user));
  } catch (error) {
    res.status(401).json({
      message: 'Invalid session',
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
  });

  res.status(200).json({
    message: 'Logout successful',
  });
};
