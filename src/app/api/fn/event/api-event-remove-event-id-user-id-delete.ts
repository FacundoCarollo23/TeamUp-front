/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ApiEventRemoveEventIdUserIdDelete$Params {
  eventId: number;
  userId: number;
}

export function apiEventRemoveEventIdUserIdDelete(http: HttpClient, rootUrl: string, params: ApiEventRemoveEventIdUserIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiEventRemoveEventIdUserIdDelete.PATH, 'delete');
  if (params) {
    rb.path('eventId', params.eventId, {"style":"simple"});
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

apiEventRemoveEventIdUserIdDelete.PATH = '/api/Event/Remove/{eventId}/{userId}';
