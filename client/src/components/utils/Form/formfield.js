import React from "react";

const FormField = ({ id, formdata, change }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}

            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}

            <textarea
              {...formdata.config}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >{formdata.value}</textarea>
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}

            <select
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options.map(({key,value}) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
