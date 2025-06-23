import { NgModule } from "@angular/core";
import { LandingComponent } from "./landing.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: LandingComponent }])]
})
export class LandingModule {
    
}
