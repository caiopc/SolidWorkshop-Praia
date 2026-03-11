import { IRepository, IServicoEmail, INotificador } from "../interfaces/IRepository.js";

export class SqlRepository implements IRepository {
  salvar(dados: string) { console.log(`[SQL Server] Salvando: ${dados}`); }
  deletar(id: number) { console.log(`[SQL Server] DELETE FROM Pedidos WHERE Id = ${id}`); }
}

export class MongoRepository implements IRepository {
  salvar(dados: string) { console.log(`[MongoDB] db.pedidos.insertOne(${dados})`); }
  deletar(id: number) { console.log(`[MongoDB] db.pedidos.deleteOne({ id: ${id} })`); }
}

export class EmailService implements IServicoEmail {
  enviar(destinatario: string, assunto: string, corpo: string) {
    console.log(`[SMTP] Para: ${destinatario} | Assunto: ${assunto}`);
    console.log(`[SMTP] Corpo: ${corpo}`);
  }
}

export class SmsNotificador implements INotificador {
  canal = "sms";
  enviar(destinatario: string, mensagem: string) { console.log(`[SMS] Para ${destinatario}: ${mensagem}`); }
}

export class PushNotificador implements INotificador {
  canal = "push";
  enviar(destinatario: string, mensagem: string) { console.log(`[PUSH] Para ${destinatario}: ${mensagem}`); }
}

export class EmailNotificador implements INotificador {
  canal = "email";
  enviar(destinatario: string, mensagem: string) { console.log(`[EMAIL] Para: ${destinatario} | ${mensagem}`); }
}
