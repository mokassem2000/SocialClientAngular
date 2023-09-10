import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { MemberService } from 'src/app/_services/member.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  isliked: boolean = false;
  s = {
    danger: this.isliked,
  };
  ngOnInit(): void {
    this.getMainPhoto();
  }
  @Input() member: IMember | Partial<IMember>;
  mainPhoto: string;
  /**
   *
   */
  constructor(
    private memberService: MemberService,
    private toastr: ToastrService
  ) {}

  getMainPhoto() {
    let mainUrl = this.member.photos.find((m) => m.isMain == true)?.url;
    if (mainUrl) {
      this.mainPhoto = mainUrl;
    } else {
      this.mainPhoto = '../../../assets/Cute Anime Illustration Boy Avatar.png';
    }
  }

  addLike(id: string) {
    this.memberService.addLike(id).subscribe(() => {
      console.log('liked');
      this.toastr.success('you have liked ');
    });
    this.isliked = !this.isliked;
  }
}
