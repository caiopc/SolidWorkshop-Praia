// ISP CORRIGIDO: Interfaces segregadas para impressora.
export interface IImpressora {
  imprimir(documento: string): void;
}

export interface IScanner {
  escanear(documento: string): void;
}

export interface IFax {
  enviarFax(documento: string, numero: string): void;
}

export interface IDuplex {
  imprimirFrenteEVerso(documento: string): void;
}

export class ImpressoraMultifuncional implements IImpressora, IScanner, IFax, IDuplex {
  imprimir(documento: string) { console.log(`[Multifuncional] Imprimindo: ${documento}`); }
  escanear(documento: string) { console.log(`[Multifuncional] Escaneando: ${documento}`); }
  enviarFax(documento: string, numero: string) { console.log(`[Multifuncional] Fax '${documento}' para ${numero}`); }
  imprimirFrenteEVerso(documento: string) { console.log(`[Multifuncional] Frente e verso: ${documento}`); }
}

export class ImpressoraSimples implements IImpressora {
  imprimir(documento: string) { console.log(`[Simples] Imprimindo: ${documento}`); }
}
