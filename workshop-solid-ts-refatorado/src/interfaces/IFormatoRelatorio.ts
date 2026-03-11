// OCP CORRIGIDO: Cada formato é uma implementação separada.
export interface IFormatoRelatorio {
  formato: string;
  gerar(conteudo: string): void;
}

export class RelatorioPdf implements IFormatoRelatorio {
  formato = "pdf";
  gerar(conteudo: string): void {
    console.log("[PDF] Inicializando biblioteca de PDF...");
    console.log(`[PDF] Gerando documento com ${conteudo.length} caracteres...`);
    console.log("[PDF] Relatório PDF gerado: relatorio.pdf");
  }
}

export class RelatorioExcel implements IFormatoRelatorio {
  formato = "excel";
  gerar(conteudo: string): void {
    console.log("[EXCEL] Abrindo planilha...");
    console.log(`[EXCEL] Escrevendo dados com ${conteudo.length} caracteres...`);
    console.log("[EXCEL] Relatório Excel gerado: relatorio.xlsx");
  }
}

export class RelatorioCsv implements IFormatoRelatorio {
  formato = "csv";
  gerar(conteudo: string): void {
    console.log("[CSV] Criando arquivo CSV...");
    console.log(`[CSV] Convertendo ${conteudo.length} caracteres para CSV...`);
    console.log("[CSV] Relatório CSV gerado: relatorio.csv");
  }
}
