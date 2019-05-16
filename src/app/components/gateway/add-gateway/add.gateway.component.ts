import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {GatewayService} from '../../../services/gateway.service';
import {FormControl, Validators} from '@angular/forms';
import {Gateway} from '../../../models/gateway';

@Component({
  selector: 'app-add.gateway',
  templateUrl: './add.gateway.html',
  styleUrls: ['./add.gateway.css']
})

export class AddGatewayComponent {
  constructor(public dialogRef: MatDialogRef<AddGatewayComponent>,
              @Inject(MAT_DIALOG_DATA) public gateway: Gateway,
              public gatewayService: GatewayService) { }

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
    this.gatewayService.add(this.gateway);
  }
}