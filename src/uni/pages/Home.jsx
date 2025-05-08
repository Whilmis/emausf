import React from 'react';
import './home.css'
import quienesomos from './imagenesvarias/quienesomos.jpg'
import m4 from './imagenesvarias/m4.jpeg'
import m1 from './imagenesvarias/m1.jpeg'
import adviento from './imagenesvarias/Adviento.jpeg'
import img31 from './galeria_fotos_emaus/img-31.jpeg'
import Slideshow from '../components/ui/slideShow/SlideShow';
import { TopMenu } from '../components/ui/top-menu/TopMenu';
import { Sidebar } from '../components/ui/sidebar/Sidebar';
import Footer from '../components/ui/footer/Footer';





function Home() {
  return (
    <>
    <TopMenu />
    <Sidebar />
      <Slideshow />

      <div className="home-container">
        <h4 className="home-title">Quienes Somos</h4>
        <p className="home-text">
          Emaús es una comunidad parroquial, dirigida por el propio párroco y coordinado por
          laicos de la comunidad, con la función principal de ayudar a otras personas a
          reconocer a Jesús en su vida.
        </p>
        <img src={img31} alt="Emaús" className="home-image" />
        <p className="home-text">
          La Nueva vida que nos trae Jesús no se puede vivir al margen de los demás, sino que tiene que compartirse
          con otros hermanos en la fe y ser abierta a todos los demás.
        </p>
        <img src={quienesomos} alt="Quienes Somos" className="home-image" />
        <p className="home-text">
          La Comunidad de Emaús no se ha establecido únicamente por el simple hecho de poder compartir
          las experiencias adquiridas durante el Retiro, sino como fórmula de compromiso para servir a Jesús en
          los demás hermanos.
        </p>
      </div>

      <section className="history-section">
        <h2 className="history-title">Historia de Emaús</h2>
        <div className="divider"></div>

        <p className="history-text">
        En el año 1978, Myrna Gallagher, mujer muy bendecida por Dios y dedicada por entero a su servicio, ideó la
    creación de un Retiro muy especial. Para entonces trabajaba incansablemente ayudando a su pastor y consejero
    Espiritual, el Padre David Russell en la parroquia de San Luis en el área de Pinecrest en Miami, FL.
        </p>

        <div className="history-grid">
          <img src={m4} alt="Emaús" className="history-image" />
          <p className="history-paragraph">
          Ella quería un retiro verdadero, alejado del mundanal ruido para acercarse a Jesús y meditar Su palabra.
      Para ello debía ser un retiro para hombres y mujeres por separado, ya que nuestras problemáticas,
      sentimientos y emociones son diferentes.
          </p>
        </div>

        <p className="history-text">
        A diferencia de otros retiros espirituales, el Retiro de Emaús está basado en testimonios de vida de los
        participantes, pero también dando material de enseñanzas e ideas prácticas para nuestra vida cotidiana.
        </p>

        <div className="history-grid">
          <img src={m1} alt="Emaús" className="history-image" />
          <p className="history-paragraph">
          El objetivo final del retiro es amar cada día más a Jesús y, a través de ese amor, aprender a amar cada día
          más a nuestros hermanos y servir en nuestras parroquias.
          </p>
        </div>


        <div className="divider"></div>
      </section>

      <div className="publications-section">
        <h1 className="publications-title">Publicaciones</h1>
        <hr className="publications-divider" />
        <h2 className="publication-subtitle">EL ADVIENTO</h2>
        <p className="publication-text">
        Inicia un nuevo año Litúrgico en nuestra Iglesia. El Adviento es el período que nos prepara para la Navidad,
          donde celebramos el nacimiento del niño Jesús. La palabra latina adventus significa venida
          En el lenguaje cristiano se refiere a la venida de Jesucristo.
        </p>
        <img src={adviento} alt="Adviento" className="publication-image" />
        <p className="publication-text">
        El color litúrgico de este tiempo es el morado que significa penitencia.
        </p>
        <p className="publication-text">
        El tiempo de Adviento es un período privilegiado para los cristianos ya que nos invita a recordar el pasado,
        nos impulsa a vivir el presente y a preparar el futuro.
        </p>
        <ul className="publication-list">
          <li><span className="bold">Recordar el pasado:</span> Celebrar y contemplar el nacimiento de Jesús en Belén.</li>
          <li><span className="bold">Vivir el presente:</span> Vivir en el presente de nuestra vida diaria la presencia de Jesucristo en nosotros.</li>
          <li><span className="bold">Preparar el   futuro:</span> Prepararnos para la Parusía o segunda venida de Jesucristo en la majestad de su gloria.</li>
        </ul>
      </div>
     <Footer />

    </>
  );
}

export default Home;
