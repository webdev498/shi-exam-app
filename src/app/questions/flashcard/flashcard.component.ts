import {Component} from '@angular/core';

@Component({
  selector: 'flashcard',
  styles: [require('./flashcard.less')],
  providers: [],
  template: require('./flashcard.html')
})
export class FlashcardComponent {
  
  term: any;

}