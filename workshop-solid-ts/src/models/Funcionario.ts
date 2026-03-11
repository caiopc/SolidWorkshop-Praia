// =============================================================
// VIOLAÇÃO SRP #1: Funcionario faz TUDO — calcula salário,
// gera relatório formatado E salva no banco de dados.
// =============================================================
export class Funcionario {
  constructor(
    public nome: string,
    public cargo: string,
    public salarioBase: number,
    public email: string
  ) {}

  // Responsabilidade 1: Cálculo de salário com regras de negócio
  calcularSalarioLiquido(): number {
    let inss: number;
    if (this.salarioBase <= 1412.0) inss = this.salarioBase * 0.075;
    else if (this.salarioBase <= 2666.68) inss = this.salarioBase * 0.09;
    else if (this.salarioBase <= 4000.03) inss = this.salarioBase * 0.12;
    else inss = this.salarioBase * 0.14;

    const baseCalculo = this.salarioBase - inss;
    let irrf: number;
    if (baseCalculo <= 2259.2) irrf = 0;
    else if (baseCalculo <= 2826.65) irrf = baseCalculo * 0.075;
    else if (baseCalculo <= 3751.05) irrf = baseCalculo * 0.15;
    else irrf = baseCalculo * 0.225;

    return this.salarioBase - inss - irrf;
  }

  // Responsabilidade 2: Formatação e geração de relatório
  gerarRelatorio(): string {
    const salarioLiquido = this.calcularSalarioLiquido();
    return `
========================================
       RELATÓRIO DO FUNCIONÁRIO
========================================
Nome:            ${this.nome}
Cargo:           ${this.cargo}
Salário Bruto:   R$ ${this.salarioBase.toFixed(2)}
Salário Líquido: R$ ${salarioLiquido.toFixed(2)}
E-mail:          ${this.email}
========================================`;
  }

  // Responsabilidade 3: Persistência (acesso a dados)
  salvarNoBanco(): void {
    console.log(
      `[SQL] INSERT INTO Funcionarios (Nome, Cargo, Salario, Email) ` +
        `VALUES ('${this.nome}', '${this.cargo}', ${this.salarioBase}, '${this.email}')`
    );
    console.log(`Funcionário ${this.nome} salvo no banco de dados com sucesso!`);
  }
}
