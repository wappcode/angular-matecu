import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  input,
  effect,
  signal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatecuSpinnerService } from '../../services/matecu-spinner.service';
@Component({
  selector: 'matecu-spinner',
  templateUrl: './matecu-spinner.component.html',
  styleUrls: ['./matecu-spinner.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MatecuSpinnerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private hiddenClass = 'matecu-spinner--hidden';
  private activeCache = signal(false);

  @HostBinding('class') className = 'matecu-spinner';

  color = input('#2196F3');
  global = input(false);
  active = input(false);
  size = input('70px');

  get isActive(): boolean {
    return this.activeCache();
  }

  constructor(
    private spinnerService: MatecuSpinnerService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      if (this.global()) {
        return;
      }
      const value = this.active();
      this.activeCache.set(value);
      this.className = value
        ? this.className.replace(` ${this.hiddenClass}`, '')
        : (this.className += ` ${this.hiddenClass}`);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    if (this.global()) {
      this.spinnerService
        .watch()
        .pipe(
          tap((value) => this.activeCache.set(value)),
          tap(() => this.cdr.detectChanges()),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }
}
