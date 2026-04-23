import React, { useEffect, useState } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { pagarMercadoPago } from "../helpers/payment";

const PaymentBtnApp = ({ total, compraDirecta, cantidad }) => {
  const [idReference, setIdReference] = useState(null);
  useEffect(() => {
    if (!total || total <= 0) {
      setIdReference(null);
      return;
    }
    setIdReference(null);

    const datosPago = compraDirecta
      ? {
          tipo: "directa",
          cantidad: cantidad,
          id: compraDirecta._id,
        }
      : { tipo: "carrito", id: "carrito_actual" };
    pagarMercadoPago(datosPago)
      .then((res) => {
        if (res.ok) setIdReference(res.id);
      })
      .catch(console.error);
  }, [total, compraDirecta]);

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
