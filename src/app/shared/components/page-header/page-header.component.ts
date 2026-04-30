import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() buttonLabel?: string;
  @Input() buttonIcon?: string;
  @Input() buttonColor?: string;
  @Input() showBackButton: boolean = false;

  @Output() actionClick = new EventEmitter<void>();
  @Output() backClick = new EventEmitter<void>();
}
