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
var Establishment_1 = require("./../Model/Establishment");
//import {TodoItem} from "./Model/TodoItem"
//import {TodoInput} from "./Components/TodoInput"
//import {TodoProgress} from "./Components/TodoProgress"
//import {TodoList} from "./Components/TodoList"
//import {TodoService} from "./Services/TodoService"
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var EstablishmentDetails = (function () {
    function EstablishmentDetails() {
        this.establishment = new Establishment_1.Establishment();
        this.establishment.Id = Number.parseInt(document.getElementById("establishment-details").getAttribute("dbId"));
    }
    EstablishmentDetails = __decorate([
        core_1.Component({
            selector: 'establishment-details'
        }),
        core_1.View({
            template: "\n        <div class=\"well\">\n            <h4>Additional information:</h4>\n            <div class=\"finedine-text\">\n                Category: @Html.DisplayFor(model => model.Category.Name)\n                <br />\n                Adress: @Html.DisplayFor(model => model.Address)\n                <br />\n                City: @Html.DisplayFor(model => model.Location.PostCode) @Html.DisplayFor(model => model.Location.City)\n                <br/>\n                Phone number: @Html.DisplayFor(model => model.PhoneNumber)\n                <br/>\n                Owner: @Html.DisplayFor(model => model.Owner.UserName)\n                <br />\n                Working hours: @Html.DisplayFor(model => model.WorkingHours)\n                <div class=\"center-align\" style=\"padding-top:5px;\">\n                    <br/>\n                    <span class=\"glyphicon glyphicon-star\"></span>\n                    <span class=\"glyphicon glyphicon-star\"></span>\n                    <span class=\"glyphicon glyphicon-star\"></span>\n                    <span class=\"glyphicon glyphicon-star\"></span>\n                    <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    <p class=\"main-rating\"> @Html.DisplayFor(model => model.MainRating) / 5.0 </p>\n                </div>\n            </div>\n        </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], EstablishmentDetails);
    return EstablishmentDetails;
})();
exports.EstablishmentDetails = EstablishmentDetails;
browser_1.bootstrap(EstablishmentDetails, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=app.js.map