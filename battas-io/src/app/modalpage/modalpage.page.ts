import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
//   providers: [NavParams]
 })
export class ModalpagePage implements OnInit {
  //navParams: NavParams
  @Input() value: number;
  constructor() { }

  ngOnInit() {
  }

}
