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
var router_1 = require('angular2/router');
var SearchList = (function () {
    function SearchList(http, http2) {
        this.keyword = "";
        this.http = http;
        this.http2 = http2;
        this.establishments = [];
        this.searchResults = [];
        this.fetchEstablishments();
    }
    SearchList.prototype.fetchEstablishments = function () {
        var _this = this;
        var request = this.http.get("/api/EstablishmentsApi/");
        request.subscribe(function (response) {
            _this.establishments = response.json().map(function (estbl) { return new Establishment_1.Establishment(estbl.Id, estbl.Name, estbl.Address, estbl.WorkingHours, estbl.MainRating, estbl.Description, estbl.PhoneNumber, estbl.CategoryName, estbl.PostalCode, estbl.City, estbl.Owner); });
            _this.searchResults = _this.establishments;
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    SearchList.prototype.onKeywordChange = function (value) {
        this.keyword = value;
        this.searchResults = this.filterSearchResults();
    };
    SearchList.prototype.filterSearchResults = function () {
        var _this = this;
        if (this.keyword == null || this.keyword.trim() == "") {
            return this.establishments;
        }
        this.keyword = this.keyword.toLowerCase();
        return this.establishments.filter(function (item) { return item.Name.toLowerCase().indexOf(_this.keyword) != -1; });
    };
    SearchList = __decorate([
        core_1.Component({
            selector: 'search-list',
            directives: [common_1.NgIf, common_1.NgFor],
            inputs: ["establishments"],
            template: "\n            <input #searchBar (keyup)=\"onKeywordChange(searchBar.value)\"  type=\"text\" class=\"form-control searchbar\" style=\"width:100%\" placeholder=\"What are you looking for?\">\n            <br/>\n            <p class=\"links\">\n                <a href=\"/Establishments/Create\">Create New</a>\n            </p>\n            <div *ngFor=\"#establishment of searchResults\">\n                <div class=\"media\">\n                        <div class=\"media-left\">\n                            <a href=\"#\">\n                                <img class=\"media-object\" src=\"./../img/restaurant_icon.jpg\" alt=\"Restaurant icon\">\n                            </a>\n                        </div>\n                        <div class=\"media-body\">\n                            <h4 class=\"media-heading links\"><a href=\"/Establishments/Details/{{establishment.Id}}\">{{establishment.Name}}</a></h4>\n                            {{establishment.Address}}<br/>\n                            Main rating: {{establishment.MainRating}}\n                        </div>\n                        <div class=\"media-right links\">\n                            <span><a href=\"/Establishments/Edit/{{establishment.Id}}\">Edit</a></span>\n                            <span><a href=\"/Establishments/Details/{{establishment.Id}}\">Details</a></span>\n                            <span><a href=\"/Establishments/Delete/{{establishment.Id}}\">Delete</a></span>\n                        </div>\n                    </div>\n                <hr/>     \n            </div>      \n"
        }), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Http])
    ], SearchList);
    return SearchList;
})();
exports.SearchList = SearchList;
browser_1.bootstrap(SearchList, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=search.js.map