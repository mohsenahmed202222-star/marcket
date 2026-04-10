import { Routes } from '@angular/router';
import { FamilyListComponent } from './family-list/family-list.component';
import { AddFamilyComponent } from './add-family/add-family.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';

export const routes: Routes = [
  { path: '', component: FamilyListComponent },
  { path: 'add-family', component: AddFamilyComponent },
  { path: 'family/:id', component: FamilyDetailComponent },
];
