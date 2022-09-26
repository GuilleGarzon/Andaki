import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import database from '../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('El inicio de sesion es requerido');
  }

  const { user } = session;
  await database.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;