export class Establishment {
    public Id: number;
    public Name: string;
    public Address: string;
    public WorkingHours: string;
    public MainRating: number;
    public Description: string;
    public PhoneNumber: string;

    constructor(id: number = -1, name?: string, adress?: string, workinghours?: string, mainrating?: number, description?: string, phonenumber?: string) {


        this.Name = name;
        this.Address = adress;
        this.WorkingHours = workinghours;
        this.Description = description;
        this.PhoneNumber = phonenumber;
        this.MainRating = mainrating;
        this.Id = id;
    }
}
