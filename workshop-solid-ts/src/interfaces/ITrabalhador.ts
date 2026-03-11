// =============================================================
// VIOLAÇÃO ISP #1: Interface "gorda" que obriga todas as
// implementações a terem métodos que não usam.
// =============================================================
export interface ITrabalhador {
  trabalhar(): void;
  registrarPonto(): void;
  almocarNoRefeitorio(): void;
  gerarRelatorioGerencial(): void;
  participarDeReuniao(): void;
}

export class FuncionarioCLT implements ITrabalhador {
  constructor(public nome: string) {}

  trabalhar(): void {
    console.log(`${this.nome} (CLT) está trabalhando.`);
  }
  registrarPonto(): void {
    console.log(`${this.nome} registrou ponto às ${new Date().toLocaleTimeString()}.`);
  }
  almocarNoRefeitorio(): void {
    console.log(`${this.nome} está almoçando no refeitório.`);
  }
  gerarRelatorioGerencial(): void {
    console.log(`${this.nome} gerou relatório gerencial.`);
  }
  participarDeReuniao(): void {
    console.log(`${this.nome} está participando da reunião.`);
  }
}

export class Estagiario implements ITrabalhador {
  constructor(public nome: string) {}

  trabalhar(): void {
    console.log(`${this.nome} (Estagiário) está trabalhando.`);
  }
  registrarPonto(): void {
    console.log(`${this.nome} registrou ponto às ${new Date().toLocaleTimeString()}.`);
  }
  almocarNoRefeitorio(): void {
    console.log(`${this.nome} está almoçando no refeitório.`);
  }
  // Forçado a implementar — mas estagiário não faz isso
  gerarRelatorioGerencial(): void {
    throw new Error(`${this.nome} é estagiário e não pode gerar relatório gerencial!`);
  }
  participarDeReuniao(): void {
    console.log(`${this.nome} está participando da reunião como ouvinte.`);
  }
}

export class Terceirizado implements ITrabalhador {
  constructor(public nome: string) {}

  trabalhar(): void {
    console.log(`${this.nome} (Terceirizado) está trabalhando.`);
  }
  // Forçado a implementar — mas terceirizado não bate ponto aqui
  registrarPonto(): void {
    throw new Error(`${this.nome} é terceirizado e não registra ponto neste sistema!`);
  }
  // Forçado a implementar — sem acesso ao refeitório
  almocarNoRefeitorio(): void {
    throw new Error(`${this.nome} é terceirizado e não tem acesso ao refeitório!`);
  }
  // Forçado a implementar
  gerarRelatorioGerencial(): void {
    throw new Error(`${this.nome} é terceirizado e não gera relatório gerencial!`);
  }
  participarDeReuniao(): void {
    console.log(`${this.nome} está participando da reunião como convidado externo.`);
  }
}
