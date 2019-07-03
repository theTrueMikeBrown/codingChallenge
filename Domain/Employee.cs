using System.Collections.Generic;

namespace employee_website.Domain
{
    public class Employee
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public IEnumerable<Dependent> Dependents {get; set; }
    }
}