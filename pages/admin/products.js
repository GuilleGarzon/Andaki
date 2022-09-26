import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/index';
import { getError } from '../../utils/error';
import Swal from 'sweetalert2';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}
function AdminProducts() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    Swal.fire({
      title: 'Advertencia',
      text: 'Está seguro que desea crear producto?',
      icon: 'error',
      showDenyButton: true,
      denyButtonText: 'NO',
      confirmButtonText: 'SI',
      confirmButtonColor: 'green',
    }).then(async (response) =>{      
        try {
          if (response.isConfirmed) {
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post('/api/admin/products');
            dispatch({ type: 'CREATE_SUCCESS' });
            toast.success('Producto Creado');
            router.push(`/admin/product/${data.product._id}`);
            Swal.fire('Exito', 'Producto Creado', 'success');            
          }          
        } catch (error) {
          dispatch({ type: 'CREATE_FAIL' }); 
          toast.error(getError(error));      
      }  
    });   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = (productId) => {
    Swal.fire({
      title: 'Advertencia',
      text: 'Está seguro que desea eliminar el registro?',
      icon: 'error',
      showDenyButton: true,
      denyButtonText: 'NO',
      confirmButtonText: 'SI',
      confirmButtonColor: 'green',
    }).then(async (response) =>{      
        try {
          if (response.isConfirmed) {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/admin/products/${productId}`);
            dispatch({ type: 'DELETE_SUCCESS' });
            Swal.fire('Exito', 'El registro se eliminó correctamente', 'success');            
          }          
        } catch (error) {
          dispatch({ type: 'DELETE_FAIL' });    
          toast.error(getError(error));      
      }  
    });    
  }

  return (
    <Layout title="Admin Productos">
      <div className="grid md:grid-cols-4 md:gap-5 mt-10 mb-10">
        <div>
          <ul>
            <li>
              <Link href="/admin/orders">Ordenes</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold">Productos</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Usuarios</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-4xl font-bold mt-5">Productos</h1>
            {loadingDelete && <div>Eliminando...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="rounded bg-green-600 py-2 px-4 h-10 text-white shadow outline-none hover:bg-green-500  active:bg-green-500"
            >
              {loadingCreate ? 'loading' : 'Create'}
            </button>
          </div>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">NOMBRE</th>
                    <th className="p-5 text-left">PRECIO</th>
                    <th className="p-5 text-left">CATEGORIA</th>
                    <th className="p-5 text-left">CANTIDAD</th>
                    <th className="p-5 text-left">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className=" p-5 ">{product.name}</td>
                      <td className=" p-5 ">${product.price}</td>
                      <td className=" p-5 ">{product.category}</td>
                      <td className=" p-5 ">{product.countInStock}</td>
                      <td className=" p-5 ">
                        <Link href={`/admin/product/${product._id}`}>
                          <a
                            type="button"
                            className="rounded bg-blue-500 text-white mx-auto py-2 px-4 shadow outline-none hover:bg-blue-600 active:bg-blue-700-button"
                          >
                            Editar
                          </a>
                        </Link>
                        &nbsp;
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="rounded bg-red-600 py-2  px-4 shadow outline-none hover:bg-red-500  active:bg-red-500 text-white"
                          type="button"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProducts.auth = { adminOnly: true };
export default AdminProducts
