export class Comment {
    public Id: number;
    public Content: string;    
    public Rating: number;
    public Date: string;    
    public Author: string;
    public EstablishmentId: number;    

    constructor(id: number = -1, Content?: string, Rating?: number, Date?: string, Author?: string, EstablishmentId?: number) {


        this.Content = Content
        this.Rating = Rating;
        this.Date = Date;
        this.Author = Author;
        this.EstablishmentId = EstablishmentId;        
        this.Id = id;       
    }
}
