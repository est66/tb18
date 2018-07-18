import { Component } from '@angular/core';

import { ProfilPage } from '../profil/profil';
import { FormsPage } from '../forms/forms';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilPage;
  tab3Root = FormsPage;

  constructor() {

  }
}
