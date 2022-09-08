import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {
  public contentHeader: object;

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(),
  });
  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  submitted = false;
  constructor() { }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: "Learning",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Learning",
            isLink: true,
            link: "/",
          },
          {
            name: "Training",
            isLink: true,
            link: "/",
          },
          {
            name: "AddTraining",
            isLink: true,
            link: "/",
          },

        ],
      },
    };

  }

  onSubmit(): void {


  }

}
