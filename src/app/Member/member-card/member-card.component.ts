import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  isliked: boolean = false;
  ngOnInit(): void {
    this.getMainPhoto();
  }
  @Input() member: IMember | Partial<IMember>;
  mainPhoto: string;
  /**
   *
   */
  constructor(private memberService: MemberService) {}

  getMainPhoto() {
    let mainUrl = this.member.photos.find((m) => m.isMain == true)?.url;
    if (mainUrl) {
      this.mainPhoto = mainUrl;
    } else {
      this.mainPhoto =
        'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg';
    }
  }

  addLike(id: string) {
    console.log('isliked');
    this.memberService.addLike(id).subscribe(() => {
      console.log('liked');
    });
    this.isliked = !this.isliked;
  }
}
