import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCvComponent implements OnInit {

  public contentHeader: object;

  public selectBasic = [
    { name: '+2' },
    { name: '+3' },
    { name: '+5' }
  ];

  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  // private
  private modernWizardStepper: Stepper;
  private bsStepper;

   /**
   * Modern Horizontal Wizard Stepper Next
   */
    modernHorizontalNext() {
      this.modernWizardStepper.next();
    }
    /**
     * Modern Horizontal Wizard Stepper Previous
     */
    modernHorizontalPrevious() {
      this.modernWizardStepper.previous();
    }

    onSubmit() {
      alert('Submitted!!');
      return false;
    }

  constructor() { }

  ngOnInit(): void {

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      headerTitle: 'Form Wizard',
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
            name: 'Forms',
            isLink: true,
            link: '/'
          },
          {
            name: 'Form Wizard',
            isLink: false
          }
        ]
      }
    };

  }

}
