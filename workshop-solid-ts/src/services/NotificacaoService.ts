// =============================================================
// VIOLAÇÃO DIP #2: NotificacaoService depende diretamente de
// implementações concretas. Além disso, usa if/else para
// decidir o canal.
// =============================================================
class SmsSender {
  enviarSms(telefone: string, mensagem: string): void {
    console.log(`[SMS] Enviando para ${telefone}: ${mensagem}`);
  }
}

class PushNotificationSender {
  enviarPush(deviceId: string, mensagem: string): void {
    console.log(`[PUSH] Enviando para device ${deviceId}: ${mensagem}`);
  }
}

class EmailService {
  enviar(destinatario: string, assunto: string, corpo: string): void {
    console.log(`[SMTP] Para: ${destinatario} | Assunto: ${assunto}`);
    console.log(`[SMTP] Corpo: ${corpo}`);
  }
}

export class NotificacaoService {
  private smsSender = new SmsSender();
  private pushSender = new PushNotificationSender();
  private emailService = new EmailService();

  notificar(canal: string, destinatario: string, mensagem: string): void {
    console.log(`\n--- Enviando notificação via ${canal} ---`);

    if (canal.toLowerCase() === "sms") {
      this.smsSender.enviarSms(destinatario, mensagem);
    } else if (canal.toLowerCase() === "push") {
      this.pushSender.enviarPush(destinatario, mensagem);
    } else if (canal.toLowerCase() === "email") {
      this.emailService.enviar(destinatario, "Notificação", mensagem);
    } else {
      console.log(`Canal '${canal}' não suportado!`);
    }
  }
}
