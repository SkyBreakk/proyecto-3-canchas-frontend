import zona5 from '../assets/img/zona5.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link as Linkerror404 } from 'react-router-dom';
import '../assets/css/Error404.css'

const Error404 = () => {
  return (
    
    <div className="error-container d-flex justify-content-center align-items-center w-100">
      <div className=" d-flex flex-column align-items-center">
        
        <div className="d-flex align-items-center justify-content-center position-relative">
          <span className="numero">4</span>
          
         
          <img 
            src={zona5} 
            alt="logo zona5" 
            className="zona5Cero img-fluid" 
          />
          
          <span className="numero">4</span>
        </div>

        <div className="text-center">
          <p className="error-text">OFFSIDE!</p>
          <p className='msj'>Te fuiste fuera de juego...<br/>Esta página se fue a la tribuna.</p>
                 
         <Linkerror404 
            to="/" 
            className="btn btnInicio mt-1"
          >
            Volver al Inicio
          </Linkerror404>
          
        </div>

      </div>
    </div>
  );
};

export default Error404;