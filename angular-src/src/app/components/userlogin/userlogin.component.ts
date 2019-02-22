import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService:AuthService,
              private router:Router,) { }

  ngOnInit() {
  }


  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        alert('You are now logged in');
        this.router.navigate(['']);
      } else {
        alert(data.msg);
        this.router.navigate(['userlogin']);
      }
    });
  }

}
