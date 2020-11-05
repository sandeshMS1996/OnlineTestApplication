import {Component, Input, OnInit} from '@angular/core';
import {InteractionsService} from '../interactions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() username: string;
  constructor(private interactionService: InteractionsService) {
    console.log('calling navbar constructor');
  }

  ngOnInit(): void {
    this.interactionService.receiveName().subscribe((msg: string) => {
      this.username = msg.toUpperCase();
      console.log(this.username);
      console.log(`data: ${this.username}`);
    });
  }

}
