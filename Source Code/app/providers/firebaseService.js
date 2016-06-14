import { Injectable } from 'angular2/core';
import 'rxjs/Rx';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseService {
    static get parameters() {
        return [
            [Events]
        ];
    }
    constructor(event) {
        this.event = event;
        this.baseRef = new Firebase('https://rmpro.firebaseio.com/');
        // check for changes in auth status
        this.authData = null;
        this.baseRef.onAuth((authData) => {
            this.authData = authData;
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                this.HAS_LOGGED_IN = true;
            } else {
                this.HAS_LOGGED_IN = false;
                console.log("User is logged out");
            }
        });
    }

    getbase() {
        return this.baseRef;
    }



    hasLoggedIn() {
        return Observable.create(observer => {
            this.baseRef.onAuth((authData) => {                
                observer.next(authData);
                observer.complete();
            });
        });
    }


    logout() {
        this.baseRef.unauth();
    }

    login(_username, _password) {
        var that = this;
        return Observable.create(observer => {
            console.log("Start login");
            console.log(that.baseRef);
            that.baseRef.authWithPassword({
                email: _username,
                password: _password
            }, (error, authData) => {
                if (error) {
                    console.log("Login Failed!", error);
                    observer.error(error)
                } else {
                    console.log("Authenticated successfully with payload-", authData);
                    this.authData = authData;
                    observer.next(authData)
                }
                observer.complete();
                console.log("End login");
            });
        });
    }

    createUser(_username, _password) {
        this.baseRef.createUser({
            email: _username,
            password: _password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }

    changeEmail(_username, _newEmail, _password) {
        var ref = this.baseRef;
        ref.changeEmail({
            oldEmail: _username,
            newEmail: _newEmail,
            password: _password
        }, function(error) {
            if (error === null) {
                console.log("Email changed successfully");
            } else {
                console.log("Error changing email:", error);
            }
        });
    }

    changePassword(_username, _password, _newPassword) {
        var ref = this.baseRef;
        ref.changePassword({
            email: _username,
            oldPassword: _password,
            newPassword: _newPassword
        }, function(error) {
            if (error === null) {
                console.log("Password changed successfully");
            } else {
                console.log("Error changing password:", error);
            }
        });
    }

    resetPassword(_username) {
        var ref = this.baseRef;
        ref.resetPassword({
            email: _username
        }, function(error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
            }
        });
    }

    deleteUser(_username, _password) {
        var ref = this.baseRef;
        ref.removeUser({
            email: _username,
            password: _password
        }, function(error) {
            if (error === null) {
                console.log("User removed successfully");
            } else {
                console.log("Error removing user:", error);
            }
        });
    }

    getDataPrivate(_id, _callback) {
        var ref = this.baseRef.child('public-messages')
        ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                let result = snapshot.val()
                _callback(result)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }


    getData(_id, _callback) {
        var ref = this.baseRef.child('bookItems')
            //  ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                var arr = []

                snapshot.forEach(function(childSnapshot) {
                    arr.push({
                        id: childSnapshot.key(),
                        data: childSnapshot.val()
                    });
                });
                _callback(arr)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }

    getDataObs(_id) {
        var ref = this.baseRef.child('bookItems')
            //  ref = ref.child(_id)
        var that = this

        return new Observable(observer => {
            ref.on('value',
                (snapshot) => {
                    var arr = []

                    snapshot.forEach(function(childSnapshot) {
                        arr.push({
                            id: childSnapshot.key(),
                            data: childSnapshot.val()
                        });
                    });
                    observer.next(arr)
                },
                (error) => {
                    console.log("ERROR:", error)
                    observer.error(error)
                });
        });
    }

    saveData(_parent, _data) {
        var ref = this.baseRef;
        var parentsRef = ref.child(_parent);
        parentsRef.set(_data, function(error) {
            if (error) {
                alert("Data could not be saved." + error);
            } else {
                alert("Data saved successfully.");
            }
        });
    }

    updateData(_target, _data) {
        var ref = this.baseRef;
        var targetRef = ref.child(_target);
        targetRef.update(_data, function(error) {
            if (error) {
                alert("Data could not be saved." + error);
            } else {
                alert("Data saved successfully.");
            }
        });
    }

    saveListData(_target, _listData) {
        var ref = this.baseRef;
        var targetRef = ref.child(_target);
        _listData.forEach((item) => {
            targetRef.push().set(item);
        });
    }

    saveTransactionalData(_target, _logic) {
        var ref = this.baseRef;
        ref.transaction(_logic);
    }

}
