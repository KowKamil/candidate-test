import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, CandidatesComponent, CandidateDetailComponent, MessagesComponent, SidebarComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
