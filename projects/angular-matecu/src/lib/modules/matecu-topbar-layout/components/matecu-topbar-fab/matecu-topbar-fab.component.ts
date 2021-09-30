import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'matecu-topbar-fab',
  templateUrl: './matecu-topbar-fab.component.html',
  styleUrls: ['./matecu-topbar-fab.component.scss'],
})
export class MatecuTopbarFabComponent implements OnInit {
  @Input() color = 'accent';
  @Input() extended = false;
  @Output() clickAction = new EventEmitter<void>();
  constructor() {}

  @HostBinding('class') className = 'matecu-topbar-fab';
  ngOnInit(): void {}

  onClickAction(): void {
    this.clickAction.emit();
  }
}
