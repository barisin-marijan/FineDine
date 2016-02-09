export class Establishment {
    public Id: number;
    public Name: string;
    public Address: string;
    public WorkingHours: string;
    public MainRating: number;
    public Description: string;
    public PhoneNumber: string;
    public CategoryName: string;
    public PostalCode: string;
    public City: string;
    public Owner: string;

    constructor(id: number = -1, name?: string, adress?: string, workinghours?: string, mainrating?: number, description?: string, phonenumber?: string, categoryname?: string, postalcode?: string, city?: string, owner?: string) {


        this.Name = name;
        this.Address = adress;
        this.WorkingHours = workinghours;
        this.Description = description;
        this.PhoneNumber = phonenumber;
        this.MainRating = mainrating;
        this.Id = id;
        this.CategoryName = categoryname;
        this.PostalCode = postalcode;
        this.City = city;
        this.Owner = owner;
    }
}
