import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  address: String;
  phone: Number;

  constructor(private validateService: ValidateService,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      phone: this .phone
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      alert('Please fill in all fields');
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      alert('Please use a valid email');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        alert('You are now registered and can log in');
        this.router.navigate(['/userlogin']);
      } else {
        alert('Something went wrong');
        this.router.navigate(['/userregister']);
      }
    });
  }
}
