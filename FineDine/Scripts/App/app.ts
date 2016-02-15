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
            <h4>Additional information:</h4>
            <div class="finedine-text">
                Category: {{establishment.CategoryName}}
                <br />
                Address: {{establishment.Address}}
                <br />
                City: {{establishment.PostalCode}} {{establishment.City}}
                <br/>
                Phone number: {{establishment.PhoneNumber}}
                <br/>
                Owner: {{establishment.Owner}}
                <br />
                Working hours: {{establishment.WorkingHours}}
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
    dbId: number;

    constructor(http: Http)
    {
        this.http = http;
        this.dbId = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
        this.fetchEstablishment(this.dbId);
    }

    public fetchEstablishment(id: number): void
    {
        let request = this.http.request("/api/EstablishmentsApi/" + id.toString());

        request.subscribe((response: Response) => {
            var x = response.json();//.map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber))
            this.establishment = x;
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

}

bootstrap(EstablishmentDetails, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

