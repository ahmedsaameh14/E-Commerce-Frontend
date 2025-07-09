import { Routes } from '@angular/router';
import { LayoutComponent } from './front/layout/layout.component';
import { HomeComponent } from './front/home/home.component';
import { HomeComponent as dashboardHome} from './dashboard/home/home.component';
import { ListProductComponent } from './front/list-product/list-product.component';
import { ProductComponent } from './front/list-product/product/product.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { AddProductFormComponent } from './dashboard/add-product-form/add-product-form.component';
import { LoginComponent } from './sign/login/login.component';
import { RegComponent } from './sign/reg/reg.component';
import { CartComponent } from './front/cart/cart.component';
import { ProfileComponent } from './front/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    
    
    {path:'' , component:LayoutComponent,children:[
        {path: 'home' , component:HomeComponent},
        {path: 'products',component:ListProductComponent},
        {path: 'product/:id' , component:ProductComponent},
        {path: 'profile',component:ProfileComponent , canActivate:[authGuard]},
        {path: 'cart',component:CartComponent , canActivate:[authGuard]},
        {path:'',redirectTo:'home',pathMatch:'full'},
    ]},

    {path:'dashboard' , component:DashboardLayoutComponent , canActivate:[adminGuard],children:[
        {path:'home', component:dashboardHome , canActivate:[adminGuard]},
        {path:'addproduct', component:AddProductComponent , canActivate:[adminGuard]},
        {path:'addproduct/form', component:AddProductFormComponent , canActivate:[adminGuard]},
        {path:'',component:dashboardHome}
    ]},

    {path:'login',component:LoginComponent},

    {path:'reg',component:RegComponent},

    { path: '**', redirectTo: 'home' },
];
