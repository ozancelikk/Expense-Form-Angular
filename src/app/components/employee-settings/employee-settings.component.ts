import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.css']
})
export class EmployeeSettingsComponent implements OnInit {

  lang:ILanguage;
  constructor() { 
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }
  ngOnInit(): void {
  }
}
