var Establishment = (function () {
    function Establishment(id, name, adress, workinghours, mainrating, description, phonenumber) {
        if (id === void 0) { id = -1; }
        this.Name = name;
        this.Address = adress;
        this.WorkingHours = workinghours;
        this.Description = description;
        this.PhoneNumber = phonenumber;
        this.MainRating = mainrating;
        this.Id = id;
    }
    return Establishment;
})();
exports.Establishment = Establishment;
//# sourceMappingURL=Establisment.js.map