import { HostComponent } from './host/host.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatRippleModule,
} from '@angular/material';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoomComponent } from './room/room.component';
import { AboutComponent } from './about/about.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamComponent } from './team/team.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HostComponent,
    HomeComponent,
    RoomComponent,
    TeamFormComponent,
    TeamComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    // Material modules
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    RouterModule.forRoot(
      appRoutes,
    )
  ],
  entryComponents: [TeamFormComponent, ConfirmDeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
