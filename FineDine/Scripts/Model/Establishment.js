var Establishment = (function () {
    function Establishment(id, name, adress, workinghours, mainrating, description, phonenumber, categoryname, postalcode, city, owner) {
        if (id === void 0) { id = -1; }
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
    return Establishment;
})();
exports.Establishment = Establishment;
//# sourceMappingURL=Establishment.js.map