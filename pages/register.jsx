import Link from 'next/link';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/login');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, lastName, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        lastName,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Registro">
      <form
        className="mx-auto max-w-screen-md sm:w-2/4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mt-4 mb-4 sm:text-2xl flex justify-center">
          Crear Cuenta
        </h1>
        <div className="mb-4">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="w-full"
            id="name"
            placeholder="Ingrese Nombre"
            {...register('name', {
              required: 'Por favor ingrese Nombre',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="w-full"
            id="lastName"
            placeholder="Ingrese Apellido"
            {...register('lastName', {
              required: 'Por favor ingrese Apellido',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Correo Electr??nico</label>
          <input
            type="email"
            placeholder="Ingrese Correo Electr??nico"
            {...register('email', {
              required: 'Por favor ingrese correo electr??nico',
              pattern: {
                value:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                message: 'Por favor ingrese correo electr??nico v??lido',
              },
            })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Contrase??a</label>
          <input
            type="password"
            placeholder="Ingrese Contrase??a"
            {...register('password', {
              required: 'Por favor ingrese contrase??a',
              pattern: {
                value: /^[a-zA-Z0-9]{6,20}$/,
                message: 'Por favor ingrese m??s de 5 caracteres',
              },
            })}
            className="w-full"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirmar Contrase??a</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            placeholder="Ingrese Contrase??a"
            {...register('confirmPassword', {
              required: 'Por favor ingrese contrase??a de verificaci??n',
              validate: (value) => value === getValues('password'),
              pattern: {
                value: /^[a-zA-Z0-9]{6,20}$/,
                message: 'Por favor ingrese m??s de 5 caracteres',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Las contrase??as no coinciden</div>
            )}
        </div>

        <div className="mb-10">
          <button className="rounded bg-blue-500 text-white mx-auto py-2 px-4 flex shadow outline-none hover:bg-blue-600 active:bg-blue-700-button">
            Registrarse
          </button>
        </div>        
      </form>
    </Layout>
  );
}
