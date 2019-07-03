import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
  displayName = Home.name
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get('api/Employees')
      .then(result => this.setState({
        employees: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  static renderEmployeeList(employees) {
    return (
        <ul>
        {employees.map(employee =>
            <li key={employee.id}>
              <span>{employee.name}</span>
            </li>
          )}
        </ul>
    );
  }

  render() {
    let contents = this.state.isLoading
      ? <p><em>Loading...</em></p>
      : Home.renderEmployeeList(this.state.employees);

    return (
      <div>
        <h2>Employees</h2>
        {contents}
      </div>
    );
  }
}
