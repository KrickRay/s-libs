import {
  SlDialogHarness,
  SlDialogModule,
  SlDialogService,
} from '@s-libs/ng-mat-core';

describe('ng-mat-core', () => {
  it('has SlDialogHarness', () => {
    expect(SlDialogHarness).toBeDefined();
  });

  it('has SlDialogModule', () => {
    expect(SlDialogModule).toBeDefined();
  });

  it('has SlDialogService', () => {
    expect(SlDialogService).toBeDefined();
  });
});
