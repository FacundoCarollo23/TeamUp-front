/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiEventsCommentListGet } from '../fn/events-comment/api-events-comment-list-get';
import { ApiEventsCommentListGet$Params } from '../fn/events-comment/api-events-comment-list-get';

@Injectable({ providedIn: 'root' })
export class EventsCommentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiEventsCommentListGet()` */
  static readonly ApiEventsCommentListGetPath = '/api/EventsComment/List';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventsCommentListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventsCommentListGet$Response(params?: ApiEventsCommentListGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventsCommentListGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventsCommentListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventsCommentListGet(params?: ApiEventsCommentListGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventsCommentListGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
