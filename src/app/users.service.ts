import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

	uri = 'http://localhost:3000';
	constructor( private http: HttpClient ) { }

	addUser(usr_email, usr_fullname, usr_address) {
    const obj = {
      	usr_email,
      	usr_fullname,
      	usr_address
    };

    this.http.post(`${this.uri}/users`, obj)
      .subscribe(res => { Swal.fire( 'Success!', 'Successfully added user.', 'success') 
      }, error => {
        Swal.fire( 'Error!', 'Something went wrong.', 'error')
      });
  	}

  	getUsers() {
	    return this
	      .http
	      .get(`${this.uri}/users`);
	  }

    editUser(id) {
    return this
      .http
      .get(`${this.uri}/users/${id}`);
    }

    updateUser(usr_email, usr_fullname, usr_address, id) {
      const obj = {
        usr_email,
        usr_fullname,
        usr_address
      };
      this
        .http
        .put(`${this.uri}/users/${id}`, obj)
        .subscribe(res => {Swal.fire( 'Success!', 'Successfully edited user.', 'success')
        }, error => {
          Swal.fire( 'Error!', 'Something went wrong.', 'error')
        });
    }

    deleteUser(id) {
      return this
        .http
        .delete(`${this.uri}/users/${id}`);
    }
}
