import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {GatewayService} from '../../../services/gateway.service';

@Component({
  selector: 'app-delete.gateway',
  templateUrl: './delete.gateway.html',
  styleUrls: ['./delete.gateway.css']
})
export class DeleteGatewayComponent {

  constructor(public dialogRef: MatDialogRef<DeleteGatewayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public gatewayService: GatewayService) { }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.gatewayService.delete(this.data.id);
  }
}