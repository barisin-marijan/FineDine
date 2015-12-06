namespace FineDine.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BusinessUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        ProfilePicture = c.Binary(),
                        Address = c.String(),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .Index(t => t.LocationId);
            
            CreateTable(
                "dbo.Establishments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Address = c.String(),
                        EstablishmentName = c.String(),
                        EstablishmentDescription = c.String(),
                        LocationId = c.Int(),
                        BusinessUserId = c.Int(),
                        MainRating = c.Single(nullable: false),
                        PhoneNumber = c.String(),
                        WorkingHours = c.String(),
                        CategoryId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusinessUsers", t => t.BusinessUserId)
                .ForeignKey("dbo.Categories", t => t.CategoryId)
                .ForeignKey("dbo.Locations", t => t.LocationId)
                .Index(t => t.LocationId)
                .Index(t => t.BusinessUserId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryType = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CommentContent = c.String(),
                        EstablishmentId = c.Int(nullable: false),
                        PersonalUserId = c.Int(nullable: false),
                        CommentRating = c.Single(nullable: false),
                        DateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Establishments", t => t.EstablishmentId, cascadeDelete: true)
                .ForeignKey("dbo.PersonalUsers", t => t.PersonalUserId, cascadeDelete: true)
                .Index(t => t.EstablishmentId)
                .Index(t => t.PersonalUserId);
            
            CreateTable(
                "dbo.PersonalUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        ProfilePicture = c.Binary(),
                        Address = c.String(),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .Index(t => t.LocationId);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(),
                        State = c.String(),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TagName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TagEstablishments",
                c => new
                    {
                        Tag_Id = c.Int(nullable: false),
                        Establishment_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Tag_Id, t.Establishment_Id })
                .ForeignKey("dbo.Tags", t => t.Tag_Id, cascadeDelete: true)
                .ForeignKey("dbo.Establishments", t => t.Establishment_Id, cascadeDelete: true)
                .Index(t => t.Tag_Id)
                .Index(t => t.Establishment_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TagEstablishments", "Establishment_Id", "dbo.Establishments");
            DropForeignKey("dbo.TagEstablishments", "Tag_Id", "dbo.Tags");
            DropForeignKey("dbo.PersonalUsers", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.Establishments", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.BusinessUsers", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.Comments", "PersonalUserId", "dbo.PersonalUsers");
            DropForeignKey("dbo.Comments", "EstablishmentId", "dbo.Establishments");
            DropForeignKey("dbo.Establishments", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Establishments", "BusinessUserId", "dbo.BusinessUsers");
            DropIndex("dbo.TagEstablishments", new[] { "Establishment_Id" });
            DropIndex("dbo.TagEstablishments", new[] { "Tag_Id" });
            DropIndex("dbo.PersonalUsers", new[] { "LocationId" });
            DropIndex("dbo.Comments", new[] { "PersonalUserId" });
            DropIndex("dbo.Comments", new[] { "EstablishmentId" });
            DropIndex("dbo.Establishments", new[] { "CategoryId" });
            DropIndex("dbo.Establishments", new[] { "BusinessUserId" });
            DropIndex("dbo.Establishments", new[] { "LocationId" });
            DropIndex("dbo.BusinessUsers", new[] { "LocationId" });
            DropTable("dbo.TagEstablishments");
            DropTable("dbo.Tags");
            DropTable("dbo.Locations");
            DropTable("dbo.PersonalUsers");
            DropTable("dbo.Comments");
            DropTable("dbo.Categories");
            DropTable("dbo.Establishments");
            DropTable("dbo.BusinessUsers");
        }
    }
}
