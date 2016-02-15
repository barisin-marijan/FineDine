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
    function EstablishmentDetails(http) {
        this.establishment = new Establishment_1.Establishment();
        this.http = http;
        this.dbId = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
        this.fetchEstablishment(this.dbId);
    }
    EstablishmentDetails.prototype.fetchEstablishment = function (id) {
        var _this = this;
        var request = this.http.request("/api/EstablishmentsApi/" + id.toString());
        request.subscribe(function (response) {
            var x = response.json(); //.map(estbl => new Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber))
            _this.establishment = x;
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    EstablishmentDetails = __decorate([
        core_1.Component({
            selector: 'establishment-details',
            directives: [common_1.NgIf],
            template: "\n        <div class=\"well\">\n            <h4>Additional information:</h4>\n            <div class=\"finedine-text\">\n                Category: {{establishment.CategoryName}}\n                <br />\n                Address: {{establishment.Address}}\n                <br />\n                City: {{establishment.PostalCode}} {{establishment.City}}\n                <br/>\n                Phone number: {{establishment.PhoneNumber}}\n                <br/>\n                Owner: {{establishment.Owner}}\n                <br />\n                Working hours: {{establishment.WorkingHours}}\n                <div class=\"center-align\" style=\"padding-top:5px;\">\n                    <br/>\n                    <span *ngIf=\"establishment.MainRating > 0.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 1.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 2.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 3.5\" class=\"glyphicon glyphicon-star\"></span>\n                    <span *ngIf=\"establishment.MainRating > 4.5\" class=\"glyphicon glyphicon-star\"></span>\n\n                    <span *ngIf=\"establishment.MainRating < 0.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 1.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 2.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 3.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <span *ngIf=\"establishment.MainRating < 4.5\" class=\"glyphicon glyphicon-star-empty\"></span>\n                    <p class=\"main-rating\"> {{establishment.MainRating}} / 5.0 </p>\n                </div>\n            </div>\n        </div>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EstablishmentDetails);
    return EstablishmentDetails;
})();
exports.EstablishmentDetails = EstablishmentDetails;
browser_1.bootstrap(EstablishmentDetails, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=app.js.map