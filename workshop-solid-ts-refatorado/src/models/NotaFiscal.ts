// SRP CORRIGIDO: NotaFiscal agora é apenas um modelo de dados.
export class NotaFiscal {
  public readonly dataEmissao: Date;

  constructor(
    public readonly numero: number,
    public readonly clienteNome: string,
    public readonly clienteEmail: string,
    public readonly valor: number
  ) {
    this.dataEmissao = new Date();
  }
}
