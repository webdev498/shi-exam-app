import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {StudyTerm} from './../../model/question/StudyTerm';

declare var iSpeechTTS: any;

@Component({
  selector: 'fillinblank',
  providers: [],
  template: require('./fillinblank.html')
})
export class FillInBlankComponent {

  @Input() terms: StudyTerm[];
  
  public view: boolean = false;
  public termInput: string;
  public success: boolean = false;
  public complete: boolean = false;
  public term: StudyTerm;

  public enableFeedback: boolean = false;
  public feedbackSubmitted: boolean = false;

  private _tts: any;
  private _count = 0;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['terms']) {
          if (this.terms === undefined)
            return;

            if (this.terms.length > 0) {
              this.term = this.terms[0];
              this.view = true;

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
            }
        }
    }

  inputKey(e) {
    if (e.keyCode === 13)
      this.entered();
  }

  entered() {
    this.success = false;

    for (let i = 0; i < this.term.translations.length; i++) {
      if (this.term.translations[i].value == this.termInput) {
        this.success = true;
      }
    }

    this.complete = true;
  }

  next() {
    
  }
}