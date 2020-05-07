import { Component, OnInit } from '@angular/core';
import { CURRENT_USER } from 'src/app/constants/db-keys';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get name() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));

    if (user != null) {
      return user.username;
    }

    return '';
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

}
