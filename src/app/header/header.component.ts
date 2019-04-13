import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLogin:Boolean=false;
  @Output() login = new EventEmitter<any>();

  handleLogin(){
  	this.login.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
