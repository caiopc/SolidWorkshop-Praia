import { Funcionario } from "../models/Funcionario.js";

// SRP CORRIGIDO: Responsabilidade única — calcular salário líquido.
export class CalculadoraSalario {
  calcularSalarioLiquido(funcionario: Funcionario): number {
    const inss = this.calcularINSS(funcionario.salarioBase);
    const baseCalculo = funcionario.salarioBase - inss;
    const irrf = this.calcularIRRF(baseCalculo);
    return funcionario.salarioBase - inss - irrf;
  }

  private calcularINSS(salarioBruto: number): number {
    if (salarioBruto <= 1412.0) return salarioBruto * 0.075;
    if (salarioBruto <= 2666.68) return salarioBruto * 0.09;
    if (salarioBruto <= 4000.03) return salarioBruto * 0.12;
    return salarioBruto * 0.14;
  }

  private calcularIRRF(baseCalculo: number): number {
    if (baseCalculo <= 2259.2) return 0;
    if (baseCalculo <= 2826.65) return baseCalculo * 0.075;
    if (baseCalculo <= 3751.05) return baseCalculo * 0.15;
    return baseCalculo * 0.225;
  }
}
