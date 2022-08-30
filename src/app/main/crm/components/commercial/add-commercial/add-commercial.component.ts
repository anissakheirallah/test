import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Commercial } from 'app/main/crm/models/commercial.model';
import { CommercialService } from 'app/main/crm/services/commercial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-commercial',
  templateUrl: './add-commercial.component.html',
  styleUrls: ['./add-commercial.component.scss']
})
export class AddCommercialComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  commercial: Commercial = {
    id: null,
    commercialName:'',
	  statut:false,
    leads: []
  }


  public form: FormGroup = new FormGroup({
    commercialName: new FormControl(''),
    statut: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private commercialService: CommercialService) { }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Commercials',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Commercials',
            isLink: true,
            link: '/'
          },
          {
            name: 'Commercial',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Commercial',
            isLink: false
          }
        ]
      }
    };

    this.form = this.formBuilder.group(
      {
        serviceName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z]*")
          ]
        ],
        statut: ['',Validators.required],
       
      }
    );
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      
      return;
    }
    this.commercial = this.form.value;

    this.saveCommercial(this.commercial);

  }
  saveCommercial(commercial: Commercial): void {

    this.commercialService.createCommercial(commercial).subscribe(
      {
        next: (data) => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });
  }

}
