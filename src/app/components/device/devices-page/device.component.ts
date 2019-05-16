import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DeviceService} from '../../../services/device.service';
import {DeviceDataSource} from '../../../datasource/DeviceDataSource';
import {fromEvent} from 'rxjs';
import {AddDeviceComponent} from '../add-device/add.device.component';
import {UpdateDeviceComponent} from '../update-device/update.device.component';
import {DeleteDeviceComponent} from '../delete-device/delete.device.component';
import { Device } from '../../../models/device';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  displayedColumns = ['id', 'vendor', 'status', 'dateCreated', 'gateway', 'created_at', 'updated_at', 'actions'];
  deviceData: DeviceService | null;
  dataSource: DeviceDataSource | null;
  index: number;
  id: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(public httpClient: HttpClient, public dialog: MatDialog, public deviceService: DeviceService) { }
    ngOnInit() {
      this.listDevices();
    }
  
    refresh() {
      this.listDevices();
    }

    addNew(device: Device) {
      const dialogRef = this.dialog.open(AddDeviceComponent, {
        data: {device: device }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.deviceData.dataChange.value.push(this.deviceService.getDialogData());
          this.refreshTable();
        }
      });
    }

    update(i: number, row: any) {
      this.id = row.uid;
      this.index = i;
      const dialogRef = this.dialog.open(UpdateDeviceComponent, {
        data: {row}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.deviceData.dataChange.value.findIndex(x => x.uid === this.id);
          this.deviceData.dataChange.value[foundIndex] = this.deviceService.getDialogData();
          this.refreshTable();
        }
      });
    }
  
    delete(i: number, row: any) {
      this.index = i;
      this.id = row.uid;
      const dialogRef = this.dialog.open(DeleteDeviceComponent, {
        data: {row}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.deviceData.dataChange.value.findIndex(x => x.uid === this.id);
          this.deviceData.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }
      });
    }

    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
    }

    public listDevices() {
      this.deviceData = new DeviceService(this.httpClient);
      this.dataSource = new DeviceDataSource(this.deviceData, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
}
