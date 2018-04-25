import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {RestProvider} from '../../providers/rest/rest';

export class User {
  name: string;
  email: string;
  sport: string;
  level: string;
  zipcode: string;

  constructor(name: string, email: string, sport: string, level: string, zipcode: string) {
    this.name = name;
    this.email = email;
    this.sport = sport;
    this.level = level;
    this.zipcode = zipcode;
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
        // At this point make a request to your backend to make a real check!
        //TODO: Connect to Database to Check true login
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Emma', 'emma@test.com');
        observer.next(access);
        observer.complete();
      });
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
