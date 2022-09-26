import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Producto from '../models/Producto';
import database from '../config/database';


export default function ListProducts({ products }) {

  return (
    <Layout title="Products">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-10">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await database.connect();
  const products = await Producto.find().lean();
  return {
    props: {
      products: products.map(database.convertDocToObj),
    },
  };
}

ListProducts.auth = true;