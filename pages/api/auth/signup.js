import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import database from '../../../config/database';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, lastName, email, password } = req.body;
  if (
    !name ||
    !lastName ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Error de validación',
    });
    return;
  }

  await database.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'Usuario ya existe!' });
    await database.disconnect();
    return;
  }

  const newUser = new User({
    name,
    lastName,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await database.disconnect();
  res.status(201).send({
    message: 'Usuario Creado!',
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;