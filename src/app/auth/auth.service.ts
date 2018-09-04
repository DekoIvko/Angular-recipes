import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor( private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                this.router.navigate(['/']);
                // console.log(response);
            // console.log('success sign in');
            firebase.auth().currentUser.getIdToken().then(
                (token: string) => {
                    this.token = token;
                    console.log(this.token);
                }
            );
        }
        ).catch(
            error => console.log(error)
        );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    isAuth() {
        return this.token != null;
    }
}
