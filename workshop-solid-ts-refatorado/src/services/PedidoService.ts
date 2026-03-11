import { IRepository, IServicoEmail } from "../interfaces/IRepository.js";

// DIP CORRIGIDO: Depende de abstrações injetadas via construtor.
export class PedidoService {
  constructor(
    private repository: IRepository,
    private emailService: IServicoEmail
  ) {}

  criarPedido(cliente: string, produto: string, valor: number): void {
    console.log(`\n--- Criando pedido para ${cliente} ---`);
    this.repository.salvar(`Pedido: ${cliente} - ${produto} - R$ ${valor.toFixed(2)}`);
    this.emailService.enviar(
      cliente,
      "Pedido Criado",
      `Seu pedido de ${produto} no valor de R$ ${valor.toFixed(2)} foi criado com sucesso!`
    );
    console.log("Pedido criado com sucesso!");
  }

  cancelarPedido(pedidoId: number, cliente: string): void {
    console.log(`\n--- Cancelando pedido #${pedidoId} ---`);
    this.repository.deletar(pedidoId);
    this.emailService.enviar(cliente, "Pedido Cancelado", `Seu pedido #${pedidoId} foi cancelado.`);
    console.log("Pedido cancelado!");
  }
}
