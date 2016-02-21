import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'
import {NgClass, NgIf, NgFor} from 'angular2/common';

import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';

import {Establishment} from "./../Model/Establishment";

import {ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'search-list',
    directives: [NgIf, NgFor],
    inputs: ["establishments"],

    template: `
            <input #searchBar (keyup)="onKeywordChange(searchBar.value)"  type="text" class="form-control searchbar" style="width:100%" placeholder="What are you looking for?">
            <br/>
            <p class="links">
                <a href="/Establishments/Create">Create New</a>
            </p>
            <div *ngFor="#establishment of searchResults">
                <div class="media">
                        <div class="media-left">
                            <a href="#">
                                <img class="media-object" src="./../img/restaurant_icon.jpg" alt="Restaurant icon">
                            </a>
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading links"><a href="/Establishments/Details/{{establishment.Id}}">{{establishment.Name}}</a></h4>
                            {{establishment.Address}}<br/>
                            Main rating: {{establishment.MainRating}}
                        </div>
                        <div class="media-right links">
                            <span><a href="/Establishments/Edit/{{establishment.Id}}">Edit</a></span>
                            <span><a href="/Establishments/Details/{{establishment.Id}}">Details</a></span>
                            <span><a href="/Establishments/Delete/{{establishment.Id}}">Delete</a></span>
                        </div>
                    </div>
                <hr/>     
            </div>      
`
})
export class SearchList {
    public establishments: Establishment[];
    public searchResults: Establishment[];
    private http: Http;
    private http2: Http;
    public keyword: string = "";

    constructor(http: Http, http2: Http) {
        this.http = http;
        this.http2 = http2;
        this.establishments = [];
        this.searchResults = [];
        this.fetchEstablishments();
    }

    public fetchEstablishments(): void {
        let request = this.http.get("/api/EstablishmentsApi/");

        request.subscribe((response: Response) => {
            this.establishments = response.json().map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber, estbl.CategoryName, estbl.PostalCode, estbl.City, estbl.Owner));
            this.searchResults = this.establishments;
            
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public onKeywordChange(value: string): void
    {
        this.keyword = value;
        this.searchResults = this.filterSearchResults();
    }

    public filterSearchResults(): Establishment[]
    {
        if (this.keyword == null || this.keyword.trim() == "") { return this.establishments; }

        this.keyword = this.keyword.toLowerCase();

        return this.establishments.filter(item => item.Name.toLowerCase().indexOf(this.keyword) != -1);
    }
}

bootstrap(SearchList, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

