using System;
using System.Collections.Generic;
using System.Linq;
using employee_website.Domain;
using Microsoft.AspNetCore.Mvc;

namespace employee_website.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        public List<Employee> TempEmployees { get; set; } = new List<Employee> {
            new Employee{ Name = "Primus" }
        };

        [HttpGet()]
        public IEnumerable<Employee> GetEmployees()
        {
            return TempEmployees;
        }

        [HttpPost()]
        public void PostEmployees(Employee employee)
        {
            TempEmployees.Add(employee);
        }
    }
}
