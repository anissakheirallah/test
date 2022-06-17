import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Function } from "app/main/CvTech/models/function";
import { FunctionService } from "app/main/CvTech/services/function.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-function",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.scss"],
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

  public chkBoxSelected = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private functionService: FunctionService
  ) {}

  public funcForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });

  ngOnInit(): void {
    this.getData();
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

  // getData(): void {
  //   this.functionService.getFunctions().subscribe((response: any) => {
  //     (this.data = response.content), console.log(response);
  //   });
  // }

  getData(): void {
    const params = {
      page: this.page - 1,
      size: 4,
      name: this.name,
      description: this.description,
    };

    this.functionService.getAllPagination(params).subscribe({
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

  // addData(): void {
  //   this.func = this.funcForm.value;
  //   const functionData = {
  //     name: this.func.name,
  //     description: this.func.description,
  //   };
  //   this.functionService.addFunction(functionData).subscribe(
  //     (response: Function) => {
  //       console.log(response), window.location.reload();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

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

  // deleteData(id: number) {
  //   this.functionService.deleteFunction(id).subscribe(
  //     () => {
  //       window.location.reload();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // ------------ Edit function ------------

  modalEdit(modalPrimaryedit, id) {
    this.functionService.getFunction(id).subscribe({
      next: (data) => {
        this.func = data;
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

  updateSkill(): void {
    const updateF = {
      id: this.func.id,
      name: this.func.name,
      description: this.func.description,
    };
    this.functionService.updateFunction(updateF.id, updateF).subscribe({
      next: (data) => {
        this.ngOnInit();
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
