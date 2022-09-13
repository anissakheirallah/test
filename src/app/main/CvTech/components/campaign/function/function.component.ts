import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Function } from "app/main/CvTech/models/function.model";
import { FunctionService } from "app/main/CvTech/services/function.service";

@Component({
  selector: "app-function",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FunctionComponent implements OnInit {
  public data?: Function[];
  public func: Function = { id: null, name: "", description: "" };
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

  submitted = false;
  
  public ColumnMode = ColumnMode;

  public chkBoxSelected = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private functionService: FunctionService
  ) { }

  public funcForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });

  ngOnInit(): void {
    this.getAllFunctions();
    this.contentHeader = {
      headerTitle: "Function",
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
            name: "Function",
            isLink: false,
          },
        ],
      },
    };
    this.funcForm = this.formBuilder.group({
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
  basicSelectedOption = 5;
  name = "";

  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getAllFunctions();
  }

  getAllFunctions(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.functionService.getAllPagination(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        this.totalPages = totalPages * 10;
        this.data = content;
        console.log(content);
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
    return this.funcForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.funcForm.invalid) {
      return;
    }
    this.func = this.funcForm.value;

    this.addData();
  }

  public addData(): void {
    const functionData = {
      name: this.func.name,
      description: this.func.description,
    };
    this.functionService.addFunction(functionData).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }

  // ------------ Edit function ------------

  modalEdit(modalPrimaryedit, id) {
    this.functionService.getFunction(id).subscribe({
      next: (data) => {
        this.func = data;
        this.funcForm = this.formBuilder.group({
          name: [
            this.func.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.func.name,
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
    if (this.funcForm.invalid) {
      return;
    }
    this.func.name = this.funcForm.value.name;
    this.func.description = this.funcForm.value.description;

    this.updateFunction(this.func);
  }

  updateFunction(funct: Function): void {
    this.functionService.updateFunction(funct.id, funct).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllFunctions();
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
    this.functionService.deleteFunction(this.id).subscribe({
      next: () => {
        console.log("Function deleted !", this.id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.funcForm.reset();
  }
}
