// SRP CORRIGIDO: Funcionario agora é apenas um modelo de dados.
export class Funcionario {
  constructor(
    public readonly nome: string,
    public readonly cargo: string,
    public readonly salarioBase: number,
    public readonly email: string
  ) {}
}
