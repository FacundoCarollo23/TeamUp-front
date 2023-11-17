import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { enableProdMode } from '@angular/core';


registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRGVGfV5yd0VDal9RTndWUj0eQnxTdEZiWH5YcXNWRmJdWUB1Vw==")
// if (_isTestEnvironment.production) {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
