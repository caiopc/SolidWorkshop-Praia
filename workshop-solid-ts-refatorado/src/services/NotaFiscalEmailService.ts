import { NotaFiscal } from "../models/NotaFiscal.js";

export class NotaFiscalEmailService {
  enviar(nf: NotaFiscal): void {
    console.log(`[SMTP] Conectando ao servidor de e-mail...`);
    console.log(`[SMTP] Enviando NF #${nf.numero} para ${nf.clienteEmail}...`);
    console.log(`[SMTP] E-mail enviado com sucesso para ${nf.clienteNome}!`);
  }
}
