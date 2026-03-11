import { NotaFiscal } from "../models/NotaFiscal.js";

export class ValidadorNotaFiscal {
  validar(nf: NotaFiscal): boolean {
    if (!nf.clienteNome?.trim()) { console.log("Erro: Nome do cliente é obrigatório."); return false; }
    if (nf.valor <= 0) { console.log("Erro: Valor deve ser maior que zero."); return false; }
    if (!nf.clienteEmail?.includes("@")) { console.log("Erro: E-mail inválido."); return false; }
    console.log("Nota fiscal validada com sucesso.");
    return true;
  }
}
