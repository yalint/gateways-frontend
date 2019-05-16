import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GatewayService} from '../services/gateway.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Gateway} from '../models/gateway';
export class GatewayDataSource extends DataSource<Gateway> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: Gateway[] = [];
    renderedData: Gateway[] = [];
  
    constructor(public gatewayService: GatewayService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
    connect(): Observable<Gateway[]> {
      const displayDataChanges = [
        this.gatewayService.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this.gatewayService.getAll();
  
  
      return merge(...displayDataChanges).pipe(map( () => {
          this.filteredData = this.gatewayService.data.slice().filter((gateway: Gateway) => {
            const searchStr = (gateway.uid + gateway.name + gateway.ipv4).toLowerCase();
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

    sortData(data: Gateway[]): Gateway[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
  
        switch (this._sort.active) {
          case 'id': [propertyA, propertyB] = [a.uid, b.uid]; break;
          case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
          case 'ipv4': [propertyA, propertyB] = [a.ipv4, b.ipv4]; break;
          case 'created_at': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
          case 'updated_at': [propertyA, propertyB] = [a.updatedAt, b.updatedAt]; break;
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }