import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import database from '../../../config/database';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} no es permitido` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Se require inicio de sesión' });
  }

  const { user } = session;
  const { name, lastName, email, password } = req.body;

  if (
    !name ||
    !lastName ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Error de validación',
    });
    return;
  }

  await database.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.lastName = lastName;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await database.disconnect();
  res.send({
    message: 'Usuario actualizado',
  });
}

export default handler;