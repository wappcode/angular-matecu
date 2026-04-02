import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  effect,
  signal,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'matecu-topbar-layout',
  templateUrl: './matecu-topbar-layout.component.html',
  styleUrls: ['./matecu-topbar-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
})
export class MatecuTopbarLayoutComponent implements AfterViewInit, OnDestroy {
  private _scrolled = signal(false);

  get scrolled() {
    return this._scrolled();
  }
  set scrolled(value: boolean) {
    this._scrolled.set(value);
    this.className = this.className.replace(/scrolled/g, '').trim();
    if (this.scrolled) {
      this.className = `${this.className} scrolled`;
    }
  }
  private destroy$ = new Subject<void>();

  mobileStyle = input(false);
  @Output() mobileStyleChange = new EventEmitter<boolean>();
  mobileWidth = input(768);
  @Output() whenResize = new EventEmitter<number>();

  prominent = input(false);

  @HostBinding('class') className = 'matecu-topbar-layout';
  @ViewChild('mtbBody') bodyElement?: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone,
  ) {
    effect(() => {
      const prominentValue = this.prominent();
      this.className = this.className.replace(/prominent/g, '').trim();
      if (prominentValue) {
        this.className = `${this.className} prominent`;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private spyScroll(scrollabe: HTMLElement) {
    if (!scrollabe) {
      return;
    }
    const maxScrollHeight = scrollabe.scrollHeight;
    const scrollableHeight = scrollabe.clientHeight;
    if (scrollableHeight > maxScrollHeight) {
      return;
    }
    const scrollPosition = scrollabe.scrollTop;
    this.scrolled = scrollPosition > 20;
  }
  ngAfterViewInit(): void {
    const layoutElement = this.elementRef.nativeElement;
    const resizeObserver = new ResizeObserver(() => {
      const width = layoutElement?.clientWidth;
      if (!width) {
        return;
      }
      const isMobileStyle = width <= this.mobileWidth();
      this.zone.run(() => {
        this.mobileStyleChange.emit(isMobileStyle);
        this.whenResize.emit(width);
      });
    });
    resizeObserver.observe(layoutElement!);
    this.destroy$.pipe(tap(() => resizeObserver.disconnect())).subscribe();
    if (this.bodyElement) {
      fromEvent(this.bodyElement.nativeElement, 'scroll')
        .pipe(
          tap(() => this.spyScroll(this.bodyElement?.nativeElement!)),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }
  scrollTop() {
    if (!this.bodyElement) {
      return;
    }
    this.bodyElement.nativeElement.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
