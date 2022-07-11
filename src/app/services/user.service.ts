import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';

const dev = true;

const BASE_URL = dev ? 'http://localhost:3030/api' : 'api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //mock the server
  // private _usersDb: User[] = USERS;
  // private _loggedInUser: User = USERS[0];

  private _loggedInUser$ = new BehaviorSubject<User>(<User>{});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor(private http: HttpClient) {}

  public async getLoggedInUser(): Promise<void> {
    // let loggedInUser = this._loggedInUser;
    // this._loggedInUser$.next(loggedInUser);

    const loggedInUser = await this.http
      .get<User>(`${BASE_URL}/auth`)
      .toPromise();
    console.log('loggedInUser', loggedInUser);
    this._loggedInUser$.next(loggedInUser);
  }

  public async login() {
    const email = 'shanikupiec@gmail.com';
    const password = '123';
    console.log('loggin in ');
    const body = { email, password };
    // const options =  { body: new HttpParams().set('term', filterBy.term) };

    return this.http.post<User>(`${BASE_URL}/auth/login`, body).toPromise();
  }

  public transfer(contact: Contact, amount: number, type: string): void {
    const move: Move = {
      id: this._makeId(),
      contactId: contact._id,
      contactName: contact.name,
      at: Date.now(),
      amount,
      isToContact: true,
      type,
    };

    // this._loggedInUser.coins[type] -= amount;
    // this._loggedInUser.total -= amount;
    // this._loggedInUser.moves.unshift(move);

    // const idx = this._usersDb.findIndex(
    //   (u) => u.name === this._loggedInUser.name
    // );
    // this._usersDb[idx] = this._loggedInUser;
  }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
