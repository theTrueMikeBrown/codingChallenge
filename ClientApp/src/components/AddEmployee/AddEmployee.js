import React, { Component, Fragment } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal';
import './AddEmployee.css';

export class AddEmployee extends Component {
  state = { showModal: false, modalText: '' };

  showModal = (text) => {
    this.setState({ showModal: true, modalText: text });
  };

  hideModal = () => {
    this.setState({ showModal: false, modalText: '' });
  };

  constructor(props) {
    super(props);

    this.previewCosts = this.previewCosts.bind(this);
  }

  previewCosts(employee) {
    let isDiscount = function (name) {
      //This is of course assuming that "A" in your request means the letter A or a, not the capital letter A only.
      //I would talk to a product owner or a user to get determine this for real if this were an actual task.
      return name.toLocaleLowerCase().startsWith('a');
    };

    let applyDiscount = function (amount) {
      return amount * 0.9;
    }

    let calculateYearlyCost = function (employee) {
      //I am going to calculate cost in dollars even though I know that there are floating point issues with this.
      //for the sake of this exercise I believe that this will be accurate enough, however I recognize that this is not a perfect solution.
      let cost = isDiscount(employee.name) ? applyDiscount(1000) : 1000;
      let dependentsCost = employee.dependents.reduce((accumulator, current) => {
        return accumulator + (isDiscount(current.name) ? applyDiscount(500) : 500)
      }, 0);

      return cost + dependentsCost;
    };

    let formatMoney = (n) => n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    let yearlyCost = calculateYearlyCost(employee);
    let costPerPaycheck = yearlyCost / 26;
    let grossPaycheck = 2000;
    let netPaycheck = grossPaycheck - costPerPaycheck;

    this.showModal(`${employee.name} will make $${formatMoney(netPaycheck)} each paycheck.\n` +
      `He/she will pay $${formatMoney(costPerPaycheck)} for benefits each paycheck.\n` +
      `This amounts to $${formatMoney(yearlyCost)} yearly.\n` +
      ``);
  }

  render() {
    return (
      <Fragment>
        <Modal showModal={this.state.showModal} handleClose={this.hideModal}>
          <pre>{this.state.modalText}</pre>
        </Modal>

        <div>
          <h1>Add Employee</h1>
          <p>Enter data about the employee here.</p>

          <Formik
            initialValues={{ name: '', dependents: [] }}
            onSubmit={(values, { setSubmitting }) => {
              //TODO: Since I have completed the requirements of the challenge, I end here.
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required('Required'),
            })}>
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;

              return (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="employee name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}

                  <fieldset style={{ margin: '1em' }}>
                    <legend>Dependents:</legend>
                    <FieldArray
                      name="dependents"
                      render={arrayHelpers => (
                        <div>
                          {values.dependents && values.dependents.length > 0 ? (
                            values.dependents.map((dependent) => (
                              <div key={dependent.id}>
                                <Field name={`dependents.${dependent.id}.name`} placeholder="dependent name" />
                              </div>
                            ))
                          ) : ""}
                          <button type="button" onClick={() => arrayHelpers.push({ name: '', id: values.dependents.length })}>
                            Add a dependent
                          </button>
                        </div>
                      )}
                    />
                  </fieldset>

                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}>
                    Reset
                  </button>
                  <button type="button"
                    onClick={() => this.previewCosts(values)}
                    disabled={isSubmitting}>
                    Preview benefits costs
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Submit (TODO)
                  </button>
                </form>
              );
            }}
          </Formik>

        </div>
      </Fragment>
    );
  }
}