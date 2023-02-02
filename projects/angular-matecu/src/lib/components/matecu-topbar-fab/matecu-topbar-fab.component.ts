import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'matecu-topbar-fab',
  templateUrl: './matecu-topbar-fab.component.html',
  styleUrls: ['./matecu-topbar-fab.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class MatecuTopbarFabComponent implements OnInit {
  @Input() color = 'accent';
  @Input() extended = false;
  @Output() clickAction = new EventEmitter<void>();
  constructor() { }

  @HostBinding('class') className = 'matecu-topbar-fab';
  ngOnInit(): void { }

  onClickAction(): void {
    this.clickAction.emit();
  }
}
