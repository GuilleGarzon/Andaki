import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import database from '../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Es requerido iniciar sesión');
  }
  if (req.method === 'GET') {
    await database.connect();
    const orders = await Order.find({}).populate('user', 'name');
    await database.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Método no permitido' });
  }
};

export default handler;