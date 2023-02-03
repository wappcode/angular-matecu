import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ParamMap } from '@angular/router';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'matecu-topbar-layout',
  templateUrl: './matecu-topbar-layout.component.html',
  styleUrls: ['./matecu-topbar-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule]
})
export class MatecuTopbarLayoutComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') className = 'matecu-topbar-layout';
  showSearchInput = false;
  search = false;
  searchInput: UntypedFormControl = new UntypedFormControl();
  isProminent = false;
  hasTwoRows = false;
  destroySpyScroll$ = new Subject<void>();

  private scrollingClass = 'matecu-topbar-layout--scrolling';
  private prominentClass = 'matecu-topbar-layout--prominent';
  @Input() color = 'primary';
  @Input() set twoRows(value: boolean) {
    this.hasTwoRows = value;
    this.setProminentClassValue()
  }
  @Input() set prominent(value: boolean) {
    this.isProminent = value;
    this.setProminentClassValue();
  }
  constructor() { }

  ngOnDestroy(): void {
    this.destroySpyScroll$.next();
    this.destroySpyScroll$.complete();
  }
  ngAfterViewInit(): void {
    this.destroySpyScroll$.next();
    this.spyScroll().pipe(takeUntil(this.destroySpyScroll$)).subscribe();
  }

  toogleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
  }
  closeSearch(): void {
    this.showSearchInput = false;
    this.searchInput.reset();
  }
  onMenuClick(): void { }

  spyScroll(): Observable<HTMLElement | null> {
    const scrollabes: NodeListOf<HTMLElement> | null = document.querySelectorAll(
      '.matecu-topbar-body'
    );
    if (!scrollabes || scrollabes.length === 0) {
      return of(null);
    }
    const lastindex = scrollabes.length - 1
    const scrollabe = scrollabes[lastindex];
    return fromEvent(scrollabe, 'scroll').pipe(
      tap(() => this.applyScrollStyles(scrollabe)),
      map(() => scrollabe)
    );
  }
  applyScrollStyles(scrollabe: HTMLElement): void {
    if (!scrollabe) {
      return;
    }
    const maxScrollHeight = scrollabe.scrollHeight;
    const screenHeight = screen.availHeight;
    if (screenHeight > maxScrollHeight) {
      return;
    }
    const scrollPosition = scrollabe.scrollTop;
    if (scrollPosition > 20) {
      this.className += ' ' + this.scrollingClass;
    }
    if (scrollPosition < 10) {
      const regexp = new RegExp(this.scrollingClass, 'ig');
      this.className = this.className.replace(regexp, '').trim();
    }
  }
  private setProminentClassValue() {
    if (this.isProminent && !this.hasTwoRows) {
      this.className += ' ' + this.prominentClass;
    } else {
      const regex = new RegExp(this.prominentClass, 'ig');
      this.className = this.className.replace(regex, '').trim();
    }
  }
}
