import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {GatewayService} from '../../../services/gateway.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update.gateway',
  templateUrl: './update.gateway.html',
  styleUrls: ['./update.gateway.css']
})
export class UpdateGatewayComponent {

  constructor(public dialogRef: MatDialogRef<UpdateGatewayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public gatewayService: GatewayService) { }

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
    this.gatewayService.update(this.data);
  }
}