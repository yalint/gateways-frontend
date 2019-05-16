import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DeviceService} from '../../../services/device.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update.device',
  templateUrl: './update.device.html',
  styleUrls: ['./update.device.css']
})
export class UpdateDeviceComponent {

  constructor(public dialogRef: MatDialogRef<UpdateDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public deviceService: DeviceService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }

  submit() {}

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.deviceService.update(this.data);
  }
}