import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {


  public showReportIcons = true;

  constructor() { }

  ngOnInit(): void {
  }

}
