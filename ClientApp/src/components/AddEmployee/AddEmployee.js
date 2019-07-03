import React, { Component } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import './AddEmployee.css';

export class AddEmployee extends Component {
  displayName = AddEmployee.name

  constructor(props) {
    super(props);

    this.previewCosts = this.previewCosts.bind(this);
  }

  previewCosts(){ 
    debugger;
    alert("TODO");
  }

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <p>Enter data about the employee here.</p>

        <Formik
          initialValues={{ name: '', dependents: [] }}
          onSubmit={(values, { setSubmitting }) => {
            //TODO:
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
                  onClick={this.previewCosts}
                  disabled={isSubmitting}>
                  Preview benefits costs
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            );
          }}
        </Formik>

      </div>
    );
  }
}