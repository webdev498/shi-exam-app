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
  
  public viewTranslate: boolean = false;
  public termInput: string;
  public success: boolean = false;
  public complete: boolean = false;
  public term: StudyTerm;
  public translationText: string;

  public enableFeedback: boolean = false;
  public feedbackSubmitted: boolean = false;

  private _tts: any;
  private _count = 0;
  private _translationCount = 0;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });

      this.viewTranslate = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['terms']) {
          if (this.terms === undefined)
            return;

            if (this.terms.length > 0) {
              this.term = this.terms[0];
              this.viewTranslate = true;

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
              this._translationCount = 0;
              this.complete = false;
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
    const translationVerbage : string = this.term.translations.length == 1 ? 'translation' : 'translations';
    this.translationText = `${this.term.translations.length.toString()} ${translationVerbage}`;
  }

  next() {
    this._count++;
    this.term = this.terms[this._count];
    this.terms[this._count - 1].display = false;

    this.enableFeedback = false;
    this.feedbackSubmitted = false;
    this.complete = false;
    this._translationCount = 0;
    this.termInput = null;
  }

  displayNext() {
    return this._count < this.terms.length - 1;
  }

  resetTerms() {
    this._count = 0;

    this.term = this.terms[0];
    this.viewTranslate = true;
    this.complete = false;

    this.enableFeedback = false;
    this.feedbackSubmitted = false;
  }

  showAnswer() {
    this.termInput = this.term.translations[this._translationCount].value;

    if (this._translationCount + 1 < this.term.translations.length)
      this._translationCount++;
  }
}