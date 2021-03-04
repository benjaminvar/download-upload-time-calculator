import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { tap } from "rxjs/operators"
@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  availableLanguages: {config: any, code: string, text: string}[] = [];
  languageControl: FormControl;
  subscriptions: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.languageControl = this.fb.control(currentLanguage);
    this.availableLanguages = this.languageService.getAvailableLanguages();
    const languageSelectionSubscription = this.languageControl.valueChanges.pipe(
      tap((value: string) => {
        this.changeLanguage(value);
      })
    ).subscribe();
    this.subscriptions.add(languageSelectionSubscription);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

}
