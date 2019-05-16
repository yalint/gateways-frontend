import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DeviceService} from '../../../services/device.service';

@Component({
  selector: 'app-delete.device',
  templateUrl: './delete.device.html',
  styleUrls: ['./delete.device.css']
})
export class DeleteDeviceComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public deviceService: DeviceService) { }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.deviceService.delete(this.data.id);
  }
}