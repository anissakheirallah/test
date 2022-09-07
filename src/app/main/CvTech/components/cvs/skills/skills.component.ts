import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Skill } from "app/main/CvTech/models/skill.model";
import { SkillService } from "../../../services/skill.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  // public skill: Skill = { id: null, name: undefined, description: undefined };

  public skill: Skill = {
    id: null,
    name: "",
    description: "",
  };

  // public contentHeader: object;
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

  public data?: Skill[];

  submitted = false;

  public chkBoxSelected = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private skillService: SkillService
  ) { }

  public skillForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });

  ngOnInit(): void {
    this.getData();

    this.contentHeader = {
      headerTitle: "Skills",
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
            name: "Skills",
            isLink: false,
          },
        ],
      },
    };

    this.skillForm = this.formBuilder.group({
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
  count = 0;
  name = "";
  description = "";

  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getData();
  }

  getParams(page: number, pageSize: number, name: string, description: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (name) {
      params["name"] = name;
    }
    if (description) {
      params["description"] = description;
    }

    return params;
  }

  getData(): void {
    const params = {
      page: this.page - 1,
      size: 4,
      name: this.name,
      description: this.description,
    };

    this.skillService.getAllPagination(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.data = response.content;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
    return this.skillForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.skillForm.invalid) {
      return;
    }
    this.skill = this.skillForm.value;

    this.addData();
  }

  // public getData(): void {
  //   this.skillService.getSkills().subscribe(
  //     (res: any) => {
  //       this.data = res.content;
  //       //console.log(res)
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public addData(): void {
    const skillData = {
      name: this.skill.name,
      description: this.skill.description,
    };
    this.skillService.addSkill(skillData).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }

  // public deleteData(id: number): void {
  //   this.skillService.deleteSkill(id).subscribe(
  //     () => {
  //       window.location.reload();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // ------------ Edit skill ------------

  modalEdit(modalPrimaryedit, id) {
    this.skillService.getSkill(id).subscribe({
      next: (data) => {
        this.skill = data;
        this.skillForm = this.formBuilder.group({
          name: [
            this.skill.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.skill.description,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(45),
            ],
          ],
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  edit(): void {
    if (this.skillForm.invalid) {
      return;
    }
    this.skill.name = this.skillForm.value.name;
    this.skill.description = this.skillForm.value.description;

    this.updateSkill(this.skill);
  }

  updateSkill(skill: Skill): void {
    this.skillService.updateSkill(skill.id, skill).subscribe({
      next: (data) => {
        console.log(data);
        this.getData();
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------- delete -------------- //

  public deleteData() {
    console.log(this.id);

    this.modal.close("Accept click");
    this.skillService.deleteSkill(this.id).subscribe({
      next: () => {
        console.log("Skill deleted !", this.id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.skillForm.reset();
  }
}
