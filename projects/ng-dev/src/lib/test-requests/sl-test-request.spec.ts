import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestRequest } from '@angular/common/http/testing';
import { noop } from '@s-libs/micro-dash';
import { Subject } from 'rxjs';
import { AngularContext } from '../angular-context';
import { expectSingleCallAndReset } from '../spies';
import { expectRequest } from './expect-request';
import { SlTestRequest } from './sl-test-request';

describe('SlTestRequest', () => {
  describe('.request', () => {
    it('is available', () => {
      const httpRequest = new HttpRequest('GET', 'url');
      const req = new SlTestRequest(
        new TestRequest(httpRequest, new Subject()),
      );
      expect(req.request).toBe(httpRequest);
    });
  });

  describe('.flush()', () => {
    it('resolves the request with the given body and options', () => {
      const ctx = new AngularContext();
      ctx.run(() => {
        const spy = jasmine.createSpy();
        ctx.inject(HttpClient).get('a url').subscribe(spy);
        const req = expectRequest('GET', 'a url');

        const body = 'the body';
        req.flush(body);

        expectSingleCallAndReset(spy, body);
      });
    });

    it('passes along other arguments', () => {
      const ctx = new AngularContext();
      ctx.run(() => {
        const spy = jasmine.createSpy();
        ctx
          .inject(HttpClient)
          .request('GET', 'a url', { observe: 'response' })
          .subscribe(spy);
        const req = expectRequest('GET', 'a url');

        req.flush('', { status: 249, statusText: '' });

        const resp: HttpResponse<unknown> = spy.calls.argsFor(0)[0];

        expect(resp.status).toBe(249);
      });
    });

    it('runs tick if an AngularContext is in use', () => {
      const ctx = new AngularContext();
      const spy = spyOn(ctx, 'tick');
      ctx.run(() => {
        ctx.inject(HttpClient).get('a url').subscribe();
        const req = expectRequest('GET', 'a url');

        req.flush('the body');

        expectSingleCallAndReset(spy);
      });
    });
  });

  describe('.flushError()', () => {
    it('rejects the request with the given args', () => {
      const ctx = new AngularContext();
      ctx.run(() => {
        const spy = jasmine.createSpy();
        ctx.inject(HttpClient).get('a url').subscribe({ error: spy });
        const req = expectRequest('GET', 'a url');

        req.flushError(123, { statusText: 'bad', body: 'stop it' });

        const resp: HttpErrorResponse = spy.calls.argsFor(0)[0];
        expect(resp.status).toBe(123);
        expect(resp.statusText).toBe('bad');
        expect(resp.error).toBe('stop it');
      });
    });

    it('has good default args', () => {
      const ctx = new AngularContext();
      ctx.run(() => {
        const spy = jasmine.createSpy();
        ctx.inject(HttpClient).get('a url').subscribe({ error: spy });
        const req = expectRequest('GET', 'a url');

        req.flushError();

        const resp: HttpErrorResponse = spy.calls.argsFor(0)[0];
        expect(resp.status).toBe(500);
        expect(resp.statusText).toBe('simulated test error');
        expect(resp.error).toBeNull();
      });
    });

    it('runs tick if an AngularContext is in use', () => {
      const ctx = new AngularContext();
      const spy = spyOn(ctx, 'tick');
      ctx.run(() => {
        ctx.inject(HttpClient).get('a url').subscribe({ error: noop });
        const req = expectRequest('GET', 'a url');

        req.flushError();

        expectSingleCallAndReset(spy);
      });
    });
  });

  describe('.isCancelled()', () => {
    it('returns whether the request has been cancelled', () => {
      const ctx = new AngularContext();
      ctx.run(() => {
        const subscription = ctx.inject(HttpClient).get('a url').subscribe();
        const req = expectRequest('GET', 'a url');

        expect(req.isCancelled()).toBe(false);
        subscription.unsubscribe();
        expect(req.isCancelled()).toBe(true);
      });
    });
  });

  describe('.tickIfPossible()', () => {
    it('gracefully handles when there is no AngularContext', () => {
      const httpRequest = new HttpRequest('GET', 'url');
      const req = new SlTestRequest(
        new TestRequest(httpRequest, new Subject()),
      );
      expect(() => {
        req.flush('');
      }).not.toThrowError();
    });
  });
});
