import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Availability } from 'app/main/CvTech/models/availability';
import { AvailabiltyService } from 'app/main/CvTech/services/availabilty.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AbstractControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-availabilty',
  templateUrl: './availabilty.component.html',
  styleUrls: ['./availabilty.component.scss']
})
export class AvailabiltyComponent implements OnInit {
  public contentHeader: object;

  data?: Availability[]
  availability: Availability = {
    name: '',
    description: '',
    id: 0
  }

  id: number;

  constructor(
    private availabilityService: AvailabiltyService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.getData()
    this.getAllavailabilities()
    this.contentHeader = {
      headerTitle: 'Availability',
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
            name: 'CvTech',
            isLink: true,
            link: '/'
          },
          {
            name: 'Profil',
            isLink: true,
            link: '/'
          },
          {
            name: 'Availability',
            isLink: false
          }
        ]
      }
    };

    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [

            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/[A-zÀ-ú]/)
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255)
          ]
        ],

      }
    );

    this.formUpdate = this.formBuilder.group(
      {
        name: [
          '',
          [

            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/[A-zÀ-ú]/)
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255)
          ]
        ],

      }
    );

  }


  // ----------------- Add availability
  ava: Availability = {
    name: '',
    description: '',
    id: 0
  }
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  submitted = false;
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.availability = this.form.value;

    this.addData();

  }
  private addData(): void {
    // this.submitted = true;
    // if (this.form.invalid) {
    this.availability = this.form.value
    const availabilityData = {
      id: 0,
      name: this.availability.name,
      description: this.availability.description
    }

    this.availabilityService.addAvailability(availabilityData).subscribe(

      {
        next: (response: any) => {
          console.log(response);
          this.submitted=false
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit()
          this.router.navigateByUrl("/cvtech/profile/availabilty");
        }, error: (err) => {
          console.error(err);
        }
      }
    )

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fU(): { [key: string]: AbstractControl } {
    return this.formUpdate.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  // ----------------- Delete availability
  public deleteData(): void {

    console.log(this.id)
    this.availabilityService.deleteAvailability(this.id).subscribe(
      () => { this.modalDanger.close('Accept click');this.ngOnInit() },
      (error: HttpErrorResponse) => { alert(error.message) }

    )
  }

  private modalDanger = null

  modalOpenDanger(modalDanger, id: any) {
    this.id = id
    this.modalDanger = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }


  // -------------------- pagination & search
  page = 1;
  count = 0;
  name = ''
  public pagePosition = 1;
  public totalPages = 0;


  public pageChanged(event: any): void {
    this.page = event;
    this.getAllavailabilities();
  }

  // ----------------- Get availability
  availabilities?: Availability[]
  public getAllavailabilities(): void {

    const params = {
      page: this.page - 1,
      size: 3,
      name: this.name
    }
    this.availabilityService.getAllPagination(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          this.totalPages = totalPages * 10
          this.availabilities = response.content
          // console.log(this.availabilities);

        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }


  // ----------------- Update availability

  public availabilityToUpdate: Availability = {
    name: undefined,
    description: undefined,
    id: 0
  }

  formUpdate: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  onUpdate(): void {
    this.submitted = true;
    console.log(this.formUpdate.value);

    if (this.formUpdate.invalid) {
      return;
    }
    this.availabilityToUpdate = this.formUpdate.value;

    this.updateAvailability();

  }

  updateAvailability(): void {
    console.log(this.id);

    console.log(this.availabilityToUpdate);

    this.availabilityService.update(this.availabilityToUpdate, this.id).subscribe({
      next: (data) => {
        console.log("update --> ", data);
        this.router.navigateByUrl("/cvtech/profile/availabilty");
        this.ngOnInit()
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  modalOpenSM(modalSM, id: any) {
    this.id = id

    this.modalService.open(modalSM, {
      centered: true,
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'

    });
  }

}
