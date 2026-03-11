import { IFormatoRelatorio } from "../interfaces/IFormatoRelatorio.js";

export class GeradorRelatorio {
  constructor(private formatos: IFormatoRelatorio[]) {}

  gerar(formato: string, conteudo: string): void {
    const impl = this.formatos.find((f) => f.formato.toLowerCase() === formato.toLowerCase());
    if (!impl) { console.log(`Formato '${formato}' não suportado!`); return; }
    impl.gerar(conteudo);
  }
}
