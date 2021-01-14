import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'matecu-spinner',
  templateUrl: './matecu-spinner.component.html',
  styleUrls: ['./matecu-spinner.component.css']
})
export class MatecuSpinnerComponent {

  private hiddenClass = ' matecu-spinner--hidden';
  private activeCache = false;
  @HostBinding('class') className = 'matecu-spinner';
  get active(): boolean {
    return this.activeCache;
  }
  @Input() set active(value: boolean) {
    this.activeCache = value;
    this.className = value
      ? this.className.replace(this.hiddenClass, '')
      : (this.className += this.hiddenClass);
  }
  constructor() {}
}
