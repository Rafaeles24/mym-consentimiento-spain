import { ConsentimientoFiltros, ConsentimientosResponse, TipoConsentimiento } from "@/types/consentimiento.type";

const API_URL = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

export async function getConsentimiento(
  origen: TipoConsentimiento,
  page: number,
  limit: number,
  filtros: ConsentimientoFiltros
) : Promise<ConsentimientosResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (filtros.dni) {
    params.set("dni", filtros.dni);
  }

  if (filtros.num_telefono) {
    params.set("num_telefono", filtros.num_telefono);
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

  const response = await fetch(
    `${API_URL}/system/consentimiento/${origen}?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("No se pudieron obtener los consentimientos.");
  }

  return response.json();
}

export async function actualizarFechaConsentimiento(
  origen: TipoConsentimiento,
  id: number,
  fecha: string,
) {
  const response = await fetch(
    `${API_URL}/system/consentimiento/${origen}/${id}/fecha`, 
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fecha_consentimiento: fecha,
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "No se puedo actualizar la fecha");
  }

  return data;

}