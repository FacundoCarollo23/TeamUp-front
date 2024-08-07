/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiEventAddToEventEventIdUserIdPost } from '../fn/event/api-event-add-to-event-event-id-user-id-post';
import { ApiEventAddToEventEventIdUserIdPost$Params } from '../fn/event/api-event-add-to-event-event-id-user-id-post';
import { apiEventCreatePost } from '../fn/event/api-event-create-post';
import { ApiEventCreatePost$Params } from '../fn/event/api-event-create-post';
import { apiEventDeleteIdDelete } from '../fn/event/api-event-delete-id-delete';
import { ApiEventDeleteIdDelete$Params } from '../fn/event/api-event-delete-id-delete';
import { apiEventEditPut } from '../fn/event/api-event-edit-put';
import { ApiEventEditPut$Params } from '../fn/event/api-event-edit-put';
import { apiEventGetByIdIdGet } from '../fn/event/api-event-get-by-id-id-get';
import { ApiEventGetByIdIdGet$Params } from '../fn/event/api-event-get-by-id-id-get';
import { apiEventGetByWordWordGet } from '../fn/event/api-event-get-by-word-word-get';
import { ApiEventGetByWordWordGet$Params } from '../fn/event/api-event-get-by-word-word-get';
import { apiEventListAcceptedByUserUserIdGet } from '../fn/event/api-event-list-accepted-by-user-user-id-get';
import { ApiEventListAcceptedByUserUserIdGet$Params } from '../fn/event/api-event-list-accepted-by-user-user-id-get';
import { apiEventListCreatedByUserUserIdGet } from '../fn/event/api-event-list-created-by-user-user-id-get';
import { ApiEventListCreatedByUserUserIdGet$Params } from '../fn/event/api-event-list-created-by-user-user-id-get';
import { apiEventListFeaturedGet } from '../fn/event/api-event-list-featured-get';
import { ApiEventListFeaturedGet$Params } from '../fn/event/api-event-list-featured-get';
import { apiEventListGet } from '../fn/event/api-event-list-get';
import { ApiEventListGet$Params } from '../fn/event/api-event-list-get';
import { apiEventListRecentGet } from '../fn/event/api-event-list-recent-get';
import { ApiEventListRecentGet$Params } from '../fn/event/api-event-list-recent-get';
import { apiEventRemoveFromEventEventIdUserIdDelete } from '../fn/event/api-event-remove-from-event-event-id-user-id-delete';
import { ApiEventRemoveFromEventEventIdUserIdDelete$Params } from '../fn/event/api-event-remove-from-event-event-id-user-id-delete';

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

  /** Path part for operation `apiEventListRecentGet()` */
  static readonly ApiEventListRecentGetPath = '/api/Event/ListRecent';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventListRecentGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListRecentGet$Response(params?: ApiEventListRecentGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventListRecentGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventListRecentGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListRecentGet(params?: ApiEventListRecentGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventListRecentGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventListFeaturedGet()` */
  static readonly ApiEventListFeaturedGetPath = '/api/Event/ListFeatured';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventListFeaturedGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListFeaturedGet$Response(params?: ApiEventListFeaturedGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventListFeaturedGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventListFeaturedGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListFeaturedGet(params?: ApiEventListFeaturedGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventListFeaturedGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventListCreatedByUserUserIdGet()` */
  static readonly ApiEventListCreatedByUserUserIdGetPath = '/api/Event/ListCreatedByUser/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventListCreatedByUserUserIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListCreatedByUserUserIdGet$Response(params: ApiEventListCreatedByUserUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventListCreatedByUserUserIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventListCreatedByUserUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListCreatedByUserUserIdGet(params: ApiEventListCreatedByUserUserIdGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventListCreatedByUserUserIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventListAcceptedByUserUserIdGet()` */
  static readonly ApiEventListAcceptedByUserUserIdGetPath = '/api/Event/ListAcceptedByUser/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventListAcceptedByUserUserIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListAcceptedByUserUserIdGet$Response(params: ApiEventListAcceptedByUserUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventListAcceptedByUserUserIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventListAcceptedByUserUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventListAcceptedByUserUserIdGet(params: ApiEventListAcceptedByUserUserIdGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventListAcceptedByUserUserIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventGetByWordWordGet()` */
  static readonly ApiEventGetByWordWordGetPath = '/api/Event/GetByWord/{word}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventGetByWordWordGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGetByWordWordGet$Response(params: ApiEventGetByWordWordGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventGetByWordWordGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventGetByWordWordGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGetByWordWordGet(params: ApiEventGetByWordWordGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventGetByWordWordGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventGetByIdIdGet()` */
  static readonly ApiEventGetByIdIdGetPath = '/api/Event/GetById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventGetByIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGetByIdIdGet$Response(params: ApiEventGetByIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventGetByIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventGetByIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventGetByIdIdGet(params: ApiEventGetByIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.apiEventGetByIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventCreatePost()` */
  static readonly ApiEventCreatePostPath = '/api/Event/Create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventCreatePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiEventCreatePost$Response(params?: ApiEventCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventCreatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventCreatePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiEventCreatePost(params?: ApiEventCreatePost$Params, context?: HttpContext): Observable<void> {
    return this.apiEventCreatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventEditPut()` */
  static readonly ApiEventEditPutPath = '/api/Event/Edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventEditPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiEventEditPut$Response(params?: ApiEventEditPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventEditPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventEditPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiEventEditPut(params?: ApiEventEditPut$Params, context?: HttpContext): Observable<void> {
    return this.apiEventEditPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventDeleteIdDelete()` */
  static readonly ApiEventDeleteIdDeletePath = '/api/Event/Delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventDeleteIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventDeleteIdDelete$Response(params: ApiEventDeleteIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventDeleteIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventDeleteIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventDeleteIdDelete(params: ApiEventDeleteIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiEventDeleteIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventAddToEventEventIdUserIdPost()` */
  static readonly ApiEventAddToEventEventIdUserIdPostPath = '/api/Event/addToEvent/{eventId}/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventAddToEventEventIdUserIdPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventAddToEventEventIdUserIdPost$Response(params: ApiEventAddToEventEventIdUserIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventAddToEventEventIdUserIdPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventAddToEventEventIdUserIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventAddToEventEventIdUserIdPost(params: ApiEventAddToEventEventIdUserIdPost$Params, context?: HttpContext): Observable<void> {
    return this.apiEventAddToEventEventIdUserIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiEventRemoveFromEventEventIdUserIdDelete()` */
  static readonly ApiEventRemoveFromEventEventIdUserIdDeletePath = '/api/Event/RemoveFromEvent/{eventId}/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiEventRemoveFromEventEventIdUserIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventRemoveFromEventEventIdUserIdDelete$Response(params: ApiEventRemoveFromEventEventIdUserIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiEventRemoveFromEventEventIdUserIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiEventRemoveFromEventEventIdUserIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiEventRemoveFromEventEventIdUserIdDelete(params: ApiEventRemoveFromEventEventIdUserIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiEventRemoveFromEventEventIdUserIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
