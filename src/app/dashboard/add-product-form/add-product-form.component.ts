import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css'
})
export class AddProductFormComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  isEdit = false;
  subCategories: { _id: string; name: string }[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productS: ProductsService
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      desc: new FormControl(''),
      stock: new FormControl(''),
      subCategory: new FormControl(''),
      image: new FormControl(null),
      newSubCategory: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') || '';

    this._productS.getSubCategories().subscribe(res => {
      this.subCategories = res.data;
    });

    if (this.id) {
      this.isEdit = true;
      this._productS.getProductById(this.id).subscribe(res => {
        const { name, price, desc, stock, subCategory } = res.data;
        this.form.patchValue({ name, price, desc, stock, subCategory });
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ image: file });
    }
  }

  addNewSubCategory() {
    const newSubCatName = this.form.get('newSubCategory')?.value?.trim();
    if (!newSubCatName) return;

    this._productS.addSubCategory(newSubCatName).subscribe({
      next: (res: any) => {
        const newSub = res.data;
        this.subCategories.push(newSub);
        this.form.patchValue({
          subCategory: newSub._id,
          newSubCategory: ''
        });
      },
      error: (err) => {
        alert('Failed to add subcategory: ' + err.error?.message);
      }
    });
  }

  onSubmit() {
    const formData = new FormData();
    const newSubCat = this.form.value.newSubCategory;
    const selectedSubCat = this.form.value.subCategory;

    if (newSubCat) {
      formData.append('subCategory', newSubCat);
    } else {
      formData.append('subCategory', selectedSubCat);
    }

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'subCategory' && key !== 'newSubCategory') {
        if (key === 'image' && value instanceof File) {
          formData.append('img', value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (this.isEdit) {
      this._productS.updateProduct(this.id, formData).subscribe(() => this._router.navigate(['/dashboard/addproduct']));
    } else {
      this._productS.addProduct(formData).subscribe(() => this._router.navigate(['/dashboard/addproduct']));
    }
  }
}
