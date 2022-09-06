import { Component, OnInit } from '@angular/core';
import { AllCampaignService } from '../../../services/all-campaign.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllCampaign } from '../../../models/all-campaign.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };
  router: any;
  
  constructor(private modalService: NgbModal, private AllCampaignService : AllCampaignService) {}

  ngOnInit(): void 
  {
    this.getAllCampaigns()
    //

    this.contentHeader = {
      headerTitle: 'All Campaigns',
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
            name: 'Campaign',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Campaigns',
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
  // -------------------- pagination & search
  page = 1;
  public sizeSelect: number = 2;
  name = '';
  count = 0;
  public pagePosition = 1;
  public totalPages=0;
  

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllCampaigns();
  }

  public chkBoxSelected = [];
  Campains? : AllCampaign[];

  public getAllCampaigns(): void {
    const params = {
      page : this.page-1,
      size : this.sizeSelect,
      name : this.name
    }
    this.AllCampaignService.getAllPagination(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          this.totalPages = totalPages*10
          this.Campains = response.content
          
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }
  public pageAdvancedNoEllipses = 8;
  private modal=null;
  private id=0;

  modalOpenDanger(modalDanger, id:any) {
    this.id=id
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

    // delFunc(id){
    //   //console.log("Delete ",id);
    //   this.deleteCampaign(id);
    //   this.router.navigateByUrl("/reload");
    // }


    
  // ------------- delete campaign 
  deleteCampaign(){
   console.log(this.id);
   
    this.modal.close('Accept click')
    window.location.reload();
    this.AllCampaignService.DeleteCampaignById(this.id).subscribe({
      next: () => {
        console.log("Campaigns , deleted !", this.id);
        this.ngOnInit();
      
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
