// =============================================================
// VIOLAÇÃO SRP #2: NotaFiscal valida dados, calcula impostos
// E envia e-mail de confirmação. Três responsabilidades.
// =============================================================
export class NotaFiscal {
  public dataEmissao: Date;

  constructor(
    public numero: number,
    public clienteNome: string,
    public clienteEmail: string,
    public valor: number
  ) {
    this.dataEmissao = new Date();
  }

  // Responsabilidade 1: Validação
  validar(): boolean {
    if (!this.clienteNome?.trim()) {
      console.log("Erro: Nome do cliente é obrigatório.");
      return false;
    }
    if (this.valor <= 0) {
      console.log("Erro: Valor da nota fiscal deve ser maior que zero.");
      return false;
    }
    if (!this.clienteEmail?.includes("@")) {
      console.log("Erro: E-mail do cliente é inválido.");
      return false;
    }
    console.log("Nota fiscal validada com sucesso.");
    return true;
  }

  // Responsabilidade 2: Cálculo de impostos
  calcularImpostos(): number {
    const icms = this.valor * 0.18;
    const iss = this.valor * 0.05;
    const total = icms + iss;
    console.log(
      `ICMS: R$ ${icms.toFixed(2)} | ISS: R$ ${iss.toFixed(2)} | Total Impostos: R$ ${total.toFixed(2)}`
    );
    return total;
  }

  // Responsabilidade 3: Envio de e-mail
  enviarPorEmail(): void {
    console.log(`[SMTP] Conectando ao servidor de e-mail...`);
    console.log(`[SMTP] Enviando NF #${this.numero} para ${this.clienteEmail}...`);
    console.log(`[SMTP] E-mail enviado com sucesso para ${this.clienteNome}!`);
  }
}
