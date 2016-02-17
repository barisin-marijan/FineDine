var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var http_1 = require('angular2/http');
var Establishment_1 = require("./../Model/Establishment");
var Comment_1 = require("./../Model/Comment");
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"
var router_1 = require('angular2/router');
var CommentsList = (function () {
    function CommentsList(http, http2) {
        this.editedEstablishment = new Establishment_1.Establishment();
        this.newComment = new Comment_1.Comment();
        this.http = http;
        this.http2 = http2;
        this.comments = [];
        this.dbId = Number.parseInt(document.getElementById("comments-list").getAttribute("dbId"));
        this.dbUsername = document.getElementById("comments-list").getAttribute("dbUsername");
        this.fetchComments(this.dbId);
        this.usersMatch = false;
        this.checkIfUsersMatch2();
        //setTimeout(this.usersMatch = this.checkIfUsersMatch(), 3000);
        //this.usersMatch = this.checkIfUsersMatch();
    }
    CommentsList.prototype.fetchComments = function (id) {
        var _this = this;
        var request = this.http.request("/api/CommentsApi/" + id.toString());
        request.subscribe(function (response) {
            _this.comments = response.json().map(function (cmnt) { return new Comment_1.Comment(cmnt.Id, cmnt.Content, cmnt.Rating, cmnt.Date, cmnt.Author, cmnt.EstablishmentId); });
            //this.editedEstablishment = x;
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    CommentsList.prototype.handleEditButtonClick = function () {
        this.editFlag = true;
        //        alert(this.editFlag);
    };
    CommentsList.prototype.handleCategoryChange = function (value) {
        if (value == 1)
            this.editedEstablishment.CategoryName = "Restaurant";
        else if (value == 2)
            this.editedEstablishment.CategoryName = "Fast Food";
        else if (value == 3)
            this.editedEstablishment.CategoryName = "Bar";
        else if (value == 4)
            this.editedEstablishment.CategoryName = "Coffee Shop";
        //alert(value);
    };
    CommentsList.prototype.handleAddressChange = function (value) {
        this.editedEstablishment.Address = value;
        //alert(value);
    };
    CommentsList.prototype.handleCityChange = function (value) {
        this.editedEstablishment.City = value;
        //alert(value);
    };
    CommentsList.prototype.handlePostalCodeChange = function (value) {
        this.editedEstablishment.PostalCode = value;
        //alert(value);
    };
    CommentsList.prototype.handlePhoneChange = function (value) {
        this.editedEstablishment.PhoneNumber = value;
        //alert(value);
    };
    CommentsList.prototype.handleWHChange = function (value) {
        this.editedEstablishment.WorkingHours = value;
    };
    CommentsList.prototype.handleDoneButton = function () {
        var _this = this;
        this.http.put("/api/EstablishmentsApi/" + this.dbId, JSON.stringify(this.editedEstablishment), this.getJsonRequestOptions()).subscribe(function (response) { if (response.status == 200)
            _this.editFlag = false; }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    CommentsList.prototype.getJsonRequestOptions = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var opts = new http_1.RequestOptions();
        opts.headers = headers;
        return opts;
    };
    CommentsList.prototype.checkIfUsersMatch2 = function () {
        var _this = this;
        var request = this.http2.post("/api/ServicesApi/GetService/", JSON.stringify({ un: this.dbUsername }), this.getJsonRequestOptions()).subscribe(function (response) {
            if (response.status == 202) {
                _this.usersMatch = true;
            }
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    CommentsList.prototype.handleCommentChange = function (commentContent) {
        this.newComment.Content = commentContent;
    };
    CommentsList.prototype.handleRatingChange = function (commentRating) {
        this.newComment.Rating = commentRating;
    };
    CommentsList.prototype.handleSubmitButton = function () {
        var _this = this;
        this.newComment.Author = "bad-romance";
        this.newComment.EstablishmentId = this.dbId;
        this.newComment.Date = "poker-face";
        var request = this.http.post("/api/CommentsApi/", JSON.stringify(this.newComment), this.getJsonRequestOptions());
        request.subscribe(function (response) {
            if (response.status == 201)
                _this.fetchComments(_this.dbId);
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
        document.getElementById("commentContent").innerHTML = 'Comment: <input #commentContent (change)="handleCommentChange(commentContent.value)" type="text" placeholder="Add new Comment">';
        document.getElementById("commentRating").innerHTML = 'Rating: <input #commentRating(change) = "handleRatingChange(commentRating.value)" type= "number" min= "1" max= "5" step= "0.5" >';
    };
    CommentsList = __decorate([
        core_1.Component({
            selector: 'comments-list',
            directives: [common_1.NgIf, common_1.NgFor],
            inputs: ["comments"],
            template: "\n              <div class=\"media links\" *ngFor = \"#comment of comments\">\n                    <div class=\"media-left\">\n                        <img class=\"media-object\" src=\"http://placehold.it/80x80\" alt=\"placeholder\">\n                    </div>\n                    <div class=\"media-body\">\n                        <a><h4 class=\"media-heading\">{{comment.Author}}</h4></a>\n                        <span class=\"ratingLabel\">Ocjena: </span>\n                        <span *ngIf=\"comment.Rating > 0.5\" class=\"glyphicon glyphicon-star\"></span>\n                        <span *ngIf=\"comment.Rating > 1.5\" class=\"glyphicon glyphicon-star\"></span>\n                        <span *ngIf=\"comment.Rating > 2.5\" class=\"glyphicon glyphicon-star\"></span>\n                        <span *ngIf=\"comment.Rating > 3.5\" class=\"glyphicon glyphicon-star\"></span>\n                        <span *ngIf=\"comment.Rating > 4.5\" class=\"glyphicon glyphicon-star\"></span>\n\n                        <span *ngIf=\"comment.Rating < 0.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                        <span *ngIf=\"comment.Rating < 1.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                        <span *ngIf=\"comment.Rating < 2.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                        <span *ngIf=\"comment.Rating < 3.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                        <span *ngIf=\"comment.Rating < 4.5\" class=\"glyphicon glyphicon-star-empty\"></span><br />\n                        {{comment.Content}}<br />\n                    </div>\n              </div>\n            <br />\n            <div class=\"media links\" *ngIf=\"usersMatch==true\">\n                    Add new comment...<br /><br />\n                    <span id=\"commentContent\">Comment: <input #commentContent (change)=\"handleCommentChange(commentContent.value)\" type=\"text\" placeholder=\"Add new Comment\"></span><br /><br />\n                    <span id=\"commentRating\">Rating: <input #commentRating (change)=\"handleRatingChange(commentRating.value)\" type=\"number\" min=\"1\" max=\"5\" step=\"0.5\"></span><br /><br />\n                    <button (click)=\"handleSubmitButton()\">Submit</button>\n            </div>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Http])
    ], CommentsList);
    return CommentsList;
})();
exports.CommentsList = CommentsList;
browser_1.bootstrap(CommentsList, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=comments.js.map