import { getSession } from 'next-auth/react';
import Producto from '../../../../../models/Producto';
import database from '../../../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Es requerido iniciar sesión');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  }else {
    return res.status(400).send({ message: 'Método no permitido' });
  }
};
const getHandler = async (req, res) => {
  await database.connect();
  const product = await Producto.findById(req.query.id);
  await database.disconnect();
  res.send(product);
};
const putHandler = async (req, res) => {
  await database.connect();
  const product = await Producto.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    await database.disconnect();
    res.send({ message: 'Producto actualizado' });
  } else {
    await database.disconnect();
    res.status(404).send({ message: 'Producto no encontrado' });
  }
};

const deleteHandler = async (req, res) => {
  await database.connect();
  const product = await Producto.findById(req.query.id);
  if (product) {
    await product.remove();
    await database.disconnect();
    res.send({ message: 'Producto eliminado' });
  } else {
    await database.disconnect();
    res.status(404).send({ message: 'Producto no encontrado' });
  }
};

export default handler;