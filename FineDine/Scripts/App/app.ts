import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'

import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';

import {Establishment} from "./../Model/Establishment"
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'establishment-details'
                    
})
@View({
        template: `
        <div class="well">
            <h4>Additional information:</h4>
            <div class="finedine-text">
                Category: @Html.DisplayFor(model => model.Category.Name)
                <br />
                Adress: @Html.DisplayFor(model => model.Address)
                <br />
                City: @Html.DisplayFor(model => model.Location.PostCode) @Html.DisplayFor(model => model.Location.City)
                <br/>
                Phone number: @Html.DisplayFor(model => model.PhoneNumber)
                <br/>
                Owner: @Html.DisplayFor(model => model.Owner.UserName)
                <br />
                Working hours: @Html.DisplayFor(model => model.WorkingHours)
                <div class="center-align" style="padding-top:5px;">
                    <br/>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    <p class="main-rating"> @Html.DisplayFor(model => model.MainRating) / 5.0 </p>
                </div>
            </div>
        </div>
`
})
export class EstablishmentDetails {
    private establishment: Establishment = new Establishment();
    private http: Http;

    constructor(http: Http)
    {
        this.http = http;
        this.establishment.Id = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
        this.fetchEstablishment(this.establishment.Id);
    }

    public fetchEstablishment(id: number): void
    {
        let request = this.http.request("/api/Establishment/" + id.toString());

        request.subscribe((response: Response) => {
            this.establishment = response.json().map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

}

bootstrap(EstablishmentDetails, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

