// DIP CORRIGIDO: Abstrações para repositório, e-mail e notificação.
export interface IRepository {
  salvar(dados: string): void;
  deletar(id: number): void;
}

export interface IServicoEmail {
  enviar(destinatario: string, assunto: string, corpo: string): void;
}

export interface INotificador {
  canal: string;
  enviar(destinatario: string, mensagem: string): void;
}
