"use client";

import { Consentimiento } from "@/types/consentimiento.type";
import FechaEditable
  from "../fechaEditable/ui";

import styles from "./ui.module.css";

export default function TablaConsentimientos({
  data,
  onFechaUpdated,
}: {
  data: Consentimiento[];
  onFechaUpdated: () => void;
}) {

  if (!data.length) {

    return (
      <div className={styles.empty}>
        No se encontraron registros.
      </div>
    );

  }

  return (
    <div className={styles.wrapper}>

      <table className={styles.table}>

        <thead>

          <tr>
            <th>ID</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Contacto</th>
            <th>Verificado</th>
            <th>IP</th>
            <th>Fecha consentimiento</th>
          </tr>

        </thead>

        <tbody>

          {data.map(
            (consentimiento) => (

              <tr
                key={
                  consentimiento.id
                }
              >

                <td>
                  {consentimiento.id}
                </td>

                <td>
                  {consentimiento.dni}
                </td>

                <td>
                  {
                    consentimiento
                      .nombre_completo
                  }
                </td>

                <td>
                  {
                    consentimiento
                      .num_telefono
                  }
                </td>

                <td>
                  {
                    consentimiento
                      .num_contacto
                  }
                </td>

                <td>

                  <span
                    className={
                      consentimiento.verificado
                        ? styles.verificado
                        : styles.noVerificado
                    }
                  >
                    {
                      consentimiento.verificado
                        ? "SÍ"
                        : "NO"
                    }
                  </span>

                </td>

                <td>
                  {
                    consentimiento
                      .direccion_ip ??
                    "-"
                  }
                </td>

                <td>

                  <FechaEditable
                    id={
                      consentimiento.id
                    }
                    origen={
                      consentimiento
                        .tipo_consentimiento
                    }
                    fecha={
                      consentimiento
                        .fecha_consentimiento
                    }
                    onUpdated={
                      onFechaUpdated
                    }
                  />

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>
  );
}