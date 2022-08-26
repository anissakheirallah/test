
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { RhRequestHoliday } from 'app/main/grh/models/rh-request-holiday.model';
import { HolidayService } from 'app/main/grh/services/holiday.service';


@Component({
  selector: 'app-all-vacation',
  templateUrl: './all-vacation.component.html',
  styleUrls: ['./all-vacation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllVacationComponent implements OnInit {


  holiday: RhRequestHoliday = {
    id: null,
    holidayTitle: '',
    startDate: new Date(),
    finishDate: new Date(),
    holidayType: '',
    messageDetails: '',
    rhRequest_id: null
  }

  idHoliday: any;
  holidays: RhRequestHoliday[];
  submitted = false;

  isSelected: boolean = false;
  isDisabled: boolean = true;
  ids = [];
  basicSelectedOption = 10;
  selectedList?= [];

  public contentHeader: object;

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;


  constructor(public formatter: NgbDateParserFormatter,
    private modalService: NgbModal, private formBuilder: FormBuilder,
    private holidayService: HolidayService) { }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  page = 1;
  count = 5;
  name = '';


  onChange(e: any) {
    this.idHoliday = e.target.value;
  }


  public form: FormGroup = new FormGroup({
    holidayTitle: new FormControl(''),
    messageDetails: new FormControl(''),
    holidayType: new FormControl(''),
    startDate: new FormControl(''),
    finishDate: new FormControl(''),
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ Edit Holiday ------------

  modalEdit(modalPrimaryedit, id) {

    this.holidayService.getHoliday(id).subscribe({
      next: (data) => {
        this.holiday.id = data.id;

        this.holiday.holidayTitle = data.holidayTitle;
        this.holiday.holidayType = data.holidayType;
        this.holiday.messageDetails = data.messageDetails;
        this.holiday.startDate = data.startDate;
        this.holiday.finishDate = data.finishDate;
        this.holiday.rhRequest_id = data.rhRequestResponse.id;


        let sd = this.holiday.startDate.toString().split('-');
        let fd = this.holiday.finishDate.toString().split('-');

        let ds = Number(sd[0]);
        let ms = Number(sd[1]);
        let ys = Number(sd[2]);

        let df = Number(fd[0]);
        let mf = Number(fd[1]);
        let yf = Number(fd[2]);

        this.form = this.formBuilder.group(
          {
            holidayTitle: [
              this.holiday.holidayTitle,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            messageDetails: [
              this.holiday.messageDetails,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            holidayType: [
              this.holiday.holidayType,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            startDate: [
              {
                year: ys,
                month: ms,
                day: ds
              },
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            finishDate: [
              {
                year: yf,
                month: mf,
                day: df
              },
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ]
          }
        );

      }, error: (err) => {
        console.error(err);
      }
    });
    this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: 'modal modal-primary',
    });

  }

  updateHoliday(): void {
    this.holiday.holidayTitle = this.form.value.holidayTitle;
    this.holiday.holidayType = this.form.value.holidayType;
    this.holiday.messageDetails = this.form.value.messageDetails;
    this.holiday.startDate = new Date(this.form.value.startDate.year, this.form.value.startDate.month, this.form.value.startDate.day);
    this.holiday.finishDate = new Date(this.form.value.finishDate.year, this.form.value.finishDate.month, this.form.value.finishDate.day);
    console.log(this.holiday);
    this.holidayService.updateHoliday(this.holiday.id, this.holiday).subscribe(
      {
        next: (data) => {
          this.modalService.dismissAll("Cross click");
          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });
  }


  // ------------ Delete Holiday ------------ 

  private modal = null;

  modalOpenDanger(modalDanger, id: any) {
    this.idHoliday = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });

  }

  deleteHoliday() {
    this.modal.close('Accept click');
    this.holidayService.deleteHoliday(this.idHoliday).subscribe({
      next: () => {
        this.getAllholidays();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelect({ selected }) {
    console.log("sel1", selected);
    while (this.selectedList.length > 0) {
      this.selectedList.pop();
    }
    this.selectedList.push(...selected);
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
      this.holidays.forEach((Holiday) => {
        this.selectedList.push(Holiday.id);
      })
    } else {
      this.isDisabled = true;
    }
    console.log("total elements checked", this.selectedList)
  }

  deletemultiple() {
    this.modal.close('Accept click');
    this.ids.splice(0, this.ids.length);
    this.selectedList.forEach((item) => {
      this.ids.push(item.id)
    });
    this.holidayService.deleteMultipleHoliday(this.ids).subscribe({
      next: () => {
        this.getAllholidays();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  modalmultipledelete(modalDanger) {
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  filterUpdate(event) {
    this.name = event.target.value.toLowerCase();
    this.getAllholidays();
  }

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllholidays();
  }


  getAllholidays() {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name
    };
    this.holidayService.getHolidays(params).subscribe(response => {
      const { content, totalElements } = response;
      this.holidays = content;
      console.log(this.holidays);
    }
    );
  }



  ngOnInit(): void {
    this.getAllholidays();
    this.isDisabled = true;
    this.contentHeader = {
      headerTitle: 'grh',
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
            name: 'Holiday',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Holidays',
            isLink: false
          }
        ]
      }
    }
    this.form = this.formBuilder.group(
      {
        holidayTitle: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        holidayType: [
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
        messageDetails: [
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

}
