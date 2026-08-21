export interface ItemChecklist {
    id: string;
    descripcion: string;
    esCritico: boolean;
    verificado: boolean;
}

export interface EquipoParacaidismo {
    paracaidasPrincipalListo: boolean;
    paracaidasReservaListo: boolean;
    altimetroCalibrado: boolean;
    aadActivado: boolean; 
    cascoGafasPuestas: boolean;
}

export interface ResultadoValidacionSalto {
    aptoParaSaltar: boolean;
    itemsPendientesCriticos: string[];
    totalVerificados: number;
    totalItems: number;
}

export function validarChecklistSalto(checklist: ItemChecklist[]): ResultadoValidacionSalto {
    if (!Array.isArray(checklist) || checklist.length === 0) {
        return {
            aptoParaSaltar: false,
            itemsPendientesCriticos: ['No hay ítems en el checklist'],
            totalVerificados: 0,
            totalItems: 0
        };
    }

    const pendientesCriticos = checklist
        .filter((item) => item.esCritico && !item.verificado)
        .map((item) => item.descripcion);

    const totalVerificados = checklist.filter((item) => item.verificado).length;

    return {
        aptoParaSaltar: pendientesCriticos.length === 0,
        itemsPendientesCriticos: pendientesCriticos,
        totalVerificados,
        totalItems: checklist.length
    };
}

export function verificarEquipoSalto(equipo: EquipoParacaidismo): boolean {
    if (!equipo) return false;

    return (
        equipo.paracaidasPrincipalListo &&
        equipo.paracaidasReservaListo &&
        equipo.altimetroCalibrado &&
        equipo.aadActivado &&
        equipo.cascoGafasPuestas
    );
}

