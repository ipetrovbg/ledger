import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html'
})
export class AppButtonComponent {
  @Input() icon: string;
  @Input() loading: boolean;
  @Input() iconSize: string;
  @Input() text: string;
}
