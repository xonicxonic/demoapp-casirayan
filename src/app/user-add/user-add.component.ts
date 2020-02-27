import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../users.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

	angForm: FormGroup;
	constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private us: UsersService) {
  	this.createForm();
	}

	createForm(){
		this.angForm = this.fb.group({
			usr_email: ['', [Validators.required, Validators.email] ],
	      	usr_fullname: ['', Validators.required ],
	      	usr_address: ['', Validators.required ]
  	});
	}

	addUser(usr_email, usr_fullname, usr_address) {
	  	this.us.addUser(usr_email, usr_fullname, usr_address);
	    this.router.navigate(['']);
	}

	ngOnInit(): void {
	}

}
