// LSP CORRIGIDO: Ave define apenas o que toda ave faz.
// Voar é uma capacidade (interface), não obrigação.
export class Ave {
  constructor(public nome: string) {}

  comer(): void {
    console.log(`${this.nome} está comendo.`);
  }
}

export interface IVoavel {
  voar(): void;
}

export class Papagaio extends Ave implements IVoavel {
  constructor() { super("Papagaio"); }

  voar(): void {
    console.log(`${this.nome} está voando e falando ao mesmo tempo!`);
  }
}

export class Pinguim extends Ave {
  constructor() { super("Pinguim"); }

  nadar(): void {
    console.log(`${this.nome} está nadando velozmente!`);
  }
}

// Type guard para IVoavel
export function isVoavel(ave: Ave): ave is Ave & IVoavel {
  return "voar" in ave;
}
