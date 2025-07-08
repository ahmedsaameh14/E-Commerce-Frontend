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

export const routes: Routes = [
    
    
    {path:'' , component:LayoutComponent,children:[
        {path: 'home' , component:HomeComponent},
        {path: 'products',component:ListProductComponent},
        {path: 'product/:id' , component:ProductComponent},
        {path:'',redirectTo:'home',pathMatch:'full'},
    ]},

    {path:'dashboard' , component:DashboardLayoutComponent,children:[
        {path:'home', component:dashboardHome},
        {path:'addproduct', component:AddProductComponent},
        {path:'addproduct/form', component:AddProductFormComponent},
        {path:'',component:dashboardHome}
    ]},

    {path:'login',component:LoginComponent},

    {path:'reg',component:RegComponent},

    { path: '**', redirectTo: 'home' },
];
