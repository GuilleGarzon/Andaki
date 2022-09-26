import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/listProducts');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHanlder = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Inicio de Sesión">
      <form
        className="mx-auto max-w-screen-md sm:w-2/4"
        onSubmit={handleSubmit(submitHanlder)}
      >
        <h1 className="mt-10 mb-10 sm:text-2xl flex justify-center">
          Iniciar Sesión
        </h1>
        <div className="mb-4">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            {...register('email', {
              required: 'Por favor ingrese correo electrónico',
              pattern: {
                value:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                message: 'Por favor ingrese correo electrónico válido',
              },
            })}
            className="w-full"
            id="email"
            placeholder="Ingrese Correo Electrónico"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            {...register('password', {
              required: 'Por favor ingrese contraseña',
              pattern: {
                value: /^[a-zA-Z0-9]{6,20}$/,
                message: 'Por favor ingrese más de 5 caracteres',
              },
            })}
            className="w-full focus:#0f4adf"
            id="password"
            placeholder="Ingrese Contraseña"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="rounded bg-blue-500 text-white mx-auto py-2 px-4 flex shadow outline-none hover:bg-blue-600 active:bg-blue-700-button">
            Iniciar Sesión
          </button>
        </div>
        <div className="mb-1 flex justify-center sm:text-lg ">
          No tienes cuenta? &nbsp;
        </div>
        <div className="flex justify-center sm:text-xl">
          {' '}
          <Link href={`/register?redirect=${redirect || '/listProducts'}`}>
            <a className="text-blue-700 hover:text-blue-500">Registrate</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
