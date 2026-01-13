import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calendar',
        loadComponent: () => import('./calendar-view/calendar-view.component').then(m => m.CalendarViewComponent)
    },
    {
        path: 'file-tree',
        loadComponent: () => import('./file-tree/file-tree.component').then(m => m.FileTreeComponent)
    },
    {
        path: '',
        loadComponent: () => import('./tabs/tabs.component').then(m => m.TabsComponent)
    }
];