// =============================================================
// VIOLAÇÃO LSP #2: Pinguim herda de Ave mas não pode voar.
// O método voar() lança exceção, quebrando o contrato da base.
// =============================================================
export class Ave {
  constructor(public nome: string) {}

  comer(): void {
    console.log(`${this.nome} está comendo.`);
  }

  voar(): void {
    console.log(`${this.nome} está voando alto!`);
  }
}

export class Papagaio extends Ave {
  constructor() {
    super("Papagaio");
  }

  override voar(): void {
    console.log(`${this.nome} está voando e falando ao mesmo tempo!`);
  }
}

export class Pinguim extends Ave {
  constructor() {
    super("Pinguim");
  }

  // Quebra LSP: Pinguim não voa
  override voar(): void {
    throw new Error(`${this.nome} não pode voar! Pinguins não voam.`);
  }
}
