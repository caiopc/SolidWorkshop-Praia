// =============================================================
// VIOLAÇÃO OCP #2: Para adicionar um novo formato de relatório,
// é necessário modificar o método gerar com mais um if/else.
// =============================================================
export class GeradorRelatorio {
  gerar(formato: string, conteudo: string): void {
    if (formato.toLowerCase() === "pdf") {
      console.log("[PDF] Inicializando biblioteca de PDF...");
      console.log(`[PDF] Gerando documento com ${conteudo.length} caracteres...`);
      console.log("[PDF] Relatório PDF gerado: relatorio.pdf");
    } else if (formato.toLowerCase() === "excel") {
      console.log("[EXCEL] Abrindo planilha...");
      console.log(`[EXCEL] Escrevendo dados com ${conteudo.length} caracteres...`);
      console.log("[EXCEL] Relatório Excel gerado: relatorio.xlsx");
    } else if (formato.toLowerCase() === "csv") {
      console.log("[CSV] Criando arquivo CSV...");
      console.log(`[CSV] Convertendo ${conteudo.length} caracteres para CSV...`);
      console.log("[CSV] Relatório CSV gerado: relatorio.csv");
    } else if (formato.toLowerCase() === "html") {
      console.log("[HTML] Montando estrutura HTML...");
      console.log(`[HTML] Inserindo ${conteudo.length} caracteres no body...`);
      console.log("[HTML] Relatório HTML gerado: relatorio.html");
    } else {
      console.log(`Formato '${formato}' não suportado!`);
    }
  }
}
