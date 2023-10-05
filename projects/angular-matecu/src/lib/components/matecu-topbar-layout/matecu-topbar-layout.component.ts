import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
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
  private _scrolled = false;
  private _prominent = false;
  get scrolled() {
    return this._scrolled;
  }
  set scrolled(value: boolean) {
    this._scrolled = value;
    this.className = this.className.replace(/scrolled/g, '').trim();
    if (this.scrolled) {
      this.className = `${this.className} scrolled`;
    }
  }
  private destroy$ = new Subject<void>();
  @Input() mobileStyle = false;
  @Input() mobileWidth = 768;
  @Output() mobileStyleChange = new EventEmitter<boolean>();
  @Input() get prominent() {
    return this._prominent;
  }
  set prominent(value: boolean) {
    this._prominent = value;
    this.className = this.className.replace(/prominent/g, '').trim();
    if (this.prominent) {
      this.className = `${this.className} prominent`;
    }
  }
  @HostBinding('class') className = 'matecu-topbar-layout';
  @ViewChild('mtbBody') bodyElement?: ElementRef;

  constructor(private elementRef: ElementRef) {}
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
      this.mobileStyle = width <= this.mobileWidth;
      this.mobileStyleChange.emit(this.mobileStyle);
    });
    resizeObserver.observe(layoutElement!);
    this.destroy$.pipe(tap(() => resizeObserver.disconnect())).subscribe();
    if (this.bodyElement) {
      fromEvent(this.bodyElement.nativeElement, 'scroll')
        .pipe(
          tap(() => this.spyScroll(this.bodyElement?.nativeElement!)),
          takeUntil(this.destroy$)
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
