import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Car } from '../models/car.model';
import { User } from '../models/user.model';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user$!: Observable<User | null | undefined>;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private _shared: SharedService,
    private router: Router) {
    this.user$ = this.afAuth.authState
      .pipe(
        switchMap((user: any) => {
          if (user) {
            return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null)
          }
        })
      )
  }


  async signUp(user: User, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(user.email, password)
        .then((result: any) => {
          this.setUserDataForSignUp(result.user, user)
          if (result != undefined) {
            this._shared.userLoggedIn = true;
            this.router.navigate(['']);
            localStorage.setItem('user', JSON.stringify(user));
          }
        }).catch((error: any) => {
          window.alert(error.message);
        })
    } catch (error) {
      console.log('Error up')
    }
  }


  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result: any) => {
          this.afAuth.authState.subscribe((user: any) => {
            if (user != undefined) {
              console.log(user);
              this._shared.userLoggedIn = true;
              this.router.navigate(['']);
              localStorage.setItem('user', JSON.stringify(user));
              return this.getUserDoc(result.user?.uid ?? "");
            }
          });
        }).catch((error: any) => {
          window.alert(error.message);
        })
    } catch (error) {
      console.log('Error in')
    }
  }


  async signOut() {
    try {
      await this.afAuth.signOut()
      console.log('Signouted');
      this._shared.userLoggedIn = false;
      localStorage.removeItem('user')
      this.router.navigate(['/user/login']);
    } catch (error) {
      console.log('Error out')
    }
  }

  getUserDoc(id: string): any {
    return this.firestore
      .collection('users')
      .doc(id)
      .valueChanges();
  }


  setUserDataForSignUp(fireUser: any, user: User) {
    console.log(user);

    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${fireUser.uid}`
    );
    const userData: User = {
      uid: fireUser.uid,
      email: fireUser.email,
      username: user.username,
      password: user.password,
      favorites: user.favorites
    } as User;
    return userRef.set(userData, {
      merge: true,
    });
  }

  public getDataByDocumentName(document: string): any {
    return this.firestore.collection<any>(document);
  }

  public setDataByDocumentName(document: string, uid: string): any {
    return this.firestore.doc<any>(`${document}/${uid}`);
  }

  public getDataById(document: string, uid: string): any {
    return this.firestore.doc<any>(`${document}/${uid}`);
  }


  public deleteDataByDocumentName(document: string, uid: string): any {
    return this.firestore.doc<any>(`${document}/${uid}`).delete().then(() => {
      console.log('Document successfully deleted!');
    })
  }

  public createCarData(item: Car) {
    let uid = this.firestore.createId();

    const bookRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `car-data/${uid}`
    );

    item.uid = uid;

    bookRef.set(item, {
      merge: true,
    });

    return uid;
  }


}
