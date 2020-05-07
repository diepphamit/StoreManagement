import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html'
})
export class FullComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $(document).ready(() => {
        $('.sidebar-menu').tree();
        $('body').layout('fix');
    });
}

}
