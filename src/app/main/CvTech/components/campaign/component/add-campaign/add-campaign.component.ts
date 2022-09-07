import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'app/main/cvtech/models/education.model';
import { GlobalExperience } from 'app/main/CvTech/models/global-experience.model';
import { Skill } from 'app/main/CvTech/models/skill.model';
import { AllCampaignService } from 'app/main/CvTech/services/all-campaign.service';
import { EducationService } from 'app/main/CvTech/services/education.service';
import { FunctionService } from 'app/main/CvTech/services/function.service';
import { GlobalExperienceService } from 'app/main/CvTech/services/global-experience.service';
import { SkillService } from 'app/main/CvTech/services/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {
  public contentHeader: object;

  constructor(
    private AllCampaignService: AllCampaignService,
    private router: Router,

    private EducationService: EducationService,
    private SkillService: SkillService,
    private FunctionService: FunctionService,
    private GlobalExperienceService: GlobalExperienceService,
  ) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Add Campaign",
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
            name: "Campaign",
            isLink: true,
            link: "/",
          },
          {
            name: "Add Campaign",
            isLink: false,
          },
        ],
      },
    };

    this.getEducation();
    //
    this.getSkill();
    //
    this.getFunction();
    //
    this.getExperience();
  }

  // ----- Add Campaign
  Campaign: any = {
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
    postulation: undefined,
  };
  AddCampaign(): void {
    const data = {
      name: this.Campaign.name,
      description: this.Campaign.description,
      nbPositions: this.Campaign.nbPositions,
      closing_date: this.Campaign.closing_date,
      experiences: this.experienceSelected,
      educations: this.educationSelected,
      functions: this.functionSelected,
      skills: this.skillSelected,
    };

    this.AllCampaignService.addCampaign(data).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl("/cvtech/campaign/allcampaigns");
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------ Get Education
  public educationSelected;
  education: Education[] = [];
  getEducation() {
    this.EducationService.getEducations().subscribe((edu: any) => {
      this.education = edu.content;
      console.log("education: ", this.education);
    });
  }

  // ------ Get Skill
  public skillSelected;
  skill: Skill[] = [];
  getSkill() {
    this.SkillService.getSkills().subscribe((sk: any) => {
      this.skill = sk.content;
      console.log("skill: ", this.skill);
    });
  }

  // ------ Get Function
  public functionSelected;
  function: Function[] = [];
  getFunction() {
    this.FunctionService.getFunctions().subscribe((fn: any) => {
      this.function = fn.content;
      console.log("function: ", this.function);
    });
  }

  // ------ Get Experience
  public experienceSelected;
  experience: GlobalExperience[] = [];
  getExperience() {
    this.GlobalExperienceService.getExperiences().subscribe((ex: any) => {
      this.experience = ex.content;
      console.log("experience: ", this.experience);
    });
  }


  // ---------------------------------------------
  // Select Custom Tag
  selectAddTagMethod(name) {
    return { name: name, tag: true };
  }

}
