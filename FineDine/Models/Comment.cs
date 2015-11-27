using System;

namespace FineDine.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public int EstablishmentId { get; set; }
        public virtual Establishment Establishment { get; set; }
        public int PersonalUserId { get; set; }
        public virtual PersonalUser PersonalUser { get; set; }
        public float CommentRating { get; set; }
        public DateTime DateTime { get; set; }
    }
}