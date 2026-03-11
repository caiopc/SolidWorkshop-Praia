import { NotaFiscal } from "../models/NotaFiscal.js";

export class CalculadoraImpostos {
  calcular(nf: NotaFiscal): number {
    const icms = nf.valor * 0.18;
    const iss = nf.valor * 0.05;
    const total = icms + iss;
    console.log(`ICMS: R$ ${icms.toFixed(2)} | ISS: R$ ${iss.toFixed(2)} | Total: R$ ${total.toFixed(2)}`);
    return total;
  }
}
