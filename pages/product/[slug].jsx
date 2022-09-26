import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout/index';
import database from '../../config/database';
import Producto from '../../models/Producto';
import { Store } from '../../store';
import axios from 'axios';
import { toast } from 'react-toastify';

function Product( props ) {
  const { product } = props;
  const { state, dispatch } = useContext(Store); 
  const price = Intl.NumberFormat('es-CO', {style: 'decimal',currency: 'COP'}).format(product.price);
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((element) => element.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');      
    }
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-4 text-xl ">
        <Link href="/listProducts"><a className="text-blue-600 hover:text-blue-400">Regresar a Productos</a></Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 p-10">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            layout="responsive"
            className='bg-gray-400'
          ></Image>
        </div>
        <div className='mt-20'>
          <ul>
            <li>
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            </li>
            <li>Categoría: <strong>{product.category}</strong></li>
            <li>Marca: <strong>{product.brand}</strong></li>            
            <li>Descripción: <strong>{product.description}</strong></li>
          </ul>
        </div>
        <div>
          <div className="card p-5 mt-20">
            <div className="mb-2 flex justify-around text-xl">
              <div>Precio: </div>
              <div>${price}</div>
            </div>            
            <button
              className="rounded bg-blue-500 text-white mx-auto py-2 px-4 flex shadow outline-none hover:bg-blue-600 active:bg-blue-700-buttonw-full"
              onClick={addToCartHandler}
            >
              Añadir a la cesta
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;  
  const { slug } = params;

  await database.connect();
  const product = await Producto.findOne({ slug }).lean();
  await database.disconnect();
  return {
    props: {
      product: product ? database.convertDocToObj(product) : null,
    }
  }
}

export default Product;
