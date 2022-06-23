import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Function } from 'app/main/CvTech/models/function';
import { FunctionService } from 'app/main/CvTech/services/function.service';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {
  data?: Function[]
  public func : Function = {name: '', description :''}
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };
  constructor(private modalService: NgbModal, private functionService : FunctionService) { }

  funcForm = new FormGroup({
    name : new FormControl(''),
    description : new FormControl('')
  })

  ngOnInit(): void {
    this.getData()
    this.contentHeader = {
      headerTitle: 'Function',
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
            name: 'Function',
            isLink: false
          }
        ]
      }
    };
  }

  getData() : void 
  {
      this.functionService.getFunctions().subscribe(
        (response : any) => {this.data = response.content, console.log(response)}
      )
  }

  addData() : void 
  {
    this.func = this.funcForm.value
    const functionData = 
    {
      name : this.func.name,
      description : this.func.description
    }
    this.functionService.addFunction(functionData).subscribe(
      (response : Function) => { console.log(response), window.location.reload()},
      (error : HttpErrorResponse) =>  { alert(error.message)}
    )
  }
  
  // ----------------------------------

  private modal = null;
  private id = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.id = id;
    console.log(id);
    
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteData()
  {
    this.functionService.deleteFunction(this.id).subscribe(
      () => { this.modal.close("Accept click");this.ngOnInit() },
      (error : HttpErrorResponse) => {  alert(error.message)}
    )
    
  }

}
