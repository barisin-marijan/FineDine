import {Establishment} from "./../Model/Establishment"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'


@Injectable()
export class EstablishmentService {
    public establishment: Establishment;
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.fetchEstablishment();
    }

    private fetchEstablishment() {
        let request = this.http.request("/api/TodoItems");

        request.subscribe((response: Response) => {
            this.todos = response.json().map(todo => new TodoItem(todo.Value, todo.Done, todo.ID))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public addTodo(value: string) {
        var todoItem = new TodoItem(value);
        this.todos.push(todoItem);

        this.http.post(
            "/api/TodoItems",
            JSON.stringify({ Value: value }),
            this.getJsonRequestOptions()
        ).subscribe((response: Response) => {
            todoItem.ID = response.json().ID;
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public removeTodo(todoItem: TodoItem): void {
        var index = this.todos.indexOf(todoItem);

        if (index != -1) {
            this.todos.splice(index, 1);
        }

        this.http.delete("/api/TodoItems/" + todoItem.ID).subscribe(
            (response: Response) => { },
            (error) => alert("Error: " + JSON.stringify(error))
        );
    }

    public updateTodoValue(todoItem: TodoItem, value: string) {
        todoItem.value = value;
        this.syncTodoItem(todoItem);
    }

    public updateTodoDone(todoItem: TodoItem, done: boolean) {
        todoItem.done = done;
        this.syncTodoItem(todoItem);
    }

    public completeAll(): void {
        this.toggleItems(true);
    }

    public resetAll(): void {
        this.toggleItems(false);
    }

    private toggleItems(done: boolean) {
        this.todos.forEach((todo) => todo.done = done);
        this.syncToggleChecked(done);
    }

    public removeDone(): void {
        this.todos = this.todos.filter(todo => !todo.done);

        this.http.delete("/api/TodoItems/RemoveDone").subscribe(
            (response: Response) => { },
            (error) => alert("Error: " + JSON.stringify(error))
        );
    }

    private syncTodoItem(todoItem: TodoItem): void {
        this.http.put(
            "/api/TodoItems/" + todoItem.ID,
            JSON.stringify({
                ID: todoItem.ID,
                Value: todoItem.value,
                Done: todoItem.done
            }),
            this.getJsonRequestOptions()
        ).subscribe(
            (response: Response) => { },
            (error) => alert("Error: " + JSON.stringify(error))
            );
    }

    private syncToggleChecked(done: boolean) {
        this.http.put("/api/TodoItems/ToggleChecked/" + done, "").subscribe(
            (response: Response) => { },
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
}
