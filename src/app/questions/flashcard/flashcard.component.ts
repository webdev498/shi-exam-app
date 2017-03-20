import {Component, OnInit, Input} from '@angular/core';
import {Term} from './../../model/question/Term';

declare var iSpeechTTS: any;

@Component({
  selector: 'flashcard',
  styles: [require('./flashcard.less')],
  providers: [],
  template: require('./flashcard.html')
})
export class FlashcardComponent implements OnInit {
  
  @Input() term: Term;
  private _tts: any;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });
  }

  tapped() {
    this.term.display = true;
  }

  play() {
    this._tts.speak(this.term.text);
  }

}