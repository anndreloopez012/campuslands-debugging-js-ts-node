export function calcularTablaPartidos(partidos) {
  const tabla = {};

  partidos.forEach((partido) => {
    const { local, visitante, golesLocal, golesVisitante } = partido;

    if (!tabla[local]) {
      tabla[local] = {
        equipo: local,
        golesFavor: 0,
        golesContra: 0
      };
    }

    if (!tabla[visitante]) {
      tabla[visitante] = {
        equipo: visitante,
        golesFavor: 0,
        golesContra: 0
      };
    }

    tabla[local].golesFavor += golesLocal;
    tabla[local].golesContra += golesVisitante;

    tabla[visitante].golesFavor += golesVisitante;
    tabla[visitante].golesContra += golesLocal;
  });

  return Object.values(tabla);
}
