import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [RouterModule],
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
