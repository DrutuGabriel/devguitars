import React, { Component } from "react";
import UserLayout from "../../../hoc/user";
import { connect } from "react-redux";
import { getBrands, getWoods } from "../../../actions/products_actions";

import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
} from "../../utils/Form/formActions";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
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
        showLabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Enter your description",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Enter your price",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product brand",
          name: "brand_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Available in stock",
          name: "available_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      wood: {
        element: "select",
        value: "",
        config: {
          label: "Wood material",
          name: "wood_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      frets: {
        element: "select",
        value: "",
        config: {
          label: "Frets",
          name: "frets_input",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish",
          name: "publish_input",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
    },
  };

  renderFormFields = (fieldsList) =>
    fieldsList.map((fieldName) => (
      <FormField
        key={fieldName}
        id={fieldName}
        formdata={this.state.formdata[fieldName]}
        change={(element) => this.updateForm(element)}
      />
    ));

  submitForm = (event) => {};

  updateForm = (event) => {};

  updateFields = (formdata) => {
    this.setState({formdata});
  }

  componentDidMount(){
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands())
      .then(response => {
        
        const newFormdata = populateOptionFields(
          formdata, this.props.products.brands, 'brand'
        );

        this.updateFields(newFormdata);
      });

      this.props.dispatch(getWoods())
      .then(response => {

        const newFormdata = populateOptionFields(
          formdata, this.props.products.woods, 'wood'
        );

        this.updateFields(newFormdata);
      });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>

          <form onSubmit={(event) => this.submitForm(event)}>
            {this.renderFormFields(["name", "description", "price"])}

            <div className="form_devider"></div>

            {this.renderFormFields(["brand", "shipping", "available"])}

            <div className="form_devider"></div>

            {this.renderFormFields(["wood", "frets", "publish"])}


            {this.state.formSuccess?
              <div className="form_success">
                Success
              </div>
            : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}

            <button onClick={(event) => this.submitForm(event)}>
              Add product
            </button>

          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(AddProduct);
