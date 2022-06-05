import { Component, OnInit } from '@angular/core';
import { AllCandidat } from '../../../models/all-candidat.model';
import { AllCandidatService } from "../../../services/all-candidat.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-all-candidats',
  templateUrl: './all-candidats.component.html',
  styleUrls: ['./all-candidats.component.scss']
})

export class AllCandidatsComponent implements OnInit {

  public pagePosition = 2;
public totalPages=0;
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  public chkBoxSelected = [];

  constructor(private modalService: NgbModal, private AllCandidatService: AllCandidatService) { }


  ngOnInit(): void {

    // this.getData()
    this.getAllUsers();

    this.contentHeader = {
      headerTitle: 'Candidats',
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
            name: 'All Candidats',
            isLink: false
          }
        ]
      }
    };
  }

  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }

  page = 1;
  count = 0;
  pageSize = 4;
  email = '';
  phone = '';
  name = ''



  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getAllUsers();
  }

  getParams(page: number, pageSize: number, email: string, phone : string, name : string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    if (email) {
      params['email'] = email;
    }
    if (phone) {
      params['phone'] = phone;
    }
    if (name) {
      params['name'] = name;
    }

    return params;
  }
  Users?: AllCandidat[];

  getAllUsers(): void {
    const params = {
      page : this.page-1,
      size : 2,
      email : this.email,
      phone : this.phone,
      name : this.name

    }
    
    this.AllCandidatService.getAllPagination(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          // this.Users = content;
          this.Users = content
          this.count = totalElements;
          this.totalPages = totalPages*10
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }
  
}