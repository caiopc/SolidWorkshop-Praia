// =============================================================
// VIOLAÇÃO DIP #1: PedidoService depende diretamente de
// classes concretas (SqlRepository, EmailService).
// Instancia as dependências internamente com "new".
// =============================================================
class SqlRepository {
  salvar(dados: string): void {
    console.log(`[SQL Server] Salvando: ${dados}`);
  }
  deletar(id: number): void {
    console.log(`[SQL Server] DELETE FROM Pedidos WHERE Id = ${id}`);
  }
}

class EmailService {
  enviar(destinatario: string, assunto: string, corpo: string): void {
    console.log(`[SMTP] Para: ${destinatario} | Assunto: ${assunto}`);
    console.log(`[SMTP] Corpo: ${corpo}`);
  }
}

export class PedidoService {
  // Dependências concretas instanciadas internamente
  private repository = new SqlRepository();
  private emailService = new EmailService();

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
