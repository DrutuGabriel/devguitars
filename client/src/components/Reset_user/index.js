import React, { Component } from 'react';
import axios from 'axios';
import {USER_SERVER} from '../utils/misc';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class ResetUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'reset_email');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'reset_email');
    let formIsValid = isFormValid(this.state.formdata, 'reset_email');

    if (formIsValid) {
      axios.post(`${USER_SERVER}/reset-user`, dataToSubmit)
        .then(resp => {
          if(resp.data.success){
            this.setState({
              formSuccess: true
            });
          }
        })
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id="email"
            formdata={this.state.formdata.email}
            change={(el) => this.updateForm(el)}
          />
          {
            this.state.formSuccess ?
              <div className="form_success">
                Done, check your email
              </div>
            : null
          }
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}

          <button onClick={(event) => this.submitForm(event)}>
            Send email to reset password
          </button>
        </form>
      </div>
    );
  }
}

export default ResetUser;
