import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from '../../../models/skill';
import { SkillService } from '../../../services/skill.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})



export class SkillsComponent implements OnInit 
{
  public skill : Skill = {name: '', description :''}
  public contentHeader: object;
  public data?: Skill[];

  constructor(private modalService: NgbModal, private skillService : SkillService) { }

  skillForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })

  ngOnInit(): void 
  {
    this.getData()
    
    this.contentHeader = {
      headerTitle: 'Skills',
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
            name: 'Skills',
            isLink: false
          }
        ]
      }
    };
  }

  public getData() : void
  {
    this.skillService.getSkills().subscribe(
      (res : any) => {
        this.data = res.content
        //console.log(res)
      } ,
      (error : HttpErrorResponse) =>
      {
        alert(error.message)
      }
    )
  }

  public addData() : void 
  {
    this.skill = this.skillForm.value;
   
    const skillData = 
    {
      name : this.skill.name,
      description : this.skill.description
    }
    this.skillService.addSkill(skillData).subscribe(
      (response : Skill) => { console.log(response), this.ngOnInit() },
      (error : HttpErrorResponse) => { alert(error.message) }
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

  public deleteData() : void 
  {
    this.skillService.deleteSkill(this.id).subscribe(
      () => { window.location.reload() },
      (error : HttpErrorResponse) => {  alert(error.message)}
      )
  }

}
