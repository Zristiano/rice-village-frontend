import {Component, OnInit} from '@angular/core';
import {User} from '../../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  public birthday;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  isChild()
  {
    let birth = new Date(this.birthday).getTime();
    let today = new Date(Date.now()).getTime();
    let d = today-birth;
    return d<567993600000;
  }

  formSubmit(){
    this.router.navigate(['../main']);
  }

}
