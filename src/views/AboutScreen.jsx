import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/css/about.css";

const integrantes = [
  {
    nombre: "María Morales",
    usuario: "moralesa2869",
    img: "https://avatars.githubusercontent.com/u/225981560?v=4",
    github: "https://github.com/moralesa2869"
  },
  {
    nombre: "Pablo Padilla",
    usuario: "PabloPadilla85",
    img: "https://avatars.githubusercontent.com/u/226407877?v=4",
    github: "https://github.com/PabloPadilla85"
  },
  {
    nombre: "Samuel Fernández",
    usuario: "SkyBreakk",
    img: "https://avatars.githubusercontent.com/u/225979739?v=4",
    github: "https://github.com/SkyBreakk"
  },
  {
    nombre: "Juan Vargas",
    usuario: "juanmv32",
    img: "https://avatars.githubusercontent.com/u/71360998?v=4",
    github: "https://github.com/juanmv32"
  },
  {
    nombre: "Celeste Soto",
    usuario: "celestemariel28",
    img: "https://avatars.githubusercontent.com/u/225981797?s=400&u=4e97a5a52302e5fac30e7d2729e60f21e845fa2f&v=4",
    github: "https://github.com/celestemariel28"
  }
];

const AboutScreen = () => {
  return (
    <div className="about-container">
      <div className="about-principal text-center text-white">
        <h1 className="title">
          Sobre <span>Nosotros</span>
        </h1>

        <p className="subtitle">
          Innovamos la forma de reservar canchas ⚽
        </p>

        <p className="descripcion">
          Somos <strong>Zona5</strong>, un equipo de 5 desarrolladores apasionados por el deporte y la tecnología.
          <br />
          Creamos una plataforma para que reservar tu cancha sea
          <span className="resaltar"> rápido, simple y sin vueltas.</span>
        </p>
      </div>

      <div className="container text-center mt-5">
        <h2 className="equipo-title">Nuestro Equipo</h2>

        <div className="row mt-4 justify-content-center" >
          {integrantes.map((user, index) => (
            <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
              <div className="card integrante-card">
                <img src={user.img} className="card-img-top" alt={user.nombre} />
                <div className="card-body">
                  <h5>{user.nombre}</h5>
                  <p className="username">{user.usuario}</p>

                  <a
                    href={user.github}
                    target="_blank"
                    className="btn btn-success btn-sm"
                  >
                    <i className="bi bi-github"> GitHub</i>
                    
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cita text-center mt-5">
        <h4> Reservá. Jugá. Disfrutá.</h4>
        <p className="text-white"> ⚽Zona5 — Donde el partido empieza antes de la cancha.</p>
      </div>
    </div>
  );
};

export default AboutScreen;