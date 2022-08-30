import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Commercial } from 'app/main/vente/models/commercial.model';
import { CommercialService } from 'app/main/vente/services/commercial.service';

@Component({
  selector: 'app-all-commercials',
  templateUrl: './all-commercials.component.html',
  styleUrls: ['./all-commercials.component.scss']
})
export class AllCommercialsComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  commercials?: Commercial[];
  public chkBoxSelected = [];
  pageSize = 5;


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

  constructor(private modalService: NgbModal, private commercialService: CommercialService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Commercial',
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
            name: 'AllCommercials',
            isLink: false
          }
        ]
      }
    };
    this.getCommercials();

  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //  pagination & search

  page = 1;
  count = 0;
  name = ''
  public pagePosition = 1;
  public totalPages = 0;


  public pageChanged(event: any): void {
    this.page = event;
    this.getCommercials();
  }

  getParams(page: number, pageSize: number, name: string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    if (name) {
      params['name'] = name;
    }

    return params;
  }

  public getCommercials(): void {
    const params = {
      page: this.page - 1,
      size: this.pageSize,
      name: this.name
    }
    this.commercialService.getCommercials(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          this.totalPages = totalPages * 10
          this.commercials = response.content

        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  //Edit 

  modalEdit(modalPrimaryedit, id) {
    console.log(id);
    this.commercialService.getCommercial(id).subscribe({
      next: (data) => {
        this.commercial = data;
        this.form = this.formBuilder.group(
          {
            commercialName: [
              this.commercial.commercialName,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("[a-zA-Z ]*")
              ]
            ],
            statut: [this.commercial.statut, Validators.required],
           
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
  private modal = null;
  onSubmit(): void {
    if (this.form.invalid) {
      console.log(this.form.value);
      
      return;
    }
    this.commercial.commercialName= this.form.value.commercialName;
    this.commercial.statut = this.form.value.statut;

    console.log(this.commercial);
    this.updateCommercial(this.commercial);
  }

  updateCommercial(commercial: Commercial): void {
    this.commercialService.updateCommercial(commercial.id, commercial).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.modal.close('Accept click')
          this.getCommercials();
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  // delete 

  deleteCommercial(id: number) {
    this.commercialService.deleteCommercial(id).subscribe({
      next: () => {
        console.log("Commercial deleted !", id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
