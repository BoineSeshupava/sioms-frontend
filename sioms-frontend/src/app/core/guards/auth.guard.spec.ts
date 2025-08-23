import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should implement canActivate', () => {
    const route: any = {}; // mock ActivatedRouteSnapshot
    const state: any = {}; // mock RouterStateSnapshot
    expect(typeof guard.canActivate).toBe('function');
    // Optionally, test the return value if you have logic to test
    // expect(guard.canActivate(route, state)).toBe(/* expected value */);
  });
});
