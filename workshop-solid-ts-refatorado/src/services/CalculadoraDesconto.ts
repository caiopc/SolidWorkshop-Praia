import { IDescontoStrategy } from "../interfaces/IDescontoStrategy.js";

// OCP CORRIGIDO: Não precisa mais ser modificada para novos tipos.
export class CalculadoraDesconto {
  constructor(private estrategias: IDescontoStrategy[]) {}

  calcularDesconto(tipoCliente: string, valorCompra: number): number {
    const estrategia = this.estrategias.find(
      (e) => e.tipoCliente.toLowerCase() === tipoCliente.toLowerCase()
    );

    if (!estrategia) {
      console.log(`Tipo '${tipoCliente}' não encontrado. Sem desconto.`);
      return 0;
    }

    const desconto = estrategia.calcularDesconto(valorCompra);
    console.log(
      `Cliente ${tipoCliente}: Compra R$ ${valorCompra.toFixed(2)} | ` +
        `Desconto R$ ${desconto.toFixed(2)} | Total R$ ${(valorCompra - desconto).toFixed(2)}`
    );
    return desconto;
  }
}
