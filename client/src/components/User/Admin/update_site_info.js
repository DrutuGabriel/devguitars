import React, { Component } from "react";
import { connect } from "react-redux";
import { getSiteData } from '../../../actions/site_actions';
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from "../../utils/Form/formActions";

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter the site address",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter the site working hours",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone number",
          name: "phone_input",
          type: "text",
          placeholder: "Enter the phone number",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Site email",
          name: "email_input",
          type: "email",
          placeholder: "Enter site email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
    },
  };

  componentDidMount(){
    this.props.dispatch(getSiteData())
      .then(() => {
        const newFormdata = populateFields(this.state.formdata, this.props.site.siteData[0]);
        this.setState({
          formdata: newFormdata
        });
      })
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "site_info");

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "site_info");
    let formIsValid = isFormValid(this.state.formdata, "site_info");

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
          <h1>Site info</h1>
          <FormField
            id="address"
            formdata={this.state.formdata.address}
            change={(el) => this.updateForm(el)}
          />
          <FormField
            id="hours"
            formdata={this.state.formdata.hours}
            change={(el) => this.updateForm(el)}
          />
          <FormField
            id="phone"
            formdata={this.state.formdata.phone}
            change={(el) => this.updateForm(el)}
          />
          <FormField
            id="email"
            formdata={this.state.formdata.email}
            change={(el) => this.updateForm(el)}
          />

          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}

            <button onClick={(event) => this.submitForm(event)}>
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps)(UpdateSiteInfo);
