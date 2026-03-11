import { INotificador } from "../interfaces/IRepository.js";

// DIP CORRIGIDO: Depende de abstrações injetadas via construtor.
export class NotificacaoService {
  constructor(private notificadores: INotificador[]) {}

  notificar(canal: string, destinatario: string, mensagem: string): void {
    console.log(`\n--- Enviando notificação via ${canal} ---`);
    const notificador = this.notificadores.find(
      (n) => n.canal.toLowerCase() === canal.toLowerCase()
    );
    if (!notificador) { console.log(`Canal '${canal}' não suportado!`); return; }
    notificador.enviar(destinatario, mensagem);
  }
}
