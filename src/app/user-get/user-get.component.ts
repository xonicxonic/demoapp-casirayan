import { Component, OnInit } from '@angular/core';
import User from '../User';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.scss']
})
export class UserGetComponent implements OnInit {
	users : User[];
  	constructor( private us : UsersService) { }

  	ngOnInit(): void {
  		this.getUsers();
  	}

    deleteUser(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.us.deleteUser(id).subscribe(res => {
              Swal.fire( 'Success!', 'Successfully deleted user.', 'success')
              .then(() => {
                this.getUsers();
              }) 
          }, (error) => {
            Swal.fire( 'Error!', 'Something went wrong.', 'error')
          })
        }
      })
    }

    getUsers() {
      this.us
        .getUsers()
        .subscribe((data: User[]) => {
          this.users = data;
        }, (error) => {
          Swal.fire( 'Error!', 'Something went wrong.', 'error')
        });
    }

}
