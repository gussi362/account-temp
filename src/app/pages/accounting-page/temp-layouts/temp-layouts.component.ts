import { Component ,Injectable } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import {objectScan} from 'object-scan';
import { userInfo } from '../user';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-temp-layouts',
  styleUrls: ['./temp-layouts.component.scss'],
  templateUrl: './temp-layouts.component.html',
})
export class TempLayoutsComponent {


  options: any;
  filteredOptions$: Observable<string[]>;
  baseUrl = "https://localhost:7001/api/v1/weather/";
  userData:userInfo = {
    "code": "Code",
    "name": "name",
    "phone": "phone",
    "accountType": "account type",
    "balance": 0,
    "lastOpreationAt": "last opreation at"
  };
  opreationTypes = ["charge" ,"payment" ,"sales"];
  move_line_steps: FormGroup;
 
   opreationAmount:number = 0;
   opreationByBankTransactionId:string = "";
   opreationSourceAccount :string = "";
   sourceAccounts = ["Bank" ,"Debt" ,"tresuary"];
  @ViewChild('autoInput') input;
   search = "";

  constructor(private _http:HttpClient ,private _notificationService:NbToastrService ,private fb:FormBuilder)
  {
    this.move_line_steps = this.fb.group({
   
      moves: this.fb.array([new FormControl(null)])
   });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onUserSearchChange() {
    let httpheader = new HttpHeaders({ 'Content-Type': ' application/json-patch+json; ver=1' });

    //set search string
    var searchString = this.input.nativeElement.value;
    //send request
    if(searchString != ""){
    console.log("searchString")
     this._http.post<any>(this.baseUrl+"dummySearch?searchText="+searchString  ,{headers:httpheader})
    .subscribe
    (
      (data) => {
        var res = JSON.parse(JSON.stringify(data))
        if(res.responseCode != 0)
        {
            this._notificationService.show(res.responseMessage,"Error "+res.responseCode,{status:"danger"});
        }
        // console.log(res.data)

        this.options=res.data
        // this.filteredOptions$ = of(this.options);

        // this.filteredOptions$ = this.getFilteredOptions(searchString);
        this.filteredOptions$ = of(res.data);

      },//on success
      error => {
        console.log(error)
        this._notificationService.show("there was an error processing your request","FatalError",{status:"danger"});
      },//on error
      () => {},//oncomplete
    )
    }
    //if fail show notification

    //set this.options list

    console.log(searchString)


  }

  onUserSearchSelect($event) {
    // this.filteredOptions$ = this.getFilteredOptions($event);
    console.log($event)
    //set base user data here
    let httpheader = new HttpHeaders({ 'Content-Type': ' application/json-patch+json; ver=1' });

    this._http.post<any>(this.baseUrl+"user?userCode="+$event  ,{headers:httpheader})
    .subscribe
    (
      (data) => {
        var res = JSON.parse(JSON.stringify(data))
        if(res.responseCode != 0)
        {
            this._notificationService.show(res.responseMessage,"Error "+res.responseCode,{status:"danger"});
        }

        // console.log(res.data)
        
        console.log(this.userData)
        // this.options=res.data
        // // this.filteredOptions$ = of(this.options);

        // // this.filteredOptions$ = this.getFilteredOptions(searchString);
        // this.filteredOptions$ = of(res.data);

      },//on success
      error => {
        console.log(error)
        this._notificationService.show("there was an error processing your request","FatalError",{status:"danger"});
      },//on error
      () => {},//oncomplete
    )
    //set disabled form
  }

  selectSourceAccount($event)
  {
    
    console.log("source account = "+$event)
    this.opreationSourceAccount = $event;
  }

  // move line functions

  addStep()
  {
    
      const op = this.fb.array([
      
        new FormControl('op_type',),
        new FormControl('op_amount'),
        new FormControl('op_sales_account'),
      ]);
      
      this.moves.push(this.moves.value);
      // console.log(moves.value);
  }

  removeStep(index)
  {
    this.moves.removeAt(index)
  }

  get moves() : FormArray {
    return this.move_line_steps.get("moves") as FormArray
  }

  saveSteps()
  {
    console.log(this.move_line_steps.value)
  }
}
