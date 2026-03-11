import { Funcionario } from "../models/Funcionario.js";
import { CalculadoraSalario } from "./CalculadoraSalario.js";

// SRP CORRIGIDO: Responsabilidade única — formatar relatório.
export class RelatorioFuncionario {
  constructor(private calculadora: CalculadoraSalario) {}

  gerar(funcionario: Funcionario): string {
    const salarioLiquido = this.calculadora.calcularSalarioLiquido(funcionario);
    return `
========================================
       RELATÓRIO DO FUNCIONÁRIO
========================================
Nome:            ${funcionario.nome}
Cargo:           ${funcionario.cargo}
Salário Bruto:   R$ ${funcionario.salarioBase.toFixed(2)}
Salário Líquido: R$ ${salarioLiquido.toFixed(2)}
E-mail:          ${funcionario.email}
========================================`;
  }
}
