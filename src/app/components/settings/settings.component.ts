import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  lang:ILanguage;
  constructor() { 
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }

  ngOnInit(): void {
  }

}
