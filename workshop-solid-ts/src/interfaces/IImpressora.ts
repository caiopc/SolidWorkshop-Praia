// =============================================================
// VIOLAÇÃO ISP #2: Interface "gorda" para impressora.
// ImpressoraSimples não escaneia, não envia fax e não faz
// frente-e-verso, mas é forçada a implementar tudo.
// =============================================================
export interface IImpressora {
  imprimir(documento: string): void;
  escanear(documento: string): void;
  enviarFax(documento: string, numero: string): void;
  imprimirFrenteEVerso(documento: string): void;
}

export class ImpressoraMultifuncional implements IImpressora {
  imprimir(documento: string): void {
    console.log(`[Multifuncional] Imprimindo: ${documento}`);
  }
  escanear(documento: string): void {
    console.log(`[Multifuncional] Escaneando: ${documento}`);
  }
  enviarFax(documento: string, numero: string): void {
    console.log(`[Multifuncional] Enviando fax de '${documento}' para ${numero}`);
  }
  imprimirFrenteEVerso(documento: string): void {
    console.log(`[Multifuncional] Imprimindo frente e verso: ${documento}`);
  }
}

export class ImpressoraSimples implements IImpressora {
  imprimir(documento: string): void {
    console.log(`[Simples] Imprimindo: ${documento}`);
  }
  escanear(documento: string): void {
    throw new Error("Impressora simples não possui scanner!");
  }
  enviarFax(documento: string, numero: string): void {
    throw new Error("Impressora simples não possui fax!");
  }
  imprimirFrenteEVerso(documento: string): void {
    throw new Error("Impressora simples não suporta impressão frente e verso!");
  }
}
