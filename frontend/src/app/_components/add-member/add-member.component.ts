import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  member: Member ={
    username:'',
    email:'',
    password:'',
  };
  submitted = false;

  constructor( private memberService:MemberService) { }

  ngOnInit():void {
  }

  saveMember(): void {
    const data = {
      // id:this.member.id,
      username: this.member.username,
      email: this.member.email,
      password:this.member.password,
    };

    this.memberService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMember(): void {
    this.submitted = false;
    this.member = {

      username:'',
      email:'',
      password:'',
    };
  }


}
