import { getSession } from 'next-auth/react';
import database from '../../../../config/database';
import Order from '../../../../models/Order';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Es requerido el inicio de sesión');
  }

  await database.connect();

  const order = await Order.findById(req.query.id);
  await database.disconnect();
  res.send(order);
};

export default handler;
