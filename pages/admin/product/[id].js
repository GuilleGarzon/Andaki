import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout/index';
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}
function AdminProductEdit() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('Archivo cargado con éxito');
    } catch (error) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(error) });
      toast.error(getError(error));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Producto actualizado');
      router.push('/admin/products');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(error) });
      toast.error(getError(error));
    }
  };

  return (
    <Layout title={`Editar Producto ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5 mt-10">
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
        <div className="md:col-span-3">
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-3xl mt-10">{`Editar Producto ${productId}`}</h1>
              <div className="mb-4">
                <label htmlFor="name">Nombre del producto</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  {...register('name', {
                    required: 'Por favor ingrese nombre',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="slug">Slug (Nombre del domimio)</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  {...register('slug', {
                    required: 'Por favor ingrese slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Precio</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register('price', {
                    required: 'Por favor ingrese precio',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="image">Imagen</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register('image', {
                    required: 'Por favor ingrese Imagen',
                  })}
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="imageFile">Cargar Imagen</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div>Subiendo....</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="category">Categoría</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  {...register('category', {
                    required: 'Por favor ingrese categoría',
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="brand">Marca</label>
                <input
                  type="text"
                  className="w-full"
                  id="brand"
                  {...register('brand', {
                    required: 'Por favor ingrese marca',
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Cantidad</label>
                <input
                  type="text"
                  className="w-full"
                  id="countInStock"
                  {...register('countInStock', {
                    required: 'Por favor ingrese cantidad',
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Descripción</label>
                <input
                  type="text"
                  className="w-full"
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="rounded bg-blue-500 text-white mx-auto py-2 px-4 flex shadow outline-none hover:bg-blue-600 active:bg-blue-700-button">
                  {loadingUpdate ? 'Cargando' : 'Actualizar'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}><a className="rounded bg-gray-300 py-2  px-4 text-black shadow outline-none hover:bg-gray-400  active:bg-gray-500">Regresar</a></Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEdit.auth = { adminOnly: true };
export default AdminProductEdit;
