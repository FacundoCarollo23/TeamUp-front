/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ApiEventListAcceptedByUserUserIdGet$Params {
  userId: number;
}

export function apiEventListAcceptedByUserUserIdGet(http: HttpClient, rootUrl: string, params: ApiEventListAcceptedByUserUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiEventListAcceptedByUserUserIdGet.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

apiEventListAcceptedByUserUserIdGet.PATH = '/api/Event/ListAcceptedByUser/{userId}';
