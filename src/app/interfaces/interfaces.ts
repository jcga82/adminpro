

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
  // comentarios: Comentario[];
  // mejoras: MejoraPropuesta[];
  // id_perfil: number;
  // nombre_perfil: string;
  // ahorro_agrupada?: number;
  // texto?: string;
  // descripcion?: string;
  // imagen?: string;
  // acceso_iberdrola?: boolean;
  // consumos_anuales?: ConsumoAnualKalea[];
  // tituloInforme?: string;
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
