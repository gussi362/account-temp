import { Component ,Injectable } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import {objectScan} from 'object-scan';

@Component({
  selector: 'ngx-temp-layouts',
  styleUrls: ['./temp-layouts.component.scss'],
  templateUrl: './temp-layouts.component.html',
})
export class TempLayoutsComponent {


  options: any;
  filteredOptions$: Observable<string[]>;
  baseUrl = "https://localhost:7001/api/v1/weather/";
  @ViewChild('autoInput') input;
   search = "";

  constructor(private _http:HttpClient ,private _notificationService:NbToastrService){}

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

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    //set base user data here

    //set disabled form
  }


}
