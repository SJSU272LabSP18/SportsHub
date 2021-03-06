import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {RestProvider} from '../../providers/rest/rest';

export class User {
  name: string;
  email: string;
  password: string;
  phone: number;

  constructor(name: string, email: string, password: string, phone: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(public restProvider:RestProvider){}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
          let access = (credentials.password === "pass" && credentials.email === "email");
          this.currentUser = new User('Emma', 'emma@test.com', 'pass', 1234);
          observer.next(access);
          observer.complete();
        });
//TODO: Uncomment for login backend
      /*this.restProvider.login(credentials).then((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        });
        return Observable.create(observer => {
          observer.next(true);
          observer.complete();
        });*/
    }
  }


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      this.restProvider.signup(credentials).then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

/* public getUserInfo() : User {
   return this.currentUser.email;
 }*/

  public findmatch(credentials) {
    if (credentials.sport === null || credentials.zipcode === null || credentials.level === null) {
      return Observable.throw("Please insert credentials");
    } else {
      this.restProvider.matchfind(credentials).then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
