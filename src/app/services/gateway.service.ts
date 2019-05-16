import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Gateway} from '../models/gateway';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable()
export class GatewayService {
  private readonly API_URL = environment+'/gateways/';

  dataChange: BehaviorSubject<Gateway[]> = new BehaviorSubject<Gateway[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Gateway[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  getAll(): void {
        this.httpClient.get<Gateway[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        }
    );
  }
  add(gateway: Gateway): void {
        this.httpClient.post(this.API_URL, gateway).subscribe(data => {
            this.dialogData = data;
        },
        (err: HttpErrorResponse) => {}
    );
   }
    update(gateway: Gateway): void {
        this.httpClient.put(this.API_URL + gateway.uid, gateway).subscribe(data => {
            this.dialogData = gateway;
        },
        (err: HttpErrorResponse) => {}
    );
  }
  delete(uid: String): void {
        this.httpClient.delete(this.API_URL + uid).subscribe(data => {
            console.log(data);
        },
        (err: HttpErrorResponse) => {}
    );
  }
}