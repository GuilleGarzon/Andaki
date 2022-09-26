import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import database from '../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'El inicio de sesión es requerido' });
  }
  const { user } = session;
  await database.connect();
  const orders = await Order.find({ user: user._id });
  await database.disconnect();
  res.send(orders);
};

export default handler;