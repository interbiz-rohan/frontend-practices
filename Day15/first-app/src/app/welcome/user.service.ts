import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  getGreeting() {
    return 'You have 3 notifications.';
  }
}
