import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import languageConfig from "../config"
@Injectable({
    "providedIn": "root"
})
export class LanguageService {
    defaultLang: string = "en";
    constructor(public translate: TranslateService) { }
    loadConfig() {
        const translationKeys = Object.keys(languageConfig);
        translationKeys.forEach((langKey) => {
            this.translate.setTranslation(langKey, languageConfig[langKey].config);
        });

        const defaultLanguage = this.getDefaultLanguage();
        this.translate.setDefaultLang(defaultLanguage);
        this.translate.use(defaultLanguage);
    }
    setLanguage(lang: string) {
        if((lang in languageConfig)) {
            this.translate.use(lang);
            localStorage.setItem("lang", lang);
        }
    }
    getDefaultLanguage() {
        const savedLanguage = localStorage.getItem("lang");
        if(savedLanguage && savedLanguage in languageConfig) {
            return savedLanguage;
        }
        return this.defaultLang;
    }
    getCurrentLanguage() {
        return this.translate.currentLang;
    }
    getAvailableLanguages() {
        return Object.keys(languageConfig).map(langKey => languageConfig[langKey]);
    }

}