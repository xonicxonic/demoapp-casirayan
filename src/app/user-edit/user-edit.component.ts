import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

	angForm : FormGroup;
	user: any = {};

  	constructor(private route: ActivatedRoute, private router: Router, private us: UsersService, private fb: FormBuilder) {
      	this.createForm();
 	}

 	createForm() {
	    this.angForm = this.fb.group({
	      usr_email: ['', [Validators.required, Validators.email] ],
	      usr_fullname: ['', Validators.required ],
	      usr_address: ['', Validators.required ]
	    });
	  }

  	ngOnInit(): void {
  		this.route.params.subscribe(params => {
        this.us.editUser(params['id']).subscribe(res => {
         	this.user = res;
      	}, error => {  
          Swal.fire({
            title: 'Error!',
            text: 'User does not exist.',
            icon: 'error',
            confirmButtonText: 'Cool'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['']);
            }
          })
        });
      })
  	}

  	updateUser(usr_email, usr_fullname, usr_address) {
    	this.route.params.subscribe(params => {
      		this.us.updateUser(usr_email, usr_fullname, usr_address, params.id);
      		this.router.navigate(['']);
    	});
  	}

}
