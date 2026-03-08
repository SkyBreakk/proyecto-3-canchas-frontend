import { useState } from "react";
import { useForm } from "react-hook-form";
import { verifyEmail } from "../helpers/auth";
import AlertApp from "./AlertApp";
import "../css/verifyemailmodal.css";

function VerifyEmailModal({ email, onSuccess }) {

  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState(null);

  const onSubmit = async (data) => {

    const result = await verifyEmail({
      email,
      code: data.code
    });

    setResponse(result);

    if (result.ok) {
      onSuccess();
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content p-4">

          <h4 className="text-center mb-3 text-white">
            Verificar Email
          </h4>

          <p className="text-center text-white">
            Ingresa el código que enviamos a tu correo
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              className="form-control mb-3"
              placeholder="Código de verificación"
              {...register("code", {
                required: "El código es obligatorio"
              })}
            />

            <button className="btn custom-btn w-100">
              Verificar
            </button>

          </form>

          {response && !response.ok && (
            <AlertApp message={response.message} />
          )}

        </div>
      </div>
    </div>
  );
}

export default VerifyEmailModal;