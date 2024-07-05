import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { TelosComponent } from './telos/telos.component';

export const ARTICLES_ROUTES: Routes = [
    { path: '', component: ArticleListComponent },
    { path: '', component: TelosComponent },

    { path: ':slug', component: ArticleDetailComponent }
];
