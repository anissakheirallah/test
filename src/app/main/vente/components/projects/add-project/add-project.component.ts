import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'app/main/vente/models/project.model';
import { ProjectService } from 'app/main/vente/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProjectComponent implements OnInit {

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


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private projectService: ProjectService) { }

  ngOnInit(): void {
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
  }

  addProject() {
    console.log("hana" + this.project.projectName);
    this.projectService.createProject(this.project).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.error(err);
      }
    });
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
}
