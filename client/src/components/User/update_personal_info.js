import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from "../utils/Form/formActions";

class UpdatePersonalInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your lastname",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  componentDidMount() {
    const newFormdata = populateFields(
      this.state.formdata,
      this.props.user.userData
    );

    this.setState({formdata: newFormdata});
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "update_user");

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "update_user");
    let formIsValid = isFormValid(this.state.formdata, "update_user");

    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <h2>Personal information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id="name"
                formdata={this.state.formdata.name}
                change={(el) => this.updateForm(el)}
              />
            </div>
            <div className="block">
              <FormField
                id="lastname"
                formdata={this.state.formdata.lastname}
                change={(el) => this.updateForm(el)}
              />
            </div>
          </div>
          <div>
            <FormField
              id="email"
              formdata={this.state.formdata.email}
              change={(el) => this.updateForm(el)}
            />
          </div>
          <div>
            {this.state.formSuccess ? (
              <div className="form-success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}

            <button onClick={(event) => this.submitForm(event)}>
              Update profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProsp = state => ({
  user: state.user
});

export default connect(mapStateToProsp)(UpdatePersonalInfo);
