import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '../components/Layout';

function Profile() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('lastName', session.user.lastName);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, lastName, email, password }) => {
    try {
      await axios.patch('/api/auth/update', {
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
      toast.success('Perfil actualizado');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Perfil">
      <form
        className="mx-auto max-w-screen-md sm:w-2/4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mt-4 mb-4 sm:text-2xl justify-center">
          Actualizar Perfil
        </h1>

        <div className="mb-4">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
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
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="w-full"
            id="email"
            placeholder="Ingrese Correo Electrónico"
            {...register('email', {
              required: 'Por favor ingrese correo electrónico',
              pattern: {
                value:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                message: 'Por favor ingrese correo electrónico válido',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
          <input
            className="w-full"
            type="password"
            id="password"
            placeholder="Ingrese Contraseña"
            {...register('password', {
              pattern: {
                value: /^[a-zA-Z0-9]{6,20}$/,
                message: 'Por favor ingrese más de 5 caracteres',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            placeholder="Ingrese Contraseña"
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password'),
              pattern: {
                value: /^[a-zA-Z0-9]{6,20}$/,
                message: 'Por favor ingrese más de 5 caracteres',
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
              <div className="text-red-500 ">Las contraseñas no coinciden</div>
            )}
        </div>
        <div className="mb-10">
          <button className="rounded bg-blue-500 text-white mx-auto py-2 px-4 flex shadow outline-none hover:bg-blue-600 active:bg-blue-700-button">
            Actualizar Perfil
          </button>
        </div>
      </form>
    </Layout>
  );
}

Profile.auth = true;
export default Profile;
