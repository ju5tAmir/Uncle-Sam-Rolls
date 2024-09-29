using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess
{
    [Table("paper_properties")]
    public partial class PaperProperty
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Paper")]
        public int PaperId { get; set; }

        [ForeignKey("Property")]
        public int PropertyId { get; set; }

        public virtual Paper Paper { get; set; } = null!;
        public virtual Property Property { get; set; } = null!;
    }
}