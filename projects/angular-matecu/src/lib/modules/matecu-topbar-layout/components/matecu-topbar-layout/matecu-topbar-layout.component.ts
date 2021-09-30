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
import { FormControl } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { fromEvent, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'matecu-topbar-layout',
  templateUrl: './matecu-topbar-layout.component.html',
  styleUrls: ['./matecu-topbar-layout.component.scss'],
})
export class MatecuTopbarLayoutComponent implements AfterViewInit {
  @HostBinding('class') className = 'matecu-topbar-layout';
  showSearchInput = false;
  search = false;
  searchInput: FormControl = new FormControl();
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
  constructor() {}

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
  onMenuClick(): void {}
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
    const scrollPosition = scrollabe.scrollTop;
    if (scrollPosition > 30) {
      this.className += ' ' + this.scrollingClass;
    }
    if (scrollPosition < 10) {
      const regexp = new RegExp(this.scrollingClass, 'ig');
      this.className = this.className.replace(regexp, '').trim();
    }
  }
}
