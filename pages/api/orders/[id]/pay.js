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
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: 'El pedido ya se encuentra pago' });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await database.disconnect();
    res.send({ message: 'Pedido pagado con éxito', order: paidOrder });
  } else {
    await database.disconnect();
    res.status(404).send({ message: 'Orden no encontrada' });
  }
};

export default handler;
