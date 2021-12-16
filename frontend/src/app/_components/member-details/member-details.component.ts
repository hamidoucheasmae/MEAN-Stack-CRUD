import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/_services/member.service';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  members?: Member[];
  currentUser: any;
  currentIndex = -1;
  username = '';




  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router : Router,private memberService:MemberService) { }

  ngOnInit(): void {
    this.retrieveMembers();

    this.currentUser = this.tokenStorageService.getUser();

    this.userService.getAdminBoard().subscribe(
      data => {
        this.members = data;
      },
      err => {
        this.router.navigate(['/login'])
         return false
      }
    );
  }

  retrieveMembers(): void {
    this.memberService.getAll()
      .subscribe(
        data => {
          this.members = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveMembers();
    this.currentUser = {};
    this.currentIndex = -1;
  }
  setActiveMember(member: Member, index: number): void {
    this.currentUser = member;
    this.currentIndex = index;
  }

}
