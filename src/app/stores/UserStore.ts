import { firebaseAuth } from './../config/firebase';
import firebase from "firebase";
import { makeAutoObservable } from "mobx";
import client from '../common/api/client';

export default class UserStore {

    constructor() {
        makeAutoObservable(this);
    }

get loggedInUser() : firebase.User | null {
        return firebaseAuth.currentUser;
    }

    signIn(email:string, password:string){
        return client.Auth.signIn(email, password);
    }

    signOut(){
        return client.Auth.signOut();
    }
}