import { Routes } from '@angular/router';

import { TelosComponent } from './telos.component';

export const TELOS_ROUTES: Routes = [
    
    { path: 'telos/:ciudad/:categoria', component: TelosComponent },
    { path: '', component: TelosComponent },

];
