namespace FineDine.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstName : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        Rating = c.Int(nullable: false),
                        DateTime = c.DateTime(nullable: false),
                        Author_Id = c.String(maxLength: 128),
                        Establishment_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Author_Id)
                .ForeignKey("dbo.Establishments", t => t.Establishment_Id)
                .Index(t => t.Author_Id)
                .Index(t => t.Establishment_Id);
            
            CreateTable(
                "dbo.Establishments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Adress = c.String(),
                        WorkingHours = c.String(),
                        MainRating = c.Double(nullable: false),
                        Description = c.String(),
                        Category_Id = c.Int(),
                        Location_Id = c.Int(),
                        Owner_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .ForeignKey("dbo.Locations", t => t.Location_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Owner_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.Location_Id)
                .Index(t => t.Owner_Id);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(),
                        PostCode = c.String(),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
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
            
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "FullName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "Location_Id", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "Location_Id");
            AddForeignKey("dbo.AspNetUsers", "Location_Id", "dbo.Locations", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TagEstablishments", "Establishment_Id", "dbo.Establishments");
            DropForeignKey("dbo.TagEstablishments", "Tag_Id", "dbo.Tags");
            DropForeignKey("dbo.Establishments", "Owner_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "Location_Id", "dbo.Locations");
            DropForeignKey("dbo.Establishments", "Location_Id", "dbo.Locations");
            DropForeignKey("dbo.Comments", "Establishment_Id", "dbo.Establishments");
            DropForeignKey("dbo.Establishments", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Comments", "Author_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TagEstablishments", new[] { "Establishment_Id" });
            DropIndex("dbo.TagEstablishments", new[] { "Tag_Id" });
            DropIndex("dbo.Establishments", new[] { "Owner_Id" });
            DropIndex("dbo.Establishments", new[] { "Location_Id" });
            DropIndex("dbo.Establishments", new[] { "Category_Id" });
            DropIndex("dbo.Comments", new[] { "Establishment_Id" });
            DropIndex("dbo.Comments", new[] { "Author_Id" });
            DropIndex("dbo.AspNetUsers", new[] { "Location_Id" });
            DropColumn("dbo.AspNetUsers", "Location_Id");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "FullName");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropTable("dbo.TagEstablishments");
            DropTable("dbo.Tags");
            DropTable("dbo.Locations");
            DropTable("dbo.Categories");
            DropTable("dbo.Establishments");
            DropTable("dbo.Comments");
        }
    }
}
