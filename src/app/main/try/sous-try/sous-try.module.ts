import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessComponentComponent } from './guess-component/guess-component.component';
import { GuessCompoFirstComponent } from './guessComponent/guess-compo-first/guess-compo-first.component';
import { GuessCompoSecondComponent } from './guessComponent/guess-compo-second/guess-compo-second.component';



@NgModule({
  declarations: [
    GuessComponentComponent,
    GuessCompoFirstComponent,
    GuessCompoSecondComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SousTryModule { }
