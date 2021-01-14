import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatecuSpinnerService {
  private active$ = new BehaviorSubject<boolean>(false);
  private requestsKeys: string[] = [];
  constructor() {}

  watch(): Observable<boolean> {
    return this.active$.pipe();
  }
  add(customKey?: string): string {
    const key = (typeof(customKey) === 'string' && customKey.length > 0) ? customKey : this.createKey();
    this.requestsKeys.push(key);
    this.updateStatus();
    return key;
  }
  remove(key: string): void {
    this.requestsKeys = this.requestsKeys.filter(
      (requestKey) => requestKey !== key
    );
    this.updateStatus();
  }
  clear(): void {
    this.requestsKeys = [];
    this.updateStatus();
  }
  private updateStatus(): void {
    const active = this.requestsKeys.length > 0;
    this.active$.next(active);
  }
  private createKey(): string {
    const time = new Date().getTime();
    const complement = Math.random();
    return `${time}__${complement}`;
  }
}
