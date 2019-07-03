import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './AddEmployee.css';

export class AddEmployee extends Component {
  displayName = AddEmployee.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <p>Enter data about the employee here.</p>

        <Formik
          initialValues={{ name: '' }}
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
                <label htmlFor="name" style={{ display: 'block' }}>
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

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}>
                  Reset
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