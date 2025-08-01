import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username: string = '';
  public password: string = '';
  public message: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe({
        next: (resp: { msg: string | undefined; }) => {
          console.log('Successfully registered');
          this.message = resp.msg;
          this.router.navigate(['stocks', 'list']);
        }, error: (err: { error: { msg: string | undefined; }; }) => {
          console.error('Error registering', err);
          this.message = err.error.msg;
        }
      });
  }

}
