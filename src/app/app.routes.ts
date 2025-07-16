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
import { CheckoutComponent } from './front/cart/checkout/checkout.component';
import { DetailsComponent } from './front/profile/order/details/details.component';
import { OrdersComponent } from './dashboard/order/order.component';

export const routes: Routes = [
    
    {path:'login',component:LoginComponent},

    {path:'reg',component:RegComponent},
    
    {path:'' , component:LayoutComponent,children:[
        {path: 'home' , component:HomeComponent},
        {path: 'products',component:ListProductComponent},
        {path: 'products/:id' , component:ProductComponent},
        {path: 'profile',component:ProfileComponent , canActivate:[authGuard]},
        {path: 'orders/:id' , component:DetailsComponent, canActivate:[authGuard]},
        {path: 'cart',component:CartComponent , canActivate:[authGuard]},
        {path: 'checkout' , component:CheckoutComponent , canActivate:[authGuard]},
        {path:'',redirectTo:'home',pathMatch:'full'},
        // { path: '**', redirectTo: 'home' }
    ]},

    {path:'dashboard' , component:DashboardLayoutComponent , canActivate:[adminGuard],children:[
        {path:'home', component:dashboardHome , canActivate:[adminGuard]},
        {path:'addproduct', component:AddProductComponent , canActivate:[adminGuard]},
        {path:'addproduct/form', component:AddProductFormComponent , canActivate:[adminGuard]},
        {path:'addproduct/form/:id', component:AddProductFormComponent , canActivate:[adminGuard]},     // To Edit in Product
        {path:'orders' , component:OrdersComponent , canActivate:[adminGuard]},
        {path:'',component:dashboardHome},
        {path: '**', redirectTo: 'dashboard/home'},
    ]},


    // { path: '**', redirectTo: 'home' },
];
