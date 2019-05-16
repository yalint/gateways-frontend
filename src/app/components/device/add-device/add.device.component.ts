import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DeviceService} from '../../../services/device.service';
import {FormControl, Validators} from '@angular/forms';
import {Device} from '../../../models/device';

@Component({
  selector: 'app-add.device',
  templateUrl: './add.device.html',
  styleUrls: ['./add.device.css']
})

export class AddDeviceComponent {
  constructor(public dialogRef: MatDialogRef<AddDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public device: Device,
              public deviceService: DeviceService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.deviceService.add(this.device);
  }
}