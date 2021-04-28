import { firebaseAuth } from './../config/firebase';
import firebase from "firebase";
import client from '../common/api/client';
import { makeAutoObservable } from 'mobx';

export default class UserStore {

    isLoading: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    get loggedInUser() : firebase.User | null {
        return firebaseAuth.currentUser;
    }

    checkLoggedInState() {
        firebaseAuth.onAuthStateChanged((user) => {
            user ? console.log('Logged in user found') : console.log('No logged in user');
            this.isLoading = false;
        });
    }

    signIn(email:string, password:string){
        return client.Auth.signIn(email, password);
    }

    signOut(){
        return client.Auth.signOut();
    }
}