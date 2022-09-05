import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentTestComponent } from "./component-test/component-test.component";
import { ComponentTest2Component } from "./component-test2/component-test2.component";
import { Routes } from "@angular/router";
import { SousTestComponent } from "./sous-test.component";

const route: Routes = [
  {
    path: "",
    component: SousTestComponent,
  },
  {
    path: "test",
    component: ComponentTestComponent,
  },
  {
    path: "test2",
    component: ComponentTest2Component,
  },
];

@NgModule({
  declarations: [
    ComponentTestComponent,
    ComponentTest2Component,
    SousTestComponent,
  ],
  imports: [CommonModule],
})
export class SousTestModule {}
