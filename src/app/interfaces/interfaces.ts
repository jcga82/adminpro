
export interface Comentario {
  date: Date;
  comentario: string;
}

export interface MejoraPropuesta {
  date: Date;
  titulo: string;
  descripcion: string;
  tag?: string;
}

export interface Usuario {
  identifier: string;
  usuario: string;
  codigo?: string;
  actividad?: string;
  cuenta_usuario?: string;
  tipo_cuenta?: string;
  zona?: string;
  superficie?: number;
  // id_usuario: number;
  comentarios: Comentario[];
  mejoras: MejoraPropuesta[];
  id_perfil: number;
  // nombre_perfil: string;
  // ahorro_agrupada?: number;
  // texto?: string;
  descripcion?: string;
  // imagen?: string;
  // acceso_iberdrola?: boolean;
  consumos_anuales?: ConsumoAnualKalea[];
  tituloInforme?: string;
}

export interface RespuestaGetMyData {
  items?: Item[];
  params?: {
    Consumo: Consumo;
  };
}

export interface Item {
    timestamp: string;
    month_str: string;
    value0: number;
}

export interface Consumo {
  title: string;
  max_value: number;
  mean_value: number;
  sum_value: number;
  label: string;
  periodos: Periodos;
  valueField: string;
  unit: string;
  balloonText: string;
  id: string;
  fillAlphas: number;
}

export interface Periodos {
//   '2': _2;
//   '3': _3;
//   punta_valle: _2;
  punta_valle_llano: {
    punta: number;
    llano: number;
    valle: number;
  };
}

export interface ConsumoPeriodos {
  periodo: string;
  value: number;
}

export interface Menu {
  icon: string;
  name: string;
  redirect: string;
}

// Informes

export interface InformeImage {
  id: string;
  cuenta: string;
  is_background: boolean;
  is_trending_up: boolean;
  is_trending_down: boolean;
  data: string;
}

export function createInformeImage(params: Partial<InformeImage>) {
  return {
    id: params.id,
    cuenta: params.cuenta,
    is_background: params.is_background,
    is_trending_up: params.is_trending_up,
    is_trending_down: params.is_trending_down,
    data: params.data
  } as InformeImage;
}

export interface ConsumoAnualKalea {
  idPerfil: number;
  year: Date;
  consumoWh: number;
  initDate?: string;
  endDate?: string;
}
