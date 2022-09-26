import Link from 'next/link';

function ProductItem({ product }) {
  const price = Intl.NumberFormat('es-CO', {style: 'decimal',currency: 'COP'}).format(product.price);
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow w-full h-80"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg font-bold">{product.name}</h2>
          </a>
        </Link>        
        <p>${price}</p>
      </div>
    </div>
  );
}

export default ProductItem;
