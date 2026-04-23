import { useState } from "react";
import { useForm } from "react-hook-form";
import { verifyEmail, resendVerificationCode } from "../helpers/auth";
import { useToast } from "../context/ToastContext";
import "../assets/css/verifyemailmodal.css";

function VerifyEmailModal({ email, onSuccess, onClose }) {
  const { register, handleSubmit } = useForm();
  const { showToast } = useToast();
  const [resending, setResending] = useState(false);

  const onSubmit = async (data) => {
    const result = await verifyEmail({
      email,
      code: data.code,
    });

    if (result.ok) {
      onSuccess();
    } else {
      showToast(result?.message || "Código inválido", "danger");
    }
  };

  const handleResendCode = async () => {
    if (resending) return;
    setResending(true);

    const result = await resendVerificationCode(email);
    if (result.ok) {
      showToast(
        "Nuevo código enviado. Revisa tu bandeja de entrada",
        "success",
      );
    } else {
      showToast(
        result?.message || "Error al reenviar. Intenta en unos segundos.",
        "danger",
      );
    }

    setResending(false);
  };

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(event) => event.stopPropagation()}
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
              type="text"
              inputMode="numeric"
              maxLength={6}
              onKeyDown={(event) => {
                if (
                  !/[0-9]/.test(event.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                  ].includes(event.key)
                ) {
                  event.preventDefault();
                }
              }}
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
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailModal;
