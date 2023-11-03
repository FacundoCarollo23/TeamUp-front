/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiEventListGet } from '../fn/event/api-event-list-get';
import { ApiEventListGet$Params } from '../fn/event/api-event-list-get';

@Injectable({ providedIn: 'root' })
export class EventService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiEventListGet()` */
  static readonly ApiEventListGetPath = '/api/Event/List';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListGet$Response(params?: ApiEventListGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventListGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListGet(params?: ApiEventListGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventListGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
