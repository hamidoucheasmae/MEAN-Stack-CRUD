import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member.model';
import { MemberService } from 'src/app/_services/member.service';


@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  currentMember : Member = {
    username: '',
    email: '',
    password: ''
  };
  message = '';

  constructor(private memberService: MemberService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.message = '';
    this.getMembers(this.route.snapshot.params.id); 
   }

   getMembers(_id: string): void {
    this.memberService.get(_id)
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
          this.message = response.message ? response.message : 'This member was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
