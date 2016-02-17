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
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"
var router_1 = require('angular2/router');
var EstablishmentDetails = (function () {
    function EstablishmentDetails(http, http2) {
        this.establishment = new Establishment_1.Establishment();
        this.editedEstablishment = new Establishment_1.Establishment();
        this.http = http;
        this.http2 = http2;
        this.dbId = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
        this.fetchEstablishment(this.dbId);
        this.editFlag = false;
        this.usersMatch = false;
        //setTimeout(this.usersMatch = this.checkIfUsersMatch(), 3000);
        //this.usersMatch = this.checkIfUsersMatch();
    }
    EstablishmentDetails.prototype.fetchEstablishment = function (id) {
        var _this = this;
        var request = this.http.request("/api/EstablishmentsApi/" + id.toString());
        request.subscribe(function (response) {
            var x = response.json(); //.map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber))
            _this.establishment = x;
            _this.editedEstablishment = x;
            _this.checkIfUsersMatch();
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    EstablishmentDetails.prototype.handleEditButtonClick = function () {
        this.editFlag = true;
        //        alert(this.editFlag);
    };
    EstablishmentDetails.prototype.handleCategoryChange = function (value) {
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
    EstablishmentDetails.prototype.handleAddressChange = function (value) {
        this.editedEstablishment.Address = value;
        //alert(value);
    };
    EstablishmentDetails.prototype.handleCityChange = function (value) {
        this.editedEstablishment.City = value;
        //alert(value);
    };
    EstablishmentDetails.prototype.handlePostalCodeChange = function (value) {
        this.editedEstablishment.PostalCode = value;
        //alert(value);
    };
    EstablishmentDetails.prototype.handlePhoneChange = function (value) {
        this.editedEstablishment.PhoneNumber = value;
        //alert(value);
    };
    EstablishmentDetails.prototype.handleWHChange = function (value) {
        this.editedEstablishment.WorkingHours = value;
    };
    EstablishmentDetails.prototype.handleDoneButton = function () {
        var _this = this;
        this.http.put("/api/EstablishmentsApi/" + this.dbId, JSON.stringify(this.editedEstablishment), this.getJsonRequestOptions()).subscribe(function (response) { if (response.status == 200)
            _this.editFlag = false; }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    EstablishmentDetails.prototype.getJsonRequestOptions = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var opts = new http_1.RequestOptions();
        opts.headers = headers;
        return opts;
    };
    EstablishmentDetails.prototype.checkIfUsersMatch = function () {
        /*let request = this.http2.request("/api/ServicesApi/GetService/" + "bad-romance", this.getJsonRequestOptions()).subscribe((response: Response) => {
            if (response.status == 200) {
                this.usersMatch = true;
            }
            

        }, (error) => alert("Error: " + JSON.stringify(error)));*/
        var _this = this;
        var request = this.http2.post("/api/ServicesApi/GetService/", JSON.stringify({ un: this.establishment.Owner }), this.getJsonRequestOptions()).subscribe(function (response) {
            if (response.status == 200) {
                _this.usersMatch = true;
            }
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    EstablishmentDetails = __decorate([
        core_1.Component({
            selector: 'establishment-details',
            directives: [common_1.NgIf],
            template: "\n        <div class=\"well\">\n            <h4>Additional information: &nbsp; &nbsp;&nbsp;&nbsp;<span *ngIf=\"editFlag == false && usersMatch == true\" (click)=\"handleEditButtonClick()\" class=\"glyphicon glyphicon-pencil\" style=\"cursor: pointer\"></span></h4>\n            <div class=\"finedine-text\">\n                Category: <span *ngIf=\"editFlag == false\">{{establishment.CategoryName}}</span>\n                            <div *ngIf=\"editFlag == true\"> \n                                <input (click)=\"handleCategoryChange(1)\" type=\"radio\" name=\"category\" value=\"restaurant\" class=\"\"> Restaurant<br />\n                                <input (click)=\"handleCategoryChange(2)\" type=\"radio\" name=\"category\" value=\"fastfood\" class=\"\"> Fast Food<br />\n                                <input (click)=\"handleCategoryChange(3)\" type=\"radio\" name=\"category\" value=\"bar\" class=\"\"> Bar<br />\n                                <input (click)=\"handleCategoryChange(4)\" type=\"radio\" name=\"category\" value=\"coffeeshop\" class=\"\"> Coffee Shop\n                            </div>\n                <br />\n                Address: <span *ngIf=\"editFlag == false\">{{establishment.Address}}</span>\n                           <input #inputAddress (change)=\"handleAddressChange(inputAddress.value)\" type=\"text\" value=\"{{establishment.Address}}\" *ngIf=\"editFlag == true\">\n                <br />\n                City: <span *ngIf=\"editFlag == false\">{{establishment.PostalCode}} {{establishment.City}}</span>\n                        <input #inputCity (change)=\"handleCityChange(inputCity.value)\" type=\"text\" value=\"{{establishment.City}}\" *ngIf=\"editFlag == true\">\n                <br *ngIf=\"editFlag == true\" />\n                <span *ngIf=\"editFlag == true\">Postal Code</span>\n                        <input #inputPostalCode (change)=\"handlePostalCodeChange(inputPostalCode.value)\" type=\"text\" value=\"{{establishment.PostalCode}}\" *ngIf=\"editFlag == true\">\n                <br/>\n                Phone number: <span *ngIf=\"editFlag == false\">{{establishment.PhoneNumber}}</span>\n                                <input #inputPhone (change)=\"handlePhoneChange(inputPhone.value)\" type=\"text\" value=\"{{establishment.PhoneNumber}}\" *ngIf=\"editFlag == true\">\n                <br/>\n                Owner: {{establishment.Owner}}\n                <br />\n                Working hours: <span *ngIf=\"editFlag == false\">{{establishment.WorkingHours}}</span>\n                                <input #inputWH (change)=\"handleWHChange(inputWH.value)\" type=\"text\" value=\"{{establishment.WorkingHours}}\" *ngIf=\"editFlag == true\">\n                                <br/><br/><button (click)=\"handleDoneButton()\" *ngIf=\"editFlag == true\">Done</button>\n                \n                <div class=\"center-align\" style=\"padding-top:5px;\">\n                    <br/>\n                    <span *ngIf=\"establishment.MainRating > 0.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 1.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 2.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 3.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 4.5\" class=\"glyphicon glyphicon-star\"></span>\n\n                    <span *ngIf=\"establishment.MainRating < 0.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 1.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 2.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 3.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 4.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <p class=\"main-rating\"> {{establishment.MainRating}} / 5.0 </p>\n                </div>\n            </div>\n        </div>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Http])
    ], EstablishmentDetails);
    return EstablishmentDetails;
})();
exports.EstablishmentDetails = EstablishmentDetails;
browser_1.bootstrap(EstablishmentDetails, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=app.js.map