import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Página no autorizada">
      <h1 className="text-xl mt-10">Acceso Denegado. Se require iniciar sesión para realizar esta actividad.</h1>      
    </Layout>
  );
}