import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Configuration, DataContractsApiModule } from '@hc/frontend-data-contracts';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './auth/auth.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
import { DefaultValuePipeModule } from './directives/default-value/default-value.pipe.module';
import { FormsModule } from './forms/forms.module';
import { IconModule } from './icon/icon.module';
import { LoginComponent } from './login/login.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProjectsModule } from './projects/projects.module';
import { TeamsModule } from './teams/teams.module';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataContractsApiModule.forRoot(() => new Configuration({ basePath: environment.basePath })),
    SlideMenuModule,
    SidebarModule,
    ButtonModule,
    CardModule,
    DefaultValuePipeModule,
    DashboardModule,
    IconModule,
    TeamsModule,
    ProjectsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
