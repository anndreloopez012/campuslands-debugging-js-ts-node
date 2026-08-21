import { describe, expect, it } from 'vitest';
import {
    validarChecklistSalto,
    verificarEquipoSalto,
    ItemChecklist,
    EquipoParacaidismo
} from './skydiving';

describe('ejercicio 032 - Paracaidismo', () => {
    it('aprueba el salto solo si todos los ítems críticos están verificados', () => {
        const checklist: ItemChecklist[] = [
            { id: '1', descripcion: 'Revisión de paracaídas de reserva', esCritico: true, verificado: true },
            { id: '2', descripcion: 'Activación del AAD', esCritico: true, verificado: true },
            { id: '3', descripcion: 'Cámara de acción montada', esCritico: false, verificado: false }
        ];

        const resultado = validarChecklistSalto(checklist);

        expect(resultado.aptoParaSaltar).toBe(true);
        expect(resultado.itemsPendientesCriticos).toHaveLength(0);
        expect(resultado.totalVerificados).toBe(2);
    });

    it('rechaza el salto si existe al menos un ítem crítico sin verificar', () => {
        const checklist: ItemChecklist[] = [
            { id: '1', descripcion: 'Revisión de paracaídas principal', esCritico: true, verificado: true },
            { id: '2', descripcion: 'Calibración de altímetro', esCritico: true, verificado: false }
        ];

        const resultado = validarChecklistSalto(checklist);

        expect(resultado.aptoParaSaltar).toBe(false);
        expect(resultado.itemsPendientesCriticos).toContain('Calibración de altímetro');
    });

    it('verifica correctamente el estado general del equipo', () => {
        const equipoValido: EquipoParacaidismo = {
            paracaidasPrincipalListo: true,
            paracaidasReservaListo: true,
            altimetroCalibrado: true,
            aadActivado: true,
            cascoGafasPuestas: true
        };

        expect(verificarEquipoSalto(equipoValido)).toBe(true);
    });
});