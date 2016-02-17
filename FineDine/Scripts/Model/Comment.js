var Comment = (function () {
    function Comment(id, Content, Rating, Date, Author, EstablishmentId) {
        if (id === void 0) { id = -1; }
        this.Content = Content;
        this.Rating = Rating;
        this.Date = Date;
        this.Author = Author;
        this.EstablishmentId = EstablishmentId;
        this.Id = id;
    }
    return Comment;
})();
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map