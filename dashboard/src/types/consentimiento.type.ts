export type TipoConsentimiento =
  | "DEMO_TELECOM"
  | "ENERGIA_GLOBAL_SPAIN";

export interface Consentimiento {
  id: number;
  tipo_consentimiento: TipoConsentimiento;
  dni: string;
  num_telefono: string;
  num_contacto: string;
  nombre_completo: string;
  verificado: boolean;
  direccion_ip: string | null;
  fecha_consentimiento: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ConsentimientosResponse {
  data: Consentimiento[];
  pagination: Pagination;
}

export interface ConsentimientoFiltros {
  dni: string;
  num_telefono: string;
  num_contacto: string;
  nombre_completo: string;
  verificado: string;
  direccion_ip: string;
  fechaInicio: string;
  fechaFin: string;
}