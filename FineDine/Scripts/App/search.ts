import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'
import {NgClass, NgIf, NgFor} from 'angular2/common';

import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';

import {Establishment} from "./../Model/Establishment";
//import {Comment} from "./../Model/Comment"

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

        //return [];
    }

/*
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

    public checkIfUsersMatch2(): void {
        let request = this.http2.post("/api/ServicesApi/GetService/", JSON.stringify({ un: this.dbUsername }), this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 202) {
                this.usersMatch = true;
            }


        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public handleCommentChange(commentContent: string): void {
        this.newComment.Content = commentContent;
    }

    public handleRatingChange(commentRating: number): void {
        this.newComment.Rating = commentRating;
    }

    public handleSubmitButton(): void {
        this.newComment.Author = "bad-romance";
        this.newComment.EstablishmentId = this.dbId;
        this.newComment.Date = "poker-face"

        let request = this.http.post("/api/CommentsApi/", JSON.stringify(this.newComment), this.getJsonRequestOptions());

        request.subscribe((response: Response) => {
            if (response.status == 201)
                this.fetchComments(this.dbId);
        }, (error) => alert("Error: " + JSON.stringify(error)));

        document.getElementById("commentContent").innerHTML = 'Comment: <input #commentContent (change)="handleCommentChange(commentContent.value)" type="text" placeholder="Add new Comment">';
        document.getElementById("commentRating").innerHTML = 'Rating: <input #commentRating(change) = "handleRatingChange(commentRating.value)" type= "number" min= "1" max= "5" step= "0.5" >';




    }*/
}

bootstrap(SearchList, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

