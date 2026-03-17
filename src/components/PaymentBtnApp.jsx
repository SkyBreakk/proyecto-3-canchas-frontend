import React, { useEffect, useState } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { pagarMercadoPago } from "../helpers/payment";

const PaymentBtnApp = ({ total }) => {
  const [idReference, setIdReference] = useState(null);

  useEffect(() => {
    if (!total || total <= 0) return;

    pagarMercadoPago({
      titulo: "Reserva en Zona5",
      cantidad: 1,
      precio: total,
    })
      .then((response) => {
        console.log("Respuesta de MP:", response);
        if (response && response.id) {
          setIdReference(response.id);
        }
      })
      .catch((error) => {
        console.error("Error al traer la preferencia de pago:", error);
      });
  }, [total]);

  return (
    <div className="w-100 d-flex justify-content-center mt-3">
      <div className="w-100">
        {idReference ? (
          <Wallet
            initialization={{
              preferenceId: idReference,
            }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        ) : (
          <div className="text-center text-white p-2">
            Generando link de pago...
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentBtnApp;
