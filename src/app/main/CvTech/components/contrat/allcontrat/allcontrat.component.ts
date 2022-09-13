import { ContratService } from './../../../services/contrat.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Contrat } from 'app/main/CvTech/models/contrat.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-allcontrat',
  templateUrl: './allcontrat.component.html',
  styleUrls: ['./allcontrat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllcontratComponent implements OnInit {
  public data?: Contrat[];
  public cont: Contrat = {
    id: null, name: "", description: "",
    campaignId: 1
  };
  public pagePosition = 1;
  public totalPages = 0;
  contentHeader: {
    headerTitle: string;
    actionButton: boolean;
    breadcrumb: {
      type: string;
      links: (
        | { name: string; isLink: boolean; link: string }
        | { name: string; isLink: boolean; link?: undefined }
      )[];
    };
  };

  submitted = false;
  
  public ColumnMode = ColumnMode;

  public chkBoxSelected = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private contratService: ContratService
  ) { }

  public contForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });


  ngOnInit(): void {
   this.getContrats();
    this.contentHeader = {
      headerTitle: "Function",
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
            name: "CvTech",
            isLink: true,
            link: "/",
          },
          {
            name: "Profil",
            isLink: true,
            link: "/",
          },
          {
            name: "Function",
            isLink: false,
          },
        ],
      },
    };
    this.contForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
    });
  }
  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  page = 1;
  basicSelectedOption = 5;
  name = "";

  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getContrats();
  }



  public getContrats(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.contratService.getContracts(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
            this.totalPages = totalPages * 10;
            this.data = content;
            console.log(content);
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }
  private modal = null;
  private id = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.id = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.contratService.invalid) {
      return;
    }
    this.cont = this.contForm.value;

    this.addData();
  }

  public addData(): void {
    const contractData = {
      name: this.cont.name,
      description: this.cont.description,
    };
    this.contratService.createContrat(contractData).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }




  //Edit 

  modalEdit(modalPrimaryedit, id) {
    console.log(id);
    this.contratService.getContrat(id).subscribe({
      next: (data) => {
        console.log(data)
         this.cont = data;
       // this.editContrat.campaignId = data.campaignId;
        this.contForm = this.formBuilder.group(
          {
            name: [
              this.cont.name,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("[a-zA-Z ]*")
              ]
            ],
            description: [this.cont.description, [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(45),
            ],],

          }
        );
      }, error: (err) => {
        console.error(err);
      },
    });
    this.modal = this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }

  edit(): void {
    if (this.contForm.invalid) {
      return;
    }
    this.cont.name = this.contForm.value.name;
    this.cont.description = this.contForm.value.description;

    this.updateContrat(this.cont);
  }

  updateFunction(cont : Contrat): void {
    this.contratService.updateContract(cont.id, cont).subscribe({
      next: (data) => {
        console.log(data);
        this.getContrats();
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public deleteData() {
    console.log(this.id);

    this.modal.close("Accept click");
    this.contratService.deleteContrat(this.id).subscribe({
      next: () => {
        console.log("Function deleted !", this.id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
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
