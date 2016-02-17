import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'
import {NgClass, NgIf, NgFor} from 'angular2/common';

import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';

import {Establishment} from "./../Model/Establishment";
import {Comment} from "./../Model/Comment"
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"


import {ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'comments-list',
    directives: [NgIf, NgFor],
    inputs: ["comments"],                

        template: `
              <div class="media links" *ngFor = "#comment of comments">
                    <div class="media-left">
                        <img class="media-object" src="http://placehold.it/80x80" alt="placeholder">
                    </div>
                    <div class="media-body">
                        <a><h4 class="media-heading">{{comment.Author}}</h4></a>
                        <span class="ratingLabel">Ocjena: </span>
                        <span *ngIf="comment.Rating > 0.5" class="glyphicon glyphicon-star"></span>
                        <span *ngIf="comment.Rating > 1.5" class="glyphicon glyphicon-star"></span>
                        <span *ngIf="comment.Rating > 2.5" class="glyphicon glyphicon-star"></span>
                        <span *ngIf="comment.Rating > 3.5" class="glyphicon glyphicon-star"></span>
                        <span *ngIf="comment.Rating > 4.5" class="glyphicon glyphicon-star"></span>

                        <span *ngIf="comment.Rating < 0.5" class="glyphicon glyphicon-star-empty"></span>
                        <span *ngIf="comment.Rating < 1.5" class="glyphicon glyphicon-star-empty"></span>
                        <span *ngIf="comment.Rating < 2.5" class="glyphicon glyphicon-star-empty"></span>
                        <span *ngIf="comment.Rating < 3.5" class="glyphicon glyphicon-star-empty"></span>
                        <span *ngIf="comment.Rating < 4.5" class="glyphicon glyphicon-star-empty"></span><br />
                        {{comment.Content}}<br />
                    </div>
              </div>
            <div class="media links">
                    Add new comment...
            </div>
`
})
export class CommentsList {
    public comments: Comment[];
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
        this.comments = [];
        this.dbId = Number.parseInt(document.getElementById("comments-list").getAttribute("dbId"));
        this.fetchComments(this.dbId);        
        this.usersMatch = false;
        //setTimeout(this.usersMatch = this.checkIfUsersMatch(), 3000);
        //this.usersMatch = this.checkIfUsersMatch();
    }

    public fetchComments(id: number): void
    {
        let request = this.http.request("/api/CommentsApi/" + id.toString());

        request.subscribe((response: Response) => {
            this.comments = response.json().map(cmnt => new Comment(cmnt.Id, cmnt.Content, cmnt.Rating, cmnt.Date, cmnt.Author, cmnt.EstablishmentId));
            //this.editedEstablishment = x;
            
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

    public checkIfUsersMatch2(): void {
        /*let request = this.http2.request("/api/ServicesApi/GetService/" + "bad-romance", this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 200) {
                this.usersMatch = true;                
            }          
            

        }, (error) => alert("Error: " + JSON.stringify(error)));

        let request = this.http2.post("/api/ServicesApi/GetService/", JSON.stringify({ un: this.establishment.Owner }), this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 200) {
                this.usersMatch = true;                
            }          
            

        }, (error) => alert("Error: " + JSON.stringify(error)));*/
        
    }
}

bootstrap(CommentsList, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

