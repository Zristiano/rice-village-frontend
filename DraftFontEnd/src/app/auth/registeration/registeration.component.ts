import {Component, OnInit} from '@angular/core';
import {User} from '../../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  userModel = new User('Zristiano',"yz143@gmail.com",123456789,'124',1244);
  public userName;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  formSubmit(){
    this.router.navigate(['../main']);
  }

}
