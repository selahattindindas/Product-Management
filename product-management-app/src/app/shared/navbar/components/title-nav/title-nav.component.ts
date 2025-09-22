import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  selector: 'app-title-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-nav.component.html',
  styleUrl: './title-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleNavComponent {
  private readonly titleService = inject(TitleService);
  
  readonly pageTitle = this.titleService.title;
  readonly breadcrumbTitle = this.titleService.breadcrumbTitle;
}
