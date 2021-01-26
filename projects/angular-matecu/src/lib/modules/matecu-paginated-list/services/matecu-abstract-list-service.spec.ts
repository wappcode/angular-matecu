import { TestBed } from '@angular/core/testing';
import { switchMap} from 'rxjs/operators';
import { MatecuAbstractListExtendedService } from '../test-utilities/list-service';



describe('MatecuAbstractListService', () => {
  let service: MatecuAbstractListExtendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatecuAbstractListExtendedService);
  });

  it('debió haberse creado', () => {
    expect(service).toBeTruthy();
  });

  it('debió inicializarse y obtener los datos',  (done: DoneFn) => {
    service.init(1).pipe(
      switchMap(() => service.count$)
    ).subscribe(total => {
      expect(total).toEqual(2);
      done();
    });
  });


});
