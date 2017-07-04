import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { PlayersService } from './../services/players.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private registerPlayerSub: Subscription;
  private submitFailed = false;
  private error: string;
  constructor(private playersService: PlayersService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.registerForm.disable();
    const observer = {
      next: (value) => {
        this.playersService.logIn(value);
      },
      error: (err) => {
        this.submitFailed = true;
        this.error = err;
        this.registerForm.reset();
        this.registerForm.enable();
      },
      complete: () => {
        this.router.navigate(['/play']);
      }
    };

    this.registerPlayerSub = this.playersService.registerPlayer(this.registerForm.get('username').value).subscribe(observer);
  }

}
