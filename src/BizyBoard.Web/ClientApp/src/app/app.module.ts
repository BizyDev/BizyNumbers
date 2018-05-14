import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';

import { AccountModule }  from './account/account.module';
import { UserService } from './shared/services/user.service';
import { AuthGuard, AuthGuardLogin } from './auth.guard';

import { JwtModule } from '@auth0/angular-jwt';
import { MaterialModule } from './app.material.module';

export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent, 
    SpinnerComponent,
    RegistrationFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001, localhost:52003'],
        blacklistedRoutes: ['localhost:3001/login/']
      }
    }),
    HttpModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegistrationFormComponent, canActivate: [AuthGuardLogin] },
      { path: 'login', component: LoginFormComponent, canActivate: [AuthGuardLogin] },
    ])
  ],
  providers: [UserService, AuthGuard, AuthGuardLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
