/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiUserCreatePost } from '../fn/user/api-user-create-post';
import { ApiUserCreatePost$Params } from '../fn/user/api-user-create-post';
import { apiUserDeleteIdDelete } from '../fn/user/api-user-delete-id-delete';
import { ApiUserDeleteIdDelete$Params } from '../fn/user/api-user-delete-id-delete';
import { apiUserEditPut } from '../fn/user/api-user-edit-put';
import { ApiUserEditPut$Params } from '../fn/user/api-user-edit-put';
import { apiUserListGet } from '../fn/user/api-user-list-get';
import { ApiUserListGet$Params } from '../fn/user/api-user-list-get';
import { apiUserLoginPost } from '../fn/user/api-user-login-post';
import { ApiUserLoginPost$Params } from '../fn/user/api-user-login-post';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiUserListGet()` */
  static readonly ApiUserListGetPath = '/api/User/List';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserListGet$Response(params?: ApiUserListGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUserListGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserListGet(params?: ApiUserListGet$Params, context?: HttpContext): Observable<void> {
    return this.apiUserListGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiUserLoginPost()` */
  static readonly ApiUserLoginPostPath = '/api/User/Login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserLoginPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserLoginPost$Response(params?: ApiUserLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUserLoginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserLoginPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserLoginPost(params?: ApiUserLoginPost$Params, context?: HttpContext): Observable<void> {
    return this.apiUserLoginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiUserCreatePost()` */
  static readonly ApiUserCreatePostPath = '/api/User/Create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserCreatePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserCreatePost$Response(params?: ApiUserCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUserCreatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserCreatePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserCreatePost(params?: ApiUserCreatePost$Params, context?: HttpContext): Observable<void> {
    return this.apiUserCreatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiUserEditPut()` */
  static readonly ApiUserEditPutPath = '/api/User/Edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserEditPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserEditPut$Response(params?: ApiUserEditPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUserEditPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserEditPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserEditPut(params?: ApiUserEditPut$Params, context?: HttpContext): Observable<void> {
    return this.apiUserEditPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiUserDeleteIdDelete()` */
  static readonly ApiUserDeleteIdDeletePath = '/api/User/Delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserDeleteIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDeleteIdDelete$Response(params: ApiUserDeleteIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUserDeleteIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserDeleteIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDeleteIdDelete(params: ApiUserDeleteIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiUserDeleteIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
