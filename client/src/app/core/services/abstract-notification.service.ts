import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DesktopNotificationService } from './desktop-notification.service';
import { MobileNotificationService } from './mobile-notification.service';
import { WebNotificationService } from './web-notification.service';

export function notificationFactory(
  toastrService: ToastrService
): AbstractNotificationService {
  if (environment.desktop) {
    return new DesktopNotificationService();
    //return new WebNotificationService(toastrService);
  }

  if (environment.mobile) {
    return new MobileNotificationService();
  }

  return new WebNotificationService(toastrService);
}

export interface INotificationService {
  showError(title: string, message: string, icon?: string);

  showInfo(title: string, message: string, icon?: string);

  showSuccess(title: string, message: string, icon?: string);

  showWarning(title: string, message: string, icon?: string);
}

@Injectable({
  providedIn: 'root',
  useFactory: notificationFactory,
  deps: [ToastrService]
})
export abstract class AbstractNotificationService
  implements INotificationService {
  abstract showError(title: string, message: string, icon?: string);

  abstract showInfo(title: string, message: string, icon?: string);

  abstract showSuccess(title: string, message: string, icon?: string);

  abstract showWarning(title: string, message: string, icon?: string);
}
