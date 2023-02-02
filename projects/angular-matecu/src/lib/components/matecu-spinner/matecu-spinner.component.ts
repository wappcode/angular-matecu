import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatecuSpinnerService } from '../../services/matecu-spinner.service';
@Component({
  selector: 'matecu-spinner',
  templateUrl: './matecu-spinner.component.html',
  styleUrls: ['./matecu-spinner.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MatecuSpinnerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private hiddenClass = 'matecu-spinner--hidden';
  private activeCache = false;
  @HostBinding('class') className = 'matecu-spinner';
  @Input() color = '#2196F3';
  @Input() global = false;
  get active(): boolean {
    return this.activeCache;
  }
  @Input() set active(value: boolean) {
    if (this.global) {
      return;
    }
    this.activeCache = value;
    this.className = value
      ? this.className.replace(` ${this.hiddenClass}`, '')
      : (this.className += ` ${this.hiddenClass}`);
  }
  @Input() size = '70px';

  constructor(
    private spinnerService: MatecuSpinnerService,
  ) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    if (this.global) {
      this.spinnerService.watch().pipe(
        tap(value => this.activeCache = value),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }
}
