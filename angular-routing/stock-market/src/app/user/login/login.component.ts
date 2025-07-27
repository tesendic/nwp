import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public message: string | undefined;
  
  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: (resp: { msg: string | undefined; }) => {
          console.log('Successfully logged in');
          this.message = resp.msg;
          this.router.navigate(['stocks', 'list']);
        }, 
        error: (err: { error: { msg: string | undefined; }; }) => {
          console.error('Error logging in', err);
          this.message = err.error.msg;
        }
      });
  }
}
