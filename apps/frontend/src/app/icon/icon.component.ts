import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'hc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IconComponent {
  @Input() icon: PrimeIcons;

  @Input() size: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' = 'lg';

  sizes = {
    sm: '!text-sm',
    base: '!text-base',
    lg: '!text-lg',
    xl: '!text-xl',
    '2xl': '!text-2xl',
    '3xl': '!text-3xl',
  };
}
