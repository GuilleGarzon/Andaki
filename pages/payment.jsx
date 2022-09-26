import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../store/index';

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Método de pago es requerido');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {    
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router]);

  return (
    <Layout title="Método de pago">
      <CheckoutWizard activeStep={0} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-4xl mt-10">Método de Pago</h1>
        {['PayPal'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/cart')}
            type="button"
            className=" rounded bg-gray-100 py-2  px-4 text-black shadow outline-none hover:bg-gray-200  active:bg-gray-300"
          >
            Regresar
          </button>
          <button className="rounded bg-blue-600 py-2  px-4 text-white shadow outline-none hover:bg-blue-400  active:bg-blue-400">Siguiente</button>
        </div>
      </form>
    </Layout>
  );
}

Payment.auth = true;
export default Payment;