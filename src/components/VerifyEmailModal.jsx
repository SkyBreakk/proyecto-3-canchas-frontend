import { useState } from "react";
import { useForm } from "react-hook-form";
import { verifyEmail, resendVerificationCode } from "../helpers/auth";
import AlertApp from "./AlertApp";
import "../assets/css/verifyemailmodal.css";

function VerifyEmailModal({ email, onSuccess, onClose }) {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState(null);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState(null);

  const onSubmit = async (data) => {
    const result = await verifyEmail({
      email,
      code: data.code,
    });

    setResponse(result);

    if (result.ok) {
      onSuccess();
    }
  };

  const handleResendCode = async () => {
    if (resending) return;

    setResending(true);
    setResendMessage(null);

    const result = await resendVerificationCode(email);
    setResendMessage(result);

    if (result.ok) {
      setTimeout(() => setResendMessage(null), 3000);
    }

    setResending(false);
  };

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content custom-modal-content p-4 position-relative">
          <button
            type="button"
            className="btn-close-modal"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>

          <h4 className="text-center mb-3 text-white">Verificar Email</h4>

          <p className="text-center text-white">
            Ingresa el código que enviamos a <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control mb-3"
              placeholder="Código de verificación"
              {...register("code", {
                required: "El código es obligatorio",
                pattern: {
                  value: /^\d{6}$/,
                  message: "El código debe tener 6 dígitos",
                },
              })}
            />

            <button className="btn custom-btn w-100 mb-2" type="submit">
              Verificar
            </button>
          </form>

          {resendMessage && (
            <AlertApp
              message={resendMessage.message}
              type={resendMessage.ok ? "success" : "error"}
            />
          )}

          <div className="text-center mt-3">
            <small className="text-white">
              ¿No recibiste el código?{" "}
              <button
                type="button"
                className="btn-link text-registro"
                onClick={handleResendCode}
                disabled={resending}
              >
                {resending ? "Enviando..." : "Reenviar código"}
              </button>
            </small>
          </div>

          {response && !response.ok && <AlertApp message={response.message} />}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailModal;
