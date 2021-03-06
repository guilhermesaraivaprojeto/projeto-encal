import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from '../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface NovoAtt {
  status: string;
}

interface DataRails {
  status: number;
  obj: [1, '', '', '', 1, 1, ''];
}

interface GetRails {
  lista: [];
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService implements OnDestroy {
  currentUser: Usuario;
  private currentUserSub: Subscription;
  private _tarefas = new BehaviorSubject<any[]>([]);

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  get tarefas() {
    return this._tarefas.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  criar(
    titulo,
    descricao,
    data_limite,
    user_id) {
    let obj = {
      titulo: titulo,
      descricao: descricao,
      data_limite: data_limite,
      user_id: user_id.id};
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/criar_tarefa', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  editar(
    id,
    titulo,
    descricao,
    data_limite,
    user_id
    ) {
    let obj = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      data_limite: data_limite,
      user_id: user_id };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/editar_tarefa', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  getItem(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<DataRails>(this.authService.urlServer + '/api/get_tarefa', { id: id }).pipe(map(usuData => {
        return {
          id: usuData.obj[0],
          titulo: usuData.obj[1],
          descricao: usuData.obj[2],
          data_limite: usuData.obj[3],
          user_id: usuData.obj[4],
          user_criou_id: usuData.obj[5],
          status: usuData.obj[6]
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getLista() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_tarefas', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              id: msgData[key][0],
              titulo: msgData[key][1],
              descricao: msgData[key][2],
              data_limite: msgData[key][3],
              user_id: msgData[key][4],
              user_criou_id: msgData[key][5],
              status: msgData[key][6]
            });
          }
        }
        return lista;
      })
    );
  }

  finalizar(tarefaId) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/finalizar_tarefa', { user_id: this.currentUser.id, id: tarefaId }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

}
