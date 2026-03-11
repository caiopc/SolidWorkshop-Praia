// =============================================================
// VIOLAÇÃO OCP #1: Para adicionar um novo tipo de cliente,
// é necessário MODIFICAR esta classe (abrir o switch).
// =============================================================
export class CalculadoraDesconto {
  calcularDesconto(tipoCliente: string, valorCompra: number): number {
    let desconto: number;

    switch (tipoCliente.toLowerCase()) {
      case "regular":
        desconto = valorCompra * 0.05;
        break;
      case "premium":
        desconto = valorCompra * 0.1;
        break;
      case "vip":
        desconto = valorCompra * 0.2;
        break;
      case "funcionario":
        desconto = valorCompra * 0.3;
        break;
      default:
        desconto = 0;
        break;
    }

    console.log(
      `Cliente ${tipoCliente}: Compra R$ ${valorCompra.toFixed(2)} | ` +
        `Desconto R$ ${desconto.toFixed(2)} | Total R$ ${(valorCompra - desconto).toFixed(2)}`
    );
    return desconto;
  }
}
