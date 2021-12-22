import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  content?: any;
  currentUser: any;

  
  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.router.navigate(['/login'])
         return false
      }
    );
  }

}