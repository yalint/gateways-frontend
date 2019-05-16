import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GatewayComponent } from './components/gateway/gateways-page/gateway.component';
import { DeviceComponent } from './components/device/devices-page/device.component';
import {GatewayService} from './services/gateway.service';
import {DeviceService} from './services/device.service';
import {AddGatewayComponent} from './components/gateway/add-gateway/add.gateway.component';
import {UpdateGatewayComponent} from './components/gateway/update-gateway/update.gateway.component';
import {DeleteGatewayComponent} from './components/gateway/delete-gateway/delete.gateway.component';
import {AddDeviceComponent} from './components/device/add-device/add.device.component';
import {UpdateDeviceComponent} from './components/device/update-device/update.device.component';
import {DeleteDeviceComponent} from './components/device/delete-device/delete.device.component';
const appRoutes: Routes = [
  {path: '', component: GatewayComponent},
  {path: 'gateways', component: GatewayComponent},
  {path: 'devices', component: DeviceComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    GatewayComponent,
    DeviceComponent,
    AddGatewayComponent,
    UpdateGatewayComponent,
    DeleteGatewayComponent,
    AddDeviceComponent,
    UpdateDeviceComponent,
    DeleteDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [
    AddGatewayComponent,
    UpdateGatewayComponent,
    DeleteGatewayComponent,
    AddDeviceComponent,
    UpdateDeviceComponent,
    DeleteDeviceComponent
  ],
  providers: [GatewayService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
