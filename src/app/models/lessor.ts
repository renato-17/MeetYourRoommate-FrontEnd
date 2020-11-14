import {DatePipe} from '@angular/common';

export class Lessor {
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
  gender: string;
  birthdate: Date = new Date();
  address: string;
  getBPremium: boolean;
}
