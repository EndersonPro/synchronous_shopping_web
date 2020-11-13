import { HttpService } from './../services/http.service';
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

  constructor(private fb: FormBuilder, private httpService: HttpService) { 
    this.formSyncronous$ = this.formSyncronous.valueChanges;
  }

  sendRequest() {
    // const dummyData = {
    //     ccenters:5,
    //     cfish:5,
    //     croads:5,
    //     roads:[
    //         { center_init:1, center_end:2, cost:10 },
    //         { center_init:1, center_end:3, cost:10 },
    //         { center_init:2, center_end:4, cost:10 },
    //         { center_init:3, center_end:5, cost:10 },
    //         { center_init:4, center_end:5, cost:10 }
    //     ],
    //     centers:[
    //         { cant_type_fish: 1, types_fish: [ { type_fish: 1 } ]},
    //         { cant_type_fish: 1, types_fish: [ { type_fish: 2 } ]},
    //         { cant_type_fish: 1, types_fish: [ { type_fish: 3 } ]},
    //         { cant_type_fish: 1, types_fish: [ { type_fish: 4 } ]},
    //         { cant_type_fish: 1, types_fish: [ { type_fish: 5 } ]}
    //     ]
    // };
    const formData = this.formSyncronous.value;
    const data = {
        parameters: `${formData.ccenters},${formData.cfish},${formData.croads}`,
        shoping_centers: this.parseCenterstoString(formData.centers),
        roads: this.parseRoadstoString(formData.roads)
    }
    this.httpService.sendData(data).subscribe(console.log);
  }

  parseRoadstoString (roads: Array<any>): string {
    let response = '';
    roads.forEach(({ center_init, center_end, cost }, index) => {
        response += `${center_init},${center_end},${cost}`;
        response += (index === roads.length - 1) ? '' : '-';
    });  
    return response;
  }

  parseCenterstoString (centers: Array<any>) : string {
    let response = '';
    centers.forEach(({ cant_type_fish: cant, types_fish: types }: { cant_type_fish: Number, types_fish: []}, indexCenters) => {
        response += `${cant},`;
        types.forEach(({ type_fish: type }, indexTypes) => {
            response += `${type}`;
            response += (indexTypes === types.length - 1) ? indexCenters === centers.length - 1 ? '' : '-' : ',';
        })
    })
    return response;
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
