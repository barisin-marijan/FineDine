import {Component, View} from "angular2/core"
import {bootstrap}    from 'angular2/platform/browser'

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
export class TodoApp {
    private jozo: number = 0;
}

bootstrap(TodoApp, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

