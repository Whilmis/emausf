import React from "react";
import './retiros.css'
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import { TopMenu } from "../components/ui/top-menu/TopMenu";
import Footer from "../components/ui/footer/Footer";

const Retiros = () => {
  return (
    <>
     <TopMenu />
     <Sidebar />

    <section className="retiros-section">
           
      <h4 className="retiros-title">¿Qué son los Retiros de Emaús?</h4>
      <hr className="retiros-divider" />

      <p className="retiros-text">
        A través de los siglos, dentro de todas las disciplinas espirituales contemplativas, ha existido la práctica
        de ir a retiro en lugares apartados, naturales y callados. Esto con el fin de profundizar en la meditación,
        la reflexión y la contemplación. Un retiro espiritual es una ocasión para profundizar en el espíritu de
        oración, mejorar nuestra respuesta a la llamada personal de Dios y concretar propósitos de vida cristiana.
      </p>

      <div className="retiros-grid">
        <p className="retiros-subtext">
          Los retiros de Emaús están basados en el pasaje bíblico del Evangelio según San Lucas (24, 13-35),
          donde dos discípulos se dirigían a un pueblo llamado Emaús, cerca de Jerusalén.
        </p>
        <img 
          src='https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790796/imagenesvarias/tx7jngyxxg5aw61hw1yo.jpg'
          alt="Camino de Emaús" 
          className="retiros-image"
        />
      </div>

      <p className="retiros-text">
        Mientras caminaban, Jesús se acercó y comenzó a caminar con ellos, pero no le reconocieron. Al caer la noche,
        lo invitaron a quedarse. Al partir el pan, sus ojos se abrieron y reconocieron a Jesús Resucitado.
      </p>

      <p className="retiros-text">
        Se trata de un paralelismo con nuestra vida: Jesús camina a nuestro lado, pero en muchas ocasiones no lo vemos.
        Esta es la clave del retiro: recordar, descubrir o iniciar la experiencia de tener a Cristo presente en nuestra vida.
      </p>

      <p className="retiros-text">
        El retiro de Emaús es una oportunidad para que cualquier persona, ya sea cercana o alejada de la Iglesia, 
        viva una experiencia transformadora. Para quienes tienen una fe activa, es una reafirmación y renovación espiritual.
      </p>

      <p className="retiros-text">
        Durante el retiro, del viernes por la tarde al domingo por la tarde, se crea un ambiente donde el Espíritu Santo
        guía cada paso. El testimonio de vida de laicos tiene un papel preponderante, abordando temas como el amor, el sufrimiento,
        el perdón, la oración y la sanación física y espiritual.
      </p>

      <p className="retiros-text">
        Este retiro brinda un espacio para la reflexión y el encuentro con Dios. Ayuda a fortalecer la esperanza,
        cambiar prioridades y renovar el propósito de vida.
      </p>

     

      <h4 className="retiros-subtitle">¿Quiénes pueden participar del retiro?</h4>

      <p className="retiros-text">
        Pueden asistir personas laicas y religiosas de todos los carismas de la Iglesia, incluso personas no católicas 
        o de otras confesiones. El amor de Dios no pone barreras. Los retiros están organizados por separado para hombres 
        y mujeres. Asisten personas de parroquias, sacerdotes y consagradas, así como quienes se han alejado de la fe.
      </p>

      <p className="retiros-text">
        Muchos llegan al retiro sin saber qué esperar, pero todos parten con una nueva experiencia de fe. 
        Dios transforma el corazón y renueva la vida. Al final, los asistentes salen con alegría, como los discípulos de Emaús, 
        listos para compartir su experiencia con el mundo.
      </p>

      <p className="retiros-confidentiality">
        <span className="retiros-confidentiality-highlight">CONFIDENCIALIDAD:</span> Se debe respetar lo vivido en el retiro. 
        Es una experiencia única y personal que debe ser protegida.
      </p>

      <div className="retiros-divider"></div>
    </section>
    <Footer />
    </>
  );
};

export default Retiros;
