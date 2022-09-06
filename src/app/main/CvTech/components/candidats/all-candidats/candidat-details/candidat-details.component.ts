import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllCandidatService } from '../../../../services/all-candidat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllCandidat } from '../../../../models/all-candidat.model';

//added by saad for form input validation....
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeKeyedRead } from '@angular/compiler';


@Component({
  selector: 'app-candidat-details',
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.scss']
})
export class CandidatDetailsComponent implements OnInit {
  model: import("@ng-bootstrap/ng-bootstrap").NgbModalRef;

  modalOpenForm(modalForm) {
    this.model = this.modalService.open(modalForm);
  }

  constructor(private route: ActivatedRoute, private AllCandidatService: AllCandidatService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  id: number = this.route.snapshot.params["candidat_id"];
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  User?: AllCandidat = {
    id: 0,
    civility: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    adress: undefined,
    city: undefined,
    country: undefined,
    birthDate: undefined,
    message: undefined
  };

  // added by saad.................. 

  form = new FormGroup({
    id: new FormControl(this.id),
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    birthDate: new FormControl(''),
    civility: new FormControl(''),
    message: new FormControl(''),
  });
  submitted = false;

  getCandidat() {
    this.AllCandidatService.getbyid(this.id).subscribe(
      {
        next: (response: any) => {
          this.User = response;
          this.form = this.formBuilder.group(
            {
              name: [
                this.User.name,
                [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.pattern("[a-zA-Z ]*")
                ]
              ],
              birthDate: [this.User.birthDate, Validators.required],
              civility: [this.User.civility, Validators.required],
              country: [this.User.country, Validators.required],
              email: [this.User.email, [Validators.required, Validators.email]],
              phone: [
                this.User.phone,
                [
                  Validators.required,
                  Validators.pattern(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g),
      
                ]
              ],
              city: [this.User.city,
              [
                Validators.required,
                Validators.pattern("[a-zA-Z ]*")
              ]
              ],
              adress: [this.User.adress, Validators.required],
              message: [
                this.User.message,
                [
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(255)
                ]
              ],
            }
          );
        },
        error: (err) => {
          console.error(err);
        }
      }
    );

  }

  ngOnInit(): void {

    this.getCandidat();

    this.contentHeader = {
      headerTitle: 'Candidat Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/home'
          },
          {
            name: 'CvTech',
            isLink: true,
            link: '/'
          },
          {
            name: 'Candidats',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Candidats',
            isLink: true,
            link: '/cvtech/candidats/allcandidats'
          },
          {
            name: 'Candidats Details',
            isLink: false,
            link: '/'
          }
        ]
      }
    };

    console.log(this.form.value);
    
  }



  updateCandidat(id: number): void {

    this.User = this.form.value;
    console.log(this.User);

    this.AllCandidatService.update(this.User, id).subscribe({
      next: (data) => {
        this.model.close()
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  //added by saad...........
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.updateCandidat(this.id);
    // console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
