/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiEventGet } from '../fn/event/api-event-get';
import { ApiEventGet$Params } from '../fn/event/api-event-get';

@Injectable({ providedIn: 'root' })
export class EventService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiEventGet()` */
  static readonly ApiEventGetPath = '/api/Event';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGet$Response(params?: ApiEventGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGet(params?: ApiEventGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
