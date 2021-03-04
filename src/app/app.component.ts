import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {       
  sizeOptions = [
    {
      unit: "KB",
      multiplier: 10E3
    },
    {
      unit: "MB",
      multiplier: 10E6
    },
    {
      unit: "GB",
      multiplier: 10E9
    },
    {
      unit: "TB",
      multiplier: 10E12
    }
  ];
  speedOptions = [
    {
      unit: "Kbps",
      multiplier: 10E3
    },
    {
      unit: "Mbps",
      multiplier: 10E6
    },
    {
      unit: "Gbps",
      multiplier: 10E9
    },
    {
      unit: "Tbps",
      multiplier: 10E12
    }
  ];
  result = "";
  calculatorForm: FormGroup;
  constructor(
    public languageService: LanguageService,
    private fb: FormBuilder
    ) {
    const defaultSizeUnitOption = this.sizeOptions[0];
    const defaultSpeedUnitOption = this.speedOptions[0];
    this.calculatorForm = this.fb.group({
      "size": [""],
      "sizeUnit": [defaultSizeUnitOption],
      "speed": [""],
      "speedUnit": [defaultSpeedUnitOption]
    });
  }
  ngOnInit() {
    this.languageService.loadConfig();
  }
  isFormEmpty() {
    const { size, speed } = this.calculatorForm.value;
    return size === "" || speed === "";
  }
  calculateTime() {
    const { size, sizeUnit, speed, speedUnit } = this.calculatorForm.value;
    const time = (parseFloat(size) * sizeUnit.multiplier) / (parseFloat(speed) * speedUnit.multiplier / 8);
    const duration = this.getDuration(time);
    const formattedDuration = this.formatDuration(duration);
    this.result = formattedDuration;
  }
  getDuration(duration: number) {
    let days = duration / (3600 * 24);
    let hours = (duration % (3600 * 24)) / 3600;
    let minutes = ((duration % (3600 * 24)) % 3600) / 60;
    let seconds = (((duration % (3600 * 24)) % 3600) % 60) / 60;
    return {
      days: Math.floor(days),
      hours: Math.floor(hours),
      minutes: Math.floor(minutes),
      seconds: Math.floor(seconds)
    }
  }
  formatDuration(duration: {days: number, hours: number, minutes: number, seconds: number}) {
    let str = "";
    if(duration.days > 0) {
      str += duration.days + " d ";
    }
    if(duration.hours > 0) {
      str += duration.hours + " h ";
    }
    if(duration.minutes > 0) {
      str += duration.minutes + " m ";
    }
    str += duration.seconds + " s ";
    return str;
  }
}
