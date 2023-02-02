import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ParamMap } from '@angular/router';
import { fromEvent, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'matecu-topbar-layout',
  templateUrl: './matecu-topbar-layout.component.html',
  styleUrls: ['./matecu-topbar-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule]
})
export class MatecuTopbarLayoutComponent implements AfterViewInit {
  @HostBinding('class') className = 'matecu-topbar-layout';
  showSearchInput = false;
  search = false;
  searchInput: UntypedFormControl = new UntypedFormControl();
  isProminent = false;
  private scrollingClass = 'matecu-topbar-layout--scrolling';
  private prominentClass = 'matecu-topbar-layout--prominent';
  @Input() color = 'primary';
  @Input() navMenu = true;
  @Input() actionMenu = false;
  @Output() clickNavMenu = new EventEmitter<void>();
  @Output() clickActionMenu = new EventEmitter<void>();
  @Input() set prominent(value: boolean) {
    this.isProminent = value;
    if (value) {
      this.className += ' ' + this.prominentClass;
    } else {
      const regex = new RegExp(this.prominentClass, 'ig');
      this.className = this.className.replace(regex, '').trim();
    }
  }
  constructor() { }

  ngAfterViewInit(): void {
    this.spyScroll().subscribe();
  }

  toogleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
  }
  closeSearch(): void {
    this.showSearchInput = false;
    this.searchInput.reset();
  }
  onMenuClick(): void { }
  onClickNavMenu(): void {
    this.clickNavMenu.emit();
  }
  onClickActionMenu(): void {
    this.clickActionMenu.emit();
  }
  spyScroll(): Observable<HTMLElement | null> {
    const scrollabe: HTMLElement | null = document.querySelector(
      '.matecu-topbar-body'
    );
    if (!scrollabe) {
      return of(null);
    }
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
}
