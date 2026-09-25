import {
  ConsentimientoFiltros,
  ConsentimientoResponse,
  TipoConsentimiento,
} from "@/types/consentimiento.type";


const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ??
  "http://localhost:3001";


export async function getConsentimiento(
  origen: TipoConsentimiento,
  page: number,
  limit: number,
  filtros: ConsentimientoFiltros,
): Promise<ConsentimientoResponse> {

  const params =
    new URLSearchParams();


  params.set(
    "page",
    page.toString(),
  );


  params.set(
    "limit",
    limit.toString(),
  );


  if (filtros.dni) {
    params.set(
      "dni",
      filtros.dni,
    );
  }


  if (filtros.num_telefono) {
    params.set(
      "num_telefono",
      filtros.num_telefono,
    );
  }


  if (filtros.num_contacto) {
    params.set(
      "num_contacto",
      filtros.num_contacto,
    );
  }


  if (filtros.nombre_completo) {
    params.set(
      "nombre_completo",
      filtros.nombre_completo,
    );
  }


  if (filtros.verificado) {
    params.set(
      "verificado",
      filtros.verificado,
    );
  }


  if (filtros.direccion_ip) {
    params.set(
      "direccion_ip",
      filtros.direccion_ip,
    );
  }


  if (filtros.fechaInicio) {
    params.set(
      "fechaInicio",
      filtros.fechaInicio,
    );
  }


  if (filtros.fechaFin) {
    params.set(
      "fechaFin",
      filtros.fechaFin,
    );
  }


  const response =
    await fetch(
      `${API_URL}/system/consentimiento/${origen}?${params.toString()}`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",
        },

        cache: "no-store",
      },
    );


  if (!response.ok) {

    throw new Error(
      `Error obteniendo consentimientos: ${response.status}`,
    );

  }


  return response.json();
}

export async function actualizarFechaConsentimiento(
  origen: TipoConsentimiento,
  id: number,
  fecha_consentimiento: string,
) {

  const response =
    await fetch(
      `${API_URL}/system/consentimiento/${origen}/${id}/fecha`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          fecha_consentimiento,
        }),
      },
    );


  if (!response.ok) {

    const error =
      await response
        .json()
        .catch(() => null);


    throw new Error(
      error?.message ??
        `Error actualizando fecha: ${response.status}`,
    );
  }


  return response.json();
}