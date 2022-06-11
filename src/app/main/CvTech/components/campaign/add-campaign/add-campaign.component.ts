import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AllCampaign } from 'app/main/CvTech/models/all-campaign.model';
import { Availability } from 'app/main/CvTech/models/availability';
import { Education } from 'app/main/CvTech/models/education';
import { Function } from 'app/main/CvTech/models/function';
import { Skill } from 'app/main/CvTech/models/skill';
import { GlobalExperience } from 'app/main/CvTech/models/global-experience';
import { AllCampaignService } from 'app/main/CvTech/services/all-campaign.service';
import { EducationService } from 'app/main/CvTech/services/education.service';
import { FunctionService } from 'app/main/CvTech/services/function.service';
import { SkillService } from 'app/main/CvTech/services/skill.service';
import { GlobalExperienceService } from 'app/main/CvTech/services/global-experience.service';
import { CurrentSituationService } from 'app/main/CvTech/services/current-situation.service';
import { AvailabiltyService } from 'app/main/CvTech/services/availabilty.service';
import { CurrentSituation } from 'app/main/CvTech/models/current-situation';


@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCampaignComponent implements OnInit {
  // public
  public contentHeader: object;

  constructor(
    private AllCampaignService: AllCampaignService,
    private router: Router,

    private EducationService: EducationService,
    private SkillService: SkillService,
    private FunctionService: FunctionService,
    private GlobalExperienceService: GlobalExperienceService,
    private CurrentSituationService: CurrentSituationService,
    private AvailabiltyService: AvailabiltyService,

  ) {
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Add Campaign',
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
            name: 'Add Campaign',
            isLink: false
          }
        ]
      }
    };

    this.getEducation()
    // 
    this.getSkill()
    // 
    this.getFunction()
    // 
    this.getExperience()
    // 
    this.getAvailablity()
    // 
    this.getSituation()
  }

  // ----- Add Campaign 
  Campaign: AllCampaign = {
    name: undefined,
    description: undefined,
    nbPositions: 0,
    closing_date: undefined,
    availablities: undefined,
    experiences: undefined,
    educations: undefined,
    situations: undefined,
    functions: undefined,
    skills: undefined,
    postulation: undefined
  };
  AddCampaign(): void {
    const data = {
      name: this.Campaign.name,
      description: this.Campaign.description,
      nbPositions: this.Campaign.nbPositions,
      closing_date: this.Campaign.closing_date,

      availablities: this.availablitySelected,
      experiences: this.experienceSelected,
      educations: this.educationSelected,
      situations: this.situationSelected,
      functions: this.functionSelected,
      skills: this.skillSelected
    }

    this.AllCampaignService.addCampaign(data).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/cvtech/campaign/allcampaigns");
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  // ------ Get Education
  public educationSelected;
  education: Education[] = []
  getEducation() {
    this.EducationService.getEducations().subscribe(
      (edu: any) => {
        this.education = edu.content;
        console.log("education: ", this.education);
      }
    )
  }

  // ------ Get Skill
  public skillSelected;
  skill: Skill[] = []
  getSkill() {
    this.SkillService.getSkills().subscribe(
      (sk: any) => {
        this.skill = sk.content;
        console.log("skill: ", this.skill);
      }
    )
  }

  // ------ Get Function
  public functionSelected;
  function: Function[] = []
  getFunction() {
    this.FunctionService.getFunctions().subscribe(
      (fn: any) => {
        this.function = fn.content;
        console.log("function: ", this.function);
      }
    )
  }

  // ------ Get Experience
  public experienceSelected;
  experience: GlobalExperience[] = []
  getExperience() {
    this.GlobalExperienceService.getExperiences().subscribe(
      (ex: any) => {
        this.experience = ex.content;
        console.log("experience: ", this.experience);
      }
    )
  }

  // ------ Get Availablity
  public availablitySelected;
  availablity: Availability[] = []
  getAvailablity() {
    this.AvailabiltyService.getAvailabilties().subscribe(
      (av: any) => {
        this.availablity = av.content;
        console.log("availablity: ", this.availablity);
      }
    )
  }

  // ------ Get Situation
  public situationSelected;
  situation: CurrentSituation[] = []
  getSituation() {
    this.CurrentSituationService.getSituations().subscribe(
      (av: any) => {
        this.situation = av.content;
        console.log("situation: ", this.situation);
      }
    )
  }

  // ---------------------------------------------
  // Select Custom Tag
  selectAddTagMethod(name) {
    return { name: name, tag: true };
  }



}
