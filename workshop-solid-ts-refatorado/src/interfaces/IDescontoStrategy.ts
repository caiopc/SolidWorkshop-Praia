// OCP CORRIGIDO: Cada tipo de desconto é uma estratégia independente.
export interface IDescontoStrategy {
  tipoCliente: string;
  calcularDesconto(valorCompra: number): number;
}

export class DescontoRegular implements IDescontoStrategy {
  tipoCliente = "Regular";
  calcularDesconto(valorCompra: number): number { return valorCompra * 0.05; }
}

export class DescontoPremium implements IDescontoStrategy {
  tipoCliente = "Premium";
  calcularDesconto(valorCompra: number): number { return valorCompra * 0.10; }
}

export class DescontoVip implements IDescontoStrategy {
  tipoCliente = "VIP";
  calcularDesconto(valorCompra: number): number { return valorCompra * 0.20; }
}

export class DescontoFuncionario implements IDescontoStrategy {
  tipoCliente = "Funcionário";
  calcularDesconto(valorCompra: number): number { return valorCompra * 0.30; }
}
