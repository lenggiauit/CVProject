using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public partial class PMContext : DbContext
    {
        public static readonly ILoggerFactory loggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });
        string GetConnectionString()
        {
            string connStr = string.Empty;
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
            var root = builder.Build();
            connStr = root.GetConnectionString("DefaultConnection");
            return connStr;
        }
        public PMContext()
        {
        }

        public PMContext(DbContextOptions<PMContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Conversation> Conversation { get; set; }
        public virtual DbSet<ConversationMessage> ConversationMessage { get; set; }
        public virtual DbSet<ConversationUsers> ConversationUsers { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }
        public virtual DbSet<PermissionInRole> PermissionInRole { get; set; }
        public virtual DbSet<Priority> Priority { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectStatus> ProjectStatus { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Team> Team { get; set; }
        public virtual DbSet<Todo> Todo { get; set; }
        public virtual DbSet<TodoStatus> TodoStatus { get; set; }
        public virtual DbSet<TodoType> TodoType { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserOnProject> UserOnProject { get; set; }
        public virtual DbSet<UserOnTeam> UserOnTeam { get; set; } 
        public virtual DbSet<TemplateType> TemplateType { get; set; }
        public virtual DbSet<Template> Template { get; set; }
        public virtual DbSet<Control> Control { get; set; }
        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<CSSContent> CSSContent { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(loggerFactory)
           .EnableSensitiveDataLogging()
           .UseSqlServer(GetConnectionString());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CommentContent).HasColumnName("Comment");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                
            });

            modelBuilder.Entity<Conversation>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastMessage).HasMaxLength(500);

                entity.Property(e => e.LastMessageDate).HasColumnType("datetime");

                entity.Property(e => e.Title).HasMaxLength(250);
            });

            modelBuilder.Entity<ConversationMessage>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.LovedByUids)
                    .HasColumnName("LovedByUIds")
                    .HasMaxLength(1000);

                entity.Property(e => e.Message).HasMaxLength(1500);

                entity.Property(e => e.SeenByUids)
                    .HasColumnName("SeenByUIds")
                    .HasMaxLength(1000);

                entity.Property(e => e.SendDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<ConversationUsers>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<PermissionInRole>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

               
            });

            modelBuilder.Entity<Priority>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(250);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);

                
            });

            modelBuilder.Entity<ProjectStatus>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.IsSystemRole).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsPublic).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

               
            });

            modelBuilder.Entity<TodoStatus>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<TodoType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Color).HasMaxLength(20);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address).HasMaxLength(250);

                entity.Property(e => e.Avatar).HasMaxLength(255);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.FullName).HasMaxLength(150);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.JobTitle).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(250);

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .IsFixedLength();

                entity.Property(e => e.UserName).HasMaxLength(250);
 
            });

            modelBuilder.Entity<UserOnProject>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                
            });

            modelBuilder.Entity<UserOnTeam>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                
            });

            modelBuilder.Entity<TemplateType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.IsArchived).HasDefaultValue(false);

            });

            modelBuilder.Entity<Template>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.IsArchived).HasDefaultValue(false);

            });

            modelBuilder.Entity<Control>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100); 

            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);

            });

            modelBuilder.Entity<CSSContent>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(100);

            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
