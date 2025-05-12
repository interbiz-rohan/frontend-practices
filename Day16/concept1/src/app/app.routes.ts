import { Routes } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { DecoratorDemoComponent } from './decorator-demo/decorator-demo.component';
import { PipeDemoComponent } from './pipe-demo/pipe-demo.component';
import { DecoratorExamplesComponent } from './decorator-examples/decorator-examples.component';

export const routes: Routes = [
  { path: '', redirectTo: '/task-manager', pathMatch: 'full' },
  { path: 'task-manager', component: TaskManagerComponent },
  { path: 'decorator-demo', component: DecoratorDemoComponent },
  { path: 'pipe-demo', component: PipeDemoComponent },
  { path: 'decorator-examples', component: DecoratorExamplesComponent }
];
