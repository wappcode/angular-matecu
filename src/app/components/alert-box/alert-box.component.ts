import { Component, OnInit } from '@angular/core';
import { MatecuAlertBoxModule } from '../../../../projects/angular-matecu/src/public-api';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
  imports: [MatecuAlertBoxModule],
})
export class AlertBoxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
