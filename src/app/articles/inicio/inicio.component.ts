import { Component } from '@angular/core';
import { Section1Component } from './section-1/section-1.component';
import { Section2Component } from './section-2/section-2.component';
import { Section3Component } from './section-3/section-3.component';
import { EmailSectionComponent } from './email-section/email-section.component';
import { DownloadComponent } from './download/download.component';
import { BannerComponent } from './banner/banner.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { Section4Component } from './section-4/section-4.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent,Section1Component, CommonModule, Section2Component, Section3Component, Section4Component, EmailSectionComponent, DownloadComponent, BannerComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
