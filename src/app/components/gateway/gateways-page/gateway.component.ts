import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {GatewayService} from '../../../services/gateway.service';
import {GatewayDataSource} from '../../../datasource/GatewayDataSource';
import {fromEvent} from 'rxjs';
import {AddGatewayComponent} from '../add-gateway/add.gateway.component';
import {UpdateGatewayComponent} from '../update-gateway/update.gateway.component';
import {DeleteGatewayComponent} from '../delete-gateway/delete.gateway.component';
import { Gateway } from 'src/app/models/gateway';
@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {
  displayedColumns = ['id', 'name', 'ipv4', 'created_at', 'updated_at', 'actions'];
  gatewayData: GatewayService | null;
  dataSource: GatewayDataSource | null;
  index: number;
  id: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(public httpClient: HttpClient, public dialog: MatDialog, public gatewayService: GatewayService) { }
    ngOnInit() {
      this.listGateways();
    }
  
    refresh() {
      this.listGateways();
    }

    addNew(gateway: Gateway) {
      const dialogRef = this.dialog.open(AddGatewayComponent, {
        data: {gateway: gateway }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.gatewayData.dataChange.value.push(this.gatewayService.getDialogData());
          this.refreshTable();
        }
      });
    }

    update(i: number, uid: string, name: string, ipv4: string) {
      this.id = uid;
      this.index = i;
      const dialogRef = this.dialog.open(UpdateGatewayComponent, {
        data: {uid: uid, name: name, ipv4: ipv4}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.gatewayData.dataChange.value.findIndex(x => x.uid === this.id);
          this.gatewayData.dataChange.value[foundIndex] = this.gatewayService.getDialogData();
          this.refreshTable();
        }
      });
    }
  
    delete(i: number, uid: string, name: string, ipv4: string) {
      this.index = i;
      this.id = uid;
      const dialogRef = this.dialog.open(DeleteGatewayComponent, {
        data: {id: uid, name: name, ipv4: ipv4}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.gatewayData.dataChange.value.findIndex(x => x.uid === this.id);
          this.gatewayData.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }
      });
    }

    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
    }

    public listGateways() {
      this.gatewayData = new GatewayService(this.httpClient);
      this.dataSource = new GatewayDataSource(this.gatewayData, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
}
