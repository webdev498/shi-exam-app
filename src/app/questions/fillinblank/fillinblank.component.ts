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
}