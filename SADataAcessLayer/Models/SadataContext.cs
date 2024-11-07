using System;

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace SADataAcessLayer.Models;

public partial class SadataContext : DbContext
{


    public SadataContext()
    {
    }
    protected readonly IConfiguration Configuration;
    public SadataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    //public SadataContext(DbContextOptions<SadataContext> options)
    //    : base(options)
    //{
    //}
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {

        options.UseSqlServer(Configuration.GetConnectionString("MyConn"));
    }

    public virtual DbSet<Contact> Contacts { get; set; }

    

//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=DESKTOP-JIDK12G;Database=SAData;uid=sa;password=pwd;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contact__3214EC27E6FDB310");

            entity.ToTable("Contact");

            entity.HasIndex(e => e.Email, "UQ__Contact__A9D105349B0CFBCB").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

    OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
