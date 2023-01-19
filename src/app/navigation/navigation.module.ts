import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InfosComponent } from './header/infos/infos.component';
import {MatDialogModule} from '@angular/material/dialog'


@NgModule({
  declarations: [
    SidenavListComponent,
    HeaderComponent,
    InfosComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    SidenavListComponent,
    HeaderComponent,
    MatSidenavModule
  ]
})
export class NavigationModule { }
