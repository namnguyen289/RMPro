import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  static get parameters(){
    return [[Events]];
  }

  constructor(events) {
    this._orders = [];
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
  }

  login(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  signup(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  addItem(item){
  	var idx = -1;
  	var quantity = 0;
  	for(let i = 0; i < this._orders.length; i++) {
        if(this._orders[i].food.prd_id == item.prd_id){
            idx = i;
        }
    }
    if(idx == -1){
	    this._orders.push({
	        food: item,
	        quantity: 1
	    });
	    quantity = 1;
	}else{
		this._orders[idx].quantity += 1;
		quantity = this._orders[idx].quantity;
	}
	return quantity;
  }
  removeItem(item){
    for(let i = 0; i < this._orders.length; i++) {
        if(this._orders[i].food.prd_id == item.prd_id){
            this._orders.splice(i, 1);
        }
    }
  }
}