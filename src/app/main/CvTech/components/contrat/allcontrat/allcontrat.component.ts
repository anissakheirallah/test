import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Contrat } from 'app/main/CvTech/models/contrat.model';
import { ContratService } from 'app/main/CvTech/services/contrat.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-allcontrat',
  templateUrl: './allcontrat.component.html',
  styleUrls: ['./allcontrat.component.scss']
})
export class AllcontratComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  contrats?: Contrat[];
  pageSize = 5;

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  contrat: Contrat = {
    id: null,
    name: '',
    description: null,
    campaignId: 0
  }


  editContrat: Contrat = {
    id: null,
    name: '',
    description: null,
    campaignId: 0
  }



  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });


  public formEdit: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });


  submitted = false;
  constructor(private modalService: NgbModal,
    private contratService: ContratService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getContrats();

    this.contentHeader = {
      headerTitle: 'All contrats',
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
            name: 'Contrat',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Contrats',
            isLink: false
          }
        ]
      }
    };
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get EditFormControl(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }


  @ViewChild(DatatableComponent) table: DatatableComponent;

  page = 1;
  count = 5;
  searchContrat = '';


  filterByName(event) {
    this.searchContrat = event.target.value.toLowerCase();
    this.getContrats();
  }

  public pageChanged(event: any): void {
    this.page = event;
    this.getContrats();
  }

  public getContrats(): void {
    const params = {
      page: this.page - 1,
      size: this.pageSize,
      name: this.searchContrat
    }
    this.contratService.getContracts(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          //this.totalPages = totalPages * 10
          this.contrats = response.content
          console.log(this.contrats)
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  //Edit 

  modalEdit(modalPrimaryedit, id) {
    console.log(id);
    this.contratService.getContrat(id).subscribe({
      next: (data) => {
        console.log(data)
        this.editContrat.id = data.id;
        this.editContrat.name = data.name;
        this.editContrat.description = data.description;
       // this.editContrat.campaignId = data.campaignId;
        this.formEdit = this.formBuilder.group(
          {
            name: [
              this.editContrat.name,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("[a-zA-Z ]*")
              ]
            ],
            description: [this.editContrat.description, Validators.required],

          }
        );
      }, error: (err) => {
        console.error(err);
      }
    });
    this.modal = this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }





  // Add

  modalAdd(modalPrimaryadd, addedContrat) {

    console.log(addedContrat);


    this.form = this.formBuilder.group(
      {
        name: [
          addedContrat.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z ]*")
          ]
        ],
        description: [addedContrat.description, Validators.required],

      }
    )

    this.modal = this.modalService.open(modalPrimaryadd, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }





  private modal = null;

  onEditSubmit(): void {
    if (this.formEdit.invalid) {
      console.log(this.formEdit.value);
      this.toastrWarning("Oooops!! Something went wrong .")
      return;
    }
    this.editContrat.name = this.formEdit.value.name;
    this.editContrat.description = this.formEdit.value.description;
    console.log(this.editContrat);
    this.updateContrat(this.editContrat);

  }

  onAddSubmit(): void {
    if (this.form.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")
      console.log(this.form.value);

      return;
    }
    this.contrat.name = this.form.value.name;
    this.contrat.description = this.form.value.description;

    console.log(this.contrat);

    this.saveContrat(this.contrat);
  }
  
  updateContrat(contrat: Contrat): void {
    contrat.campaignId=1;
    this.contratService.updateContrat(contrat.id, contrat).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.modal.close('Accept click')
          this.getContrats();
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  // delete 

  deleteContrat(id: number) {
    this.contratService.deleteContrat(id).subscribe({
      next: () => {
        console.log("Contrat deleted !", id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  // Success
  toastrSuccess(message: string) {
    this.toastr.success('👋 ' + message, 'Success!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  // Warning
  toastrWarning(message: string) {
    this.toastr.warning('👋 ' + message, 'Warning!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  // add

  saveContrat(contrat: Contrat): void {
    contrat.campaignId=1;

    this.contratService.createContrat(contrat).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.modal.close('Accept click');
          this.toastrSuccess(" Contrat added successfully !! ");
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Your work has been saved',
          //   showConfirmButton: false,
          //   timer: 1500
          // });

          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });


  }

}
