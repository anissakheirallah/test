import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "all-employees",
    component: AllEmployeesComponent,
  },
  {
    path: "employee-details",
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  declarations: [AllEmployeesComponent, EmployeeDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmployeeModule {}
