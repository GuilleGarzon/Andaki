import { getSession } from 'next-auth/react';
import Producto from '../../../../models/Producto';
import database from '../../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('Es requerido el inicio de sesión del Administrador');
  }
  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Método no permitido' });
  }
};

const postHandler = async (req, res) => {
  await database.connect();
  const newProduct = new Producto({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });
  const product = await newProduct.save();
  await database.disconnect();
  res.send({ message: 'Producto Creado', product });
};

const getHandler = async (req, res) => {
  await database.connect();
  const products = await Producto.find({});
  await database.disconnect();
  res.send(products);
};
export default handler;
