import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'matecu-topbar-body',
  templateUrl: './matecu-topbar-body.component.html',
  styleUrls: ['./matecu-topbar-body.component.scss'],
})
export class MatecuTopbarBodyComponent implements OnInit {
  @HostBinding('class') className = 'matecu-topbar-body';
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  scrollTop(): void {
    const element = this.elementRef.nativeElement;
    if (!!element) {
      element.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
