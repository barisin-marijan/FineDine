import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'
import {NgClass, NgIf} from 'angular2/common';

import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';

import {Establishment} from "./../Model/Establishment"
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"


import {ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'establishment-details',
    directives: [NgIf],
                    

        template: `
        <div class="well">
            <h4>Additional information: &nbsp; &nbsp;&nbsp;&nbsp;<span *ngIf="editFlag == false && usersMatch == true" (click)="handleEditButtonClick()" class="glyphicon glyphicon-pencil" style="cursor: pointer"></span></h4>
            <div class="finedine-text">
                Category: <span *ngIf="editFlag == false">{{establishment.CategoryName}}</span>
                            <div *ngIf="editFlag == true"> 
                                <input (click)="handleCategoryChange(1)" type="radio" name="category" value="restaurant" class=""> Restaurant<br />
                                <input (click)="handleCategoryChange(2)" type="radio" name="category" value="fastfood" class=""> Fast Food<br />
                                <input (click)="handleCategoryChange(3)" type="radio" name="category" value="bar" class=""> Bar<br />
                                <input (click)="handleCategoryChange(4)" type="radio" name="category" value="coffeeshop" class=""> Coffee Shop
                            </div>
                <br />
                Address: <span *ngIf="editFlag == false">{{establishment.Address}}</span>
                           <input #inputAddress (change)="handleAddressChange(inputAddress.value)" type="text" value="{{establishment.Address}}" *ngIf="editFlag == true">
                <br />
                City: <span *ngIf="editFlag == false">{{establishment.PostalCode}} {{establishment.City}}</span>
                        <input #inputCity (change)="handleCityChange(inputCity.value)" type="text" value="{{establishment.City}}" *ngIf="editFlag == true">
                <br *ngIf="editFlag == true" />
                <span *ngIf="editFlag == true">Postal Code</span>
                        <input #inputPostalCode (change)="handlePostalCodeChange(inputPostalCode.value)" type="text" value="{{establishment.PostalCode}}" *ngIf="editFlag == true">
                <br/>
                Phone number: <span *ngIf="editFlag == false">{{establishment.PhoneNumber}}</span>
                                <input #inputPhone (change)="handlePhoneChange(inputPhone.value)" type="text" value="{{establishment.PhoneNumber}}" *ngIf="editFlag == true">
                <br/>
                Owner: {{establishment.Owner}}
                <br />
                Working hours: <span *ngIf="editFlag == false">{{establishment.WorkingHours}}</span>
                                <input #inputWH (change)="handleWHChange(inputWH.value)" type="text" value="{{establishment.WorkingHours}}" *ngIf="editFlag == true">
                                <br/><br/><button (click)="handleDoneButton()" *ngIf="editFlag == true">Done</button>
                
                <div class="center-align" style="padding-top:5px;">
                    <br/>
                    <span *ngIf="establishment.MainRating > 0.5" class="glyphicon glyphicon-star"></span>
                    <span *ngIf="establishment.MainRating > 1.5" class="glyphicon glyphicon-star"></span>
                    <span *ngIf="establishment.MainRating > 2.5" class="glyphicon glyphicon-star"></span>
                    <span *ngIf="establishment.MainRating > 3.5" class="glyphicon glyphicon-star"></span>
                    <span *ngIf="establishment.MainRating > 4.5" class="glyphicon glyphicon-star"></span>

                    <span *ngIf="establishment.MainRating < 0.5" class="glyphicon glyphicon-star-empty"></span>
                    <span *ngIf="establishment.MainRating < 1.5" class="glyphicon glyphicon-star-empty"></span>
                    <span *ngIf="establishment.MainRating < 2.5" class="glyphicon glyphicon-star-empty"></span>
                    <span *ngIf="establishment.MainRating < 3.5" class="glyphicon glyphicon-star-empty"></span>
                    <span *ngIf="establishment.MainRating < 4.5" class="glyphicon glyphicon-star-empty"></span>
                    <p class="main-rating"> {{establishment.MainRating}} / 5.0 </p>
                </div>
            </div>
        </div>
`
})
export class EstablishmentDetails {
    public establishment: Establishment = new Establishment();
    private http: Http;
    private http2: Http;
    
    dbId: number;
    editFlag: boolean;
    public editedEstablishment: Establishment = new Establishment();
    public usersMatch: boolean;

    constructor(http: Http, http2: Http)
    {
        this.http = http;
        this.http2 = http2;
        
        this.dbId = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
        this.fetchEstablishment(this.dbId);
        this.editFlag = false;
        this.usersMatch = false;
        //setTimeout(this.usersMatch = this.checkIfUsersMatch(), 3000);
        //this.usersMatch = this.checkIfUsersMatch();
    }

    public fetchEstablishment(id: number): void
    {
        let request = this.http.request("/api/EstablishmentsApi/" + id.toString());

        request.subscribe((response: Response) => {
            var x = response.json();//.map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber))
            this.establishment = x;
            this.editedEstablishment = x;
            this.checkIfUsersMatch();
        }, (error) => alert("Error: " + JSON.stringify(error)));

        
    }

    public handleEditButtonClick(): void {
        this.editFlag = true;
//        alert(this.editFlag);
    }

    public handleCategoryChange(value: number): void {
        if (value == 1) this.editedEstablishment.CategoryName = "Restaurant";
        else if (value == 2) this.editedEstablishment.CategoryName = "Fast Food";
        else if (value == 3) this.editedEstablishment.CategoryName = "Bar";
        else if (value == 4) this.editedEstablishment.CategoryName = "Coffee Shop";
        //alert(value);
    }

    public handleAddressChange(value: string): void {
        this.editedEstablishment.Address = value;
        //alert(value);
    }

    public handleCityChange(value: string): void {
        this.editedEstablishment.City = value;
        //alert(value);
    }

    public handlePostalCodeChange(value: string): void {
        this.editedEstablishment.PostalCode = value;
        //alert(value);
    }

    public handlePhoneChange(value: string): void {
        this.editedEstablishment.PhoneNumber = value;
        //alert(value);
    }

    public handleWHChange(value: string): void {
        this.editedEstablishment.WorkingHours = value;
    }

    public handleDoneButton(): void {
        this.http.put(
            "/api/EstablishmentsApi/" + this.dbId,
            JSON.stringify(this.editedEstablishment),
            this.getJsonRequestOptions()
        ).subscribe(
            (response: Response) => { if (response.status == 200) this.editFlag = false; },
            (error) => alert("Error: " + JSON.stringify(error))
            );
    }

    private getJsonRequestOptions(): RequestOptions {
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");

        let opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return opts;
    }

    public checkIfUsersMatch(): void {
        /*let request = this.http2.request("/api/ServicesApi/GetService/" + "bad-romance", this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 200) {
                this.usersMatch = true;                
            }          
            

        }, (error) => alert("Error: " + JSON.stringify(error)));*/

        let request = this.http2.post("/api/ServicesApi/GetService/", JSON.stringify({ un: this.establishment.Owner }), this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 200) {
                this.usersMatch = true;                
            }          
            

        }, (error) => alert("Error: " + JSON.stringify(error)));
        
    }
}

bootstrap(EstablishmentDetails, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

