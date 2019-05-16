import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule, 
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule, 
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule, 
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}