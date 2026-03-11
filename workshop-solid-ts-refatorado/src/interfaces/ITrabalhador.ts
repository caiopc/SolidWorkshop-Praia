// ISP CORRIGIDO: Interfaces segregadas.
export interface ITrabalhador {
  trabalhar(): void;
}

export interface IRegistraPonto {
  registrarPonto(): void;
}

export interface IUsaRefeitorio {
  almocarNoRefeitorio(): void;
}

export interface IGeradorRelatorioGerencial {
  gerarRelatorioGerencial(): void;
}

export interface IParticipanteReuniao {
  participarDeReuniao(): void;
}

export class FuncionarioCLT
  implements ITrabalhador, IRegistraPonto, IUsaRefeitorio, IGeradorRelatorioGerencial, IParticipanteReuniao
{
  constructor(public nome: string) {}
  trabalhar() { console.log(`${this.nome} (CLT) está trabalhando.`); }
  registrarPonto() { console.log(`${this.nome} registrou ponto às ${new Date().toLocaleTimeString()}.`); }
  almocarNoRefeitorio() { console.log(`${this.nome} está almoçando no refeitório.`); }
  gerarRelatorioGerencial() { console.log(`${this.nome} gerou relatório gerencial.`); }
  participarDeReuniao() { console.log(`${this.nome} está participando da reunião.`); }
}

export class Estagiario implements ITrabalhador, IRegistraPonto, IUsaRefeitorio, IParticipanteReuniao {
  constructor(public nome: string) {}
  trabalhar() { console.log(`${this.nome} (Estagiário) está trabalhando.`); }
  registrarPonto() { console.log(`${this.nome} registrou ponto às ${new Date().toLocaleTimeString()}.`); }
  almocarNoRefeitorio() { console.log(`${this.nome} está almoçando no refeitório.`); }
  participarDeReuniao() { console.log(`${this.nome} está participando da reunião como ouvinte.`); }
}

export class Terceirizado implements ITrabalhador, IParticipanteReuniao {
  constructor(public nome: string) {}
  trabalhar() { console.log(`${this.nome} (Terceirizado) está trabalhando.`); }
  participarDeReuniao() { console.log(`${this.nome} está participando da reunião como convidado externo.`); }
}
