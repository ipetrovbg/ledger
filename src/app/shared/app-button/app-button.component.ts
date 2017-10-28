import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html'
})
export class AppButtonComponent {
  @Input() loading: boolean;
  @Input() iconSize: string = '20';
  @Input() text: string;
  @Input() disabled: boolean;
}
