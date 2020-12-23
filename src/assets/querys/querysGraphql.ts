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
