import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private authService:AuthService,
               private router:Router,) { }

  ngOnInit() {
  }

  onUserLogoutClick(){
    this.authService.logout();
    alert('You are logged out');
    this.router.navigate(['/userlogin']);
    return false;
  }

}
