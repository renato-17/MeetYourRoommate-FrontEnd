import {Data} from "@angular/router";

export class Task {
  createdAt: Data;
  updatedAt: Data;
  id: number;
  description: string;
  active: boolean;
}
