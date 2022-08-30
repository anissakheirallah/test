import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {
  public contentHeader: object;
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  public today = this.calendar.getToday();

  project: Project = {
    id: null,
    projectName: '',
    projectType: '',
    startDate: null,
    finishDate: null,
    teams: null
  }

  isSelected: boolean = false;
  isDisabled: boolean = true;
  ids = [];
  basicSelectedOption = 10;
  selectedList?= [];
  projects: Project[] = [];
  idDelete: number;

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  page = 1;
  count = 5;
  name = '';

  constructor(private modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private projectService: ProjectService, private formBuilder: FormBuilder) { }

  @ViewChild(DatatableComponent) table: DatatableComponent;


  public form: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    projectType: new FormControl(''),
    startDate: new FormControl(''),
    finishDate: new FormControl('')
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.contentHeader = {
      headerTitle: 'Vente',
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
            name: 'Project',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Project',
            isLink: false
          }
        ]
      }
    }

    this.form = this.formBuilder.group(
      {
        projectName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        projectType: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ],
        startDate: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ],
        finishDate: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ]
      }
    );
  }


  onSelect({ selected }) {
    console.log("sel1", selected);
    while (this.selectedList.length > 0) {
      this.selectedList.pop();
    }
    this.selectedList.push(selected);
    if (this.selectedList.length > 1) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  onCheckedAll(allRowsSelected: any) {
    if (allRowsSelected) {
      this.selectedList.splice(0, this.selectedList.length);
      this.isDisabled = false;
      /*this.projects.forEach((project) => {
        this.selectedList.push(project.id);
      })*/
    } else {
      this.isDisabled = true;
    }
    console.log("total elements checked", this.selectedList)
  }

  filterUpdate(event) {
    this.name = event.target.value.toLowerCase();
  }

  public pageChanged(event: any): void {
    this.page = event;
  }

  getAllProjects() {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name
    };
    this.projectService.getProjects(params).subscribe(response => {
      const { content, totalElements } = response;
      this.projects = content;
      console.log(this.projects);
    }
    );
  }


  modalmultipledelete(modalDanger) {
    /*this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });*/
  }

  createProject() {
    this.project.projectName = this.form.value.projectName;
    this.project.projectType = this.form.value.projectType;
    this.project.startDate = new Date(this.form.value.startDate.year, this.form.value.startDate.month, this.form.value.startDate.day);
    this.project.finishDate = new Date(this.form.value.finishDate.year, this.form.value.finishDate.month, this.form.value.finishDate.day);
    console.log("hana" + this.project);
    this.projectService.createProject(this.project).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.error(err);
      }
    });
  }


  modalOpenDanger(modalDanger, id: any) {
    this.idDelete = id;
    this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.idDelete).subscribe({
      next: () => {
        this.getAllProjects();
      }, error(err) {
        console.log(err);
      },
    })
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.project.startDate = new Date(date.year, date.month - 1, date.day);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.project.finishDate = new Date(date.year, date.month - 1, date.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log(this.fromDate);
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  modalOpen(modalBasic) {
    this.modalService.open(modalBasic, {
      centered: true,
      size: 'lg'
    });
  }
}
