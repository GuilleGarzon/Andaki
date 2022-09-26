import Image from "next/image";

function Footer() {
  return (
    <footer className="flex h-16 text-xs sm:text-lg justify-center items-center bg-black">
      <p className="text-white mr-4 sm:mr-10 text:xs">Copyright © 2022 Andaki Karts</p>   
      <div className="cursor-pointer">
        <a href="https://www.facebook.com/andakikarts" target="_blank" rel="noreferrer" className="mr-2 sm:mr-3">
          <Image alt="Imagen de facebook" src="/images/FacebookLogo.png" width={20} height={20}/>
        </a>
        <a href="https://www.instagram.com/andakikarts/" target="_blank" rel="noreferrer" className="mr-2 sm:mr-3" >
        <Image alt="Imagen de Instagram" src="/images/InstagramLogo.png" width={20} height={20}/>
        </a>
        <a href="https://wa.me/573125685381/?text=Buenas.%20Quisiera%20saber%20más%20información" target="_blank" rel="noreferrer" className="sm:mr-3">
        <Image alt="Imagen de WhatsApp" src="/images/WhatsAppLogo.png" width={20} height={20}/>
        </a>
      </div>   
    </footer>
    
  );
}

export default Footer;
