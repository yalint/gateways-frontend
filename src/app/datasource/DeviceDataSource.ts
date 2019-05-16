import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeviceService} from '../services/device.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Device} from '../models/device';
export class DeviceDataSource extends DataSource<Device> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: Device[] = [];
    renderedData: Device[] = [];
  
    constructor(public deviceService: DeviceService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
    connect(): Observable<Device[]> {
      const displayDataChanges = [
        this.deviceService.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this.deviceService.getAll();
  
  
      return merge(...displayDataChanges).pipe(map( () => {
          this.filteredData = this.deviceService.data.slice().filter((device: Device) => {
            const searchStr = (device.uid + device.vendor + device.status + device.dateCreated + device.gateway).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
          const sortedData = this.sortData(this.filteredData.slice());
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        }
      ));
    }
  
    disconnect() {}

    sortData(data: Device[]): Device[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | boolean | string = '';
        let propertyB: number | boolean | string = '';
  
        switch (this._sort.active) {
          case 'id': [propertyA, propertyB] = [a.uid, b.uid]; break;
          case 'vendor': [propertyA, propertyB] = [a.vendor, b.vendor]; break;
          case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
          case 'dateCreated': [propertyA, propertyB] = [a.dateCreated, b.dateCreated]; break;
          case 'gateway': [propertyA, propertyB] = [a.gateway, b.gateway]; break;
          case 'created_at': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
          case 'updated_at': [propertyA, propertyB] = [a.updatedAt, b.updatedAt]; break;
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }