import {Component, Input} from '@angular/core';
import {Term} from './../../model/question/Term';

@Component({
  selector: 'fillinblank',
  styles: [require('./fillinblank.less')],
  providers: [],
  template: require('./fillinblank.html')
})
export class FillInBlankComponent {

  @Input() term: Term;

  public termInput: string;
  public success: boolean = false;
  public complete: boolean = false;

  entered() {
    this.success = false;
    
    for (let i = 0; i < this.term.translations.length; i++) {
      if (this.term.translations[i].text == this.termInput) {
        this.success = true;
      }
    }

    this.complete = true;
  }
}