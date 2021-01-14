import gql from 'graphql-tag';

export const Users = gql`
query {profiles {
  identifier
  codigo
  usuario
  cuentaUsuario
  tipoCuenta
  tituloInforme
  zona
  actividad
  superficie
  comentarios {
    date
    comentario
  }
  idUsuario
  idPerfil
  nombrePerfil
  descripcion
  esAgrupada
  abierto
  localizacion  {
    coordinates
  }
  mejoras {
    date
    titulo
    descripcion
    tag
  }
}}
`;

export const Profile = gql`
query Profile($usuario: String) {
  profiles(usuario: $usuario) {
    identifier
    codigo
    usuario
    cuentaUsuario
    tipoCuenta
    tituloInforme
    esAgrupada
    abierto
    zona
    actividad
    superficie
    comentarios {
      date
      comentario
    }
    idUsuario
    idPerfil
    nombrePerfil
    descripcion
    localizacion  {
      coordinates
    }
    mejoras {
      date
      titulo
      descripcion
      tag
    }
  }
}
`;

export const CalidadDato = gql`
query PruebaEstimaciones($oidProfile: String, $initDate: Date, $endDate: Date) {
  profiles (usuario: $oidProfile) {
    identifier
    codigo
    usuario
    cuentaUsuario
  }
  analisis (oidProfile: $oidProfile,initDate: $initDate, endDate: $endDate) {
    numDias
    totalCorrecto
    totalEstimado
    totalFallo
    totalNulo
    totalZero
    porcentajeEstimado
    porcentajeCorrecto
    porcentajeZero
  }
  estimacion (oidProfile: $oidProfile) {
    oidProfile
    estado
    timestamp
  }
}
`;

export const CalidadDatoTotal = gql`
query estimacion($initDate: Date,$endDate: Date) {
  analisisEst: analisisCompleto(initDate:$initDate,endDate: $endDate) {
    oidProfile
    nombrePerfil
    initDate
    endDate
    numDias
    totalCorrecto
    totalEstimado
    totalZero
    totalNulo
    totalFallo
    porcentajeCorrecto
    porcentajeEstimado
    porcentajeZero
    porcentajeNulo
    porcentajeFallo
  }
}
`;

export const MutatePerfil = gql`
  mutation SetDescripcionCuenta (\
    $identifier: String,\
    $descripcion: String\
) {\
updateProfile (\
    profileData: {\
      identifier: $identifier,\
      descripcion: $descripcion\
    }) {\
    profile {\
      identifier\
      descripcion\
    }\
  }\
}
`;

export const MutateCambiarBooleanos = gql`
    mutation cambioProfileAgrupada (\
      $valorAgrupada: Boolean,\
      $valorActivo: Boolean,\
      $identificador: String\
      ) {\
      updateProfile (\
        profileData: {\
          identifier: $identificador,\
          esAgrupada: $valorAgrupada,\
          abierto: $valorActivo,\
        }) {\
        profile {\
          esAgrupada\
          abierto\
          identifier\
        }\
      }\
    }
`;

export const MutateLocalizacion = gql`
  mutation cambioLocalizacion (\
      $valorLatitud: Float,\
      $valorLongitud: Float,\
      $identificador: String\
      ) {\
        updateProfileLocalizacion (\
          profileId: $identificador,\
          localizacion: {\
            latitud: $valorLatitud,\
            longitud: $valorLongitud,\
        }) {\
        profile {\
          codigo\
        }\
      }\
    }
`;

export const MutateAddComentario = gql`
  mutation AddComentario (\
      $profileId: String,\
      $date: Date,\
      $comentario: String\
    ) {\
    addComentario(\
      profileId: $profileId,\
      comentario: {\
        date: $date,\
        comentario: $comentario\
      }\
    ) {\
    comentarios {\
      date\
      comentario\
    }\
  }\
}
`;

export const MutateEditComentario = gql`
mutation ReplaceComentario (\
  $profileId: String,\
  $oldDate: Date,\
  $oldComentario: String,\
  $newDate: Date,\
  $newComentario: String\
  ) {\
  replaceComentario (\
    profileId: $profileId,\
    comentarioOld: {\
      date: $oldDate,\
      comentario: $oldComentario\
    },\
    comentarioNew: {\
      date: $newDate,\
      comentario: $newComentario\
    }\
    ) {\
    comentarios {\
      date comentario\
    }\
  }\
}
`;

export const MutateDeleteComentario = gql`
mutation DeleteComentario (
  $profileId: String,\
  $date: Date,\
  $comentario: String,\
  ) {
  deleteComentario(
    profileId: $profileId,
    comentario: {
      date: $date,
      comentario: $comentario
    }
  ) {
    comentarios {
      date
      comentario
    }
  }
}
`;

export const MutateAddMejora = gql`
  mutation AddMejoraPropuestaPotencia (\
    $profileId: String,\
    $date: Date,\
    $titulo: String,\
    $descripcion: String\
    $tag: String\
  ) {\
  addMejoraPropuesta (\
    profileId: $profileId,\
    mejora: {\
      date: $date,\
      titulo: $titulo,\
      descripcion: $descripcion\
      tag: $tag\
    } )\
    {\
      mejoras {\
        date titulo descripcion tag\
      }\
    }\
  }
`;

export const MutateEditMejora = gql`
mutation ReplaceMejoraPotencia (\
  $profileId: String,\
  $oldDate: Date,\
  $oldTitulo: String,\
  $oldDescripcion: String,\
  $newDate: Date,\
  $newTitulo: String,\
  $newDescripcion: String\
  $tag: String\
  ) {\
  replaceMejoraPropuesta (\
    profileId: $profileId,\
    mejoraOld: {\
      date: $oldDate,\
      titulo: $oldTitulo,\
      descripcion: $oldDescripcion\
      tag: $tag\
    }, \
    mejoraNew: {\
      date: $newDate,\
      titulo: $newDescripcion,\
      descripcion: $newDescripcion\
      tag: $tag\
    } )\
    {\
      mejoras {\
        date titulo descripcion tag\
      }\
    }\
  }
`;

export const MutateDeleteMejora = gql`
mutation DeleteMejoraPropuesta (
  $profileId: String,\
  $date: Date,\
  $titulo: String,\
  $descripcion: String,\
  ) {
  deleteMejoraPropuesta(
    profileId: $profileId,
    mejora: {
      date: $date,
      titulo: $titulo,
      descripcion: $descripcion
    }
  ) {
    mejoras {
      date
      mejora
    }
  }
}
`;

export const Cups = gql`
query Suministro($oidProfile: String) {
  suministro(oidProfile: $oidProfile) {
    cups
  }
}
`;

export const Contrato = gql`
query Contrato($oidCuenta: String) {
  contrato(oidCuenta: $oidCuenta) {
    tarifa
    potenciaP1
  }
}
`;

export const Consumo = gql`
query Consumo($idPerfilIn: [Int],$firstYear:Int,$secondYear:Int,$extraYear: Int){
  consumo2018: sumConsumoAnual(idPerfilIn: $idPerfilIn, yearDigit: $firstYear) {
    idPerfil
    year
    initDate
    endDate
    consumoWh
  }
  consumo2019: sumConsumoAnual(idPerfilIn: $idPerfilIn, yearDigit: $secondYear) {
    idPerfil
    year
    initDate
    endDate
    consumoWh
  }
  consumo2020: sumConsumoAnual(idPerfilIn: $idPerfilIn, yearDigit: $extraYear) {
    idPerfil
    year
    initDate
    endDate
    consumoWh
  }
}
`;
