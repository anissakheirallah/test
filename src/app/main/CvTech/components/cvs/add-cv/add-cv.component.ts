import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { Cv } from 'app/main/CvTech/models/cv.model';
import { Education } from 'app/main/cvtech/models/education.model';
import { GlobalExperience } from 'app/main/CvTech/models/global-experience.model';
import { Language } from 'app/main/CvTech/models/language.model';
import { Skill } from 'app/main/CvTech/models/skill.model';
import { CvService } from 'app/main/CvTech/services/cv.service';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCvComponent implements OnInit {

  public contentHeader: object;

  public selectBasic = [
    { name: '+2' },
    { name: '+3' },
    { name: '+5' }
  ];

  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  pageSize = 5;
  page = 1;

  candidates?: Candidate[];
  educations?: Education[];
  languages?:Language[];
  skills?:Skill[];
  experiences?: GlobalExperience[];
  //domains?: Domain[];

  candidate:Candidate = {
    id:0,
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adress: '',
    city: '',
    country: '',
    birthDate: new Date,
    availability: '',
    message: ''
  }

  education:Education = {
    id:0,
    name: '',
    description: ''
  }

  language:Language = {
    id: 0,
    name: '',
    description: ''
  }

  skill:Skill = {
    id: 0,
    name: '',
    description: ''
  }

  experience:GlobalExperience = {
    id: 0,
    name: '',
    description: ''
  }
  cv : Cv = {
    id: 0,
    availability: '',
    comment: '',
    candidateId:0,
    domainsId: [],
    skillsId:[],
    globalExperiencesId: [],
    educationsId: [],
    languagesId: [],
    candidaciesId: [],
  }
  // private
  private modernWizardStepper: Stepper;
  private bsStepper;

   
    modernHorizontalNext() {
      this.modernWizardStepper.next();
    }
    modernHorizontalPrevious() {
      this.modernWizardStepper.previous();
    }

    onSubmit() {
      alert('Submitted!!');
      return false;
    }

  constructor( private cvService: CvService) { }

  ngOnInit(): void {

    this.getCandidates();
    this.getEducations();
    this.getLanguages();
    this.getSkills();
    this.getGlobalExperience();

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      headerTitle: 'Form Wizard',
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
            name: 'Forms',
            isLink: true,
            link: '/'
          },
          {
            name: 'Form Wizard',
            isLink: false
          }
        ]
      }
    };

  }

  getCandidates(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getCandidates(params).subscribe({
      next:(data:any)=>{
        this.candidates=data.content;
      }
    })
  }

  getEducations(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getEducations(params).subscribe({
      next:(data:any)=>{
        this.educations=data.content;
      }
    })
  }

  getLanguages(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getLanguages(params).subscribe({
      next:(data:any)=>{
        this.languages=data.content;
      }
    })
  }

  getSkills(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getSkills(params).subscribe({
      next:(data:any)=>{
        this.skills=data.content;
      }
    })
  }

  getGlobalExperience(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getGlobalExperience(params).subscribe({
      next:(data:any)=>{
        this.experiences=data.content;
      }
    })
  }

}

