import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Device} from '../models/device';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DeviceService {
  private readonly API_URL = environment.api+ '/devices/';

  dataChange: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Device[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  getAll(): void {
        this.httpClient.get<Device[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        }
    );
  }
  add(device: Device): void {
        this.httpClient.post(this.API_URL, device).subscribe(data => {
            this.dialogData = data;
        },
        (err: HttpErrorResponse) => {}
    );
   }
    update(device: Device): void {
        this.httpClient.put(this.API_URL + device.uid, device).subscribe(data => {
            this.dialogData = device;
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