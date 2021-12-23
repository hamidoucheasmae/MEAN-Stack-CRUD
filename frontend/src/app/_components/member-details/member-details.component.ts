import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  currentMember : Member = {
    username: '',
    email: '',
    password: ''
  };
  message = '';

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
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
          this.message = response.message ? response.message : 'This member was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }


  deleteMember(): void {
    this.memberService.delete(this.currentMember._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/members']);
        },
        error => {
          console.log(error);
        });
  }
}
