import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/_services/member.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  members?: Member[];
  currentMember: Member = {};
  currentIndex = -1;
  username = '';



  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router : Router,private memberService:MemberService) { }

  ngOnInit(): void {
    this.retrieveMembers();

    this.currentMember = this.tokenStorageService.getUser();

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

  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
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
    this.currentMember = {};
    this.currentIndex = -1;
  }

  setActiveMember(member: Member, index: number): void {
    this.currentMember = member;
    this.currentIndex = index;
  }


  removeAllMembers(): void {
    this.memberService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.logout();
        },
        error => {
          console.log(error);
          
        });
  }


  searchMember(): void {
    this.currentMember = {};
    this.currentIndex = -1;

    this.memberService.findByUser(this.username)
      .subscribe(
        data => {
          this.members = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // deleteMember(): void {
  //   this.memberService.delete(this.currentUser.id)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.router.navigate(['/admin']);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


}
