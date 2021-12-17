import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/_services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  members?: Member[];
  currentMember: Member = {
    _id:'',
    username: '',
    email: '',
    password: '',
  };
  // currentMember:any;
  message = '';
  currentIndex = -1;

  constructor(
    private memberService : MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

 

  ngOnInit(): void {
    this.message = '';
    this.getMember(this.route.snapshot.params.id);
  }

  getMember(id: string): void {
    this.memberService.get(id)
      .subscribe(
        data => {
          this.currentMember = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateMember(): void {
    this.message = '';

    this.memberService.update(this.currentMember._id, this.currentMember)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This useer was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

   
   deleteMember(): void {
    this.memberService.delete(this.currentMember.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin']);
        },
        error => {
          console.log(error);
        });
  }


  // setActiveMember(member: Member, index: number): void {
  //   this.currentMember = member;
  //   this.currentIndex = index;
  // }

}
