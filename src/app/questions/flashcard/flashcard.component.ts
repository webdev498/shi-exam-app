import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StudyTerm} from './../../model/question/StudyTerm';

declare var iSpeechTTS: any;

@Component({
  selector: 'flashcard',
  styles: [require('./flashcard.less')],
  providers: [],
  template: require('./flashcard.html')
})
export class FlashcardComponent implements OnInit {
  
  @Input() term: StudyTerm;
  
  private _translations: StudyTerm[];
  public currentTranslation: StudyTerm;

  private _tts: any;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['term']) {
            this._translations = this.term.translations;
            this.currentTranslation = this._translations[0];
        }
    }

  tapped() {
    this.term.display = true;
  }

  play() {
    this._tts.speak(this.term.text);
  }

}