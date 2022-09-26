import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Página de Inicio">
      <main className="min-h-screen relative mb-10">
        <div>
          <video
            muted
            autoPlay
            loop
            className="top-0 left-0 w-full h-96 object-cover"
          >
            <source src="/images/videoAndaki.mp4" type="video/mp4"></source>
          </video>
        </div>

        <div>
          <h1 className="sm:text-5xl text-bold text-xl pt-10 flex justify-center items-center px-4">
            Bienvenidos a Andaki Karts
          </h1>
          <p className="sm:text-xl text-sm flex justify-center items-center pt-4 pb-4 px-4">
            Vive una experiencia llena de adrenalina y diversión
          </p>
          <p className="sm:text-xl text-sm sm:px-20 px-4">
            Ubicado en el departamento del Caquetá, a 8km en la vía de Morelia a
            Belén. Una experiencia inolvidable para vivir con familia y amigos.
          </p>
          <p className="sm:text-xl text-sm sm:px-20 px-4 py-2">
            ¿Estás list@ para tener adrenalina y diversión a bordo de nuestros
            Karts? Ven y disfruta con tus familiares y/o amigos y pon a prueba
            tus destrezas como piloto.
          </p>
          <h1 className="sm:text-5xl text-bold text-xl pt-10 flex justify-center items-center px-4 py-4">
            Nuestras atracciones
          </h1>
        </div>

        <div className="flex">
          <div className="w-1/2 sm:p-4">
            <img
              src="/images/Pista.jpeg"
              className="sm:h-60 sm:w-full bg-cover"
            />
          </div>
          <div className="w-1/2 sm:p-4">
            <img
              src="/images/KartCompitiendo.jpeg"
              className="sm:h-60 sm:w-full bg-cover"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 sm:p-4">
            <img
              src="/images/CaballoAndaki.jpeg"
              className="sm:h-60 sm:w-full bg-cover"
            />
          </div>
          <div className="w-1/2 sm:p-4">
            <img
              src="/images/CuatrimotoAndaki.jpeg"
              className="sm:h-60 sm:w-full bg-cover"
            />
          </div>
        </div>
        <div>
          <h1 className="sm:text-5xl text-bold text-xl pt-10 flex justify-center items-center px-4 pb-4">
            Nuestros Horarios
          </h1>
          <p className="sm:text-xl text-sm flex justify-center items-center px-4">
            Lunes: 2:00pm - 7:00 pm
          </p>
          <p className="sm:text-xl text-sm flex justify-center items-center px-4">
            Martes: Descanso
          </p>
          <p className="sm:text-xl text-sm flex justify-center items-center px-4">
            Miércoles - Jueves: Sólo Reservas 
          </p>
          <p className="sm:text-xl text-sm flex justify-center items-center px-4">
            Viernes - Sábado: 1:00 pm - 7:00 pm
          </p>
          <p className="sm:text-xl text-sm flex justify-center items-center px-4">
            Domingos y festivos: 9:00 am - 7:00 pm
          </p>         
          
        </div>
        
      </main>
    </Layout>
  );
}
