import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Download/Upload Time calculator';
  sizeOptions = [
    {
      unit: "KiB",
      multiplier: Math.pow(2, 10)
    },
    {
      unit: "MiB",
      multiplier: Math.pow(2, 20)
    },
    {
      unit: "GiB",
      multiplier: Math.pow(2, 30)
    },
    {
      unit: "TiB",
      multiplier: Math.pow(2, 40)
    }
  ];
  speedOptions = [
    {
      unit: "Kbit/s",
      multiplier: 10E3
    },
    {
      unit: "Mbit/s",
      multiplier: 10E6
    },
    {
      unit: "Gbit/s",
      multiplier: 10E9
    },
    {
      unit: "Tbit/s",
      multiplier: 10E12
    }
  ];
  result = "";
  calculatorForm: FormGroup;
  constructor(private fb: FormBuilder) {
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

  }
  isFormEmpty() {
    const { size, speed } = this.calculatorForm.value;
    return size === "" || speed === "";
  }
  calculateTime() {
    const { size, sizeUnit, speed, speedUnit } = this.calculatorForm.value;
    const time = (parseFloat(size) * sizeUnit.multiplier) / (parseFloat(speed) * speedUnit.multiplier / 8);
    this.result = time.toFixed(2);
  }
}
