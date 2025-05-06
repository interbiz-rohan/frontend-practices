// import { Component } from '@angular/core';
// import { UserListComponent } from './user/user-list/user-list.component';
// import { HelloComponent } from './hello/hello.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [UserListComponent, HelloComponent],
//   template: `
//     <div class="app-container">
//       <h1>Angular Demo Application</h1>
      
//       <div class="section">
//         <h2>Hello Component Demo</h2>
//         <app-hello></app-hello>
//       </div>

//       <div class="section">
//         <h2>User Management System</h2>
//         <app-user-list></app-user-list>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .app-container {
//       padding: 20px;
//       text-align: center;
//       max-width: 1200px;
//       margin: 0 auto;
//     }
//     h1 {
//       color: #333;
//       margin-bottom: 30px;
//     }
//     .section {
//       margin: 40px 0;
//       padding: 20px;
//       background-color: #fff;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }
//     h2 {
//       color: #1976d2;
//       margin-bottom: 20px;
//     }
//   `]
// })
// export class AppComponent {
//   title = 'angular-demo';
// }
 

import { Component } from '@angular/core';
import { UserListComponent } from './user/user-list/user-list.component';
import { HelloComponent } from './hello/hello.component';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [UserListComponent, HelloComponent],
  templateUrl:"./app.component.html",
  imports: [PostComponent]
})
export class AppComponent {
  url="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";
  title = 'angular-demo';

   ChangeEvent(e:Event){
      const input = e.target as HTMLInputElement;
      this.url= input.value
  } 
}
 