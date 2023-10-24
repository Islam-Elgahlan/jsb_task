import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  contactForm!: FormGroup;
  titleAlert: string = 'This field is required';
  getError: any;

  users: any[] = [];

  constructor(private _HomeService: HomeService, private _FormBuilder: FormBuilder,) {
    this._HomeService.getUsers().subscribe((data) => {
      this.users = data.data;
    })
  }
  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.contactForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(11)]],

    });
  }

  prepareFormData() {
    let formData = new FormData()
    Object.entries(this.contactForm.value).forEach(([key, value]: any) => {
      formData.append(key, value)
    })
    return formData;
  }


  send() {
    
    this._HomeService.send(this.contactForm.value).subscribe((data) => {
      alert("sent")
    },
      error => {
        alert("not sent !!!!!")

      })
    console.log(this.contactForm.value)
  }



  getErrorMessage() {
    if (this.f['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.f['email'].hasError('email') ? 'Not a valid email' : '';
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl; } {
    return this.contactForm.controls;
  }

}
