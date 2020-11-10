import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {

  public formSyncronous: FormGroup =  this.fb.group({
    ccenters: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(2), Validators.max(1000)]],
    cfish: ['', Validators.required],
    croads: ['', Validators.required],
    roads: new FormArray([]),
    centers: new FormArray([])
  });

  public formSyncronous$: Observable<any>;

  constructor(private fb: FormBuilder) { 
    this.formSyncronous$ = this.formSyncronous.valueChanges;
  }

  sendRequest() {
    console.log(this.formSyncronous)
  }

  get roads () {
    return this.formSyncronous.controls.roads as FormArray;
  }
  get centers () {
    return this.formSyncronous.controls.centers as FormArray;
  }

  changeCentersInput ($event) {
    const cCenters = $event.target.value || 0;
    if (this.centers.length < cCenters) {
      for (let i = this.centers.length; i < cCenters; i++) {
        this.centers.push(this.fb.group({
          cant_type_fish: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.max(1000)]],
          types_fish: new FormArray([])
        }))
      }
    } else {
      for (let i = this.centers.length; i >= cCenters; i--) this.centers.removeAt(i)
    }
  }

  getTypesfishControl (center): FormArray {
    return center.controls.types_fish as FormArray
  }

  changeTypesFish(center) {
    const cTypesFish = center.value.cant_type_fish;
    const fishinCenter = this.getTypesfishControl(center);
    if (fishinCenter.length < center.value.cant_type_fish) {
      for (let i = fishinCenter.length; i < cTypesFish; i++) {
        fishinCenter.push(this.fb.group({
          type_fish: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.max(1000)]],
        }))
      }
    } else {
      for (let i = fishinCenter.length; i >= cTypesFish; i--) fishinCenter.removeAt(i)
    }
  }

  changeCRoadsInput ($event) {
    const croads = $event.target.value || 0
    if (this.roads.length < croads) {
      for (let i = this.roads.length; i < croads; i++) {
        this.roads.push(this.fb.group({
          center_init: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.max(1000)]],
          center_end: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.max(1000)]],
          cost: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.max(1000)]],
        }))
      }
    } else {
      for (let i = this.roads.length; i >= croads; i--) this.roads.removeAt(i)
    }
  }
  
  get ccenters () { return this.formSyncronous.get('ccenters') }
  get cfish () { return this.formSyncronous.get('cfish') }
  get croads () { return this.formSyncronous.get('croads') }

}
