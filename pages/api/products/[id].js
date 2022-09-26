import database from '../../../config/database';
import Producto from '../../../models/Producto';

const handler = async (req, res) => {
  await database.connect();
  const product = await Producto.findById(req.query.id);
  await database.disconnect();
  res.send(product);
};

export default handler;
