
export const validate = (element, formdata = []) => {
  let message = '';
  let valid = true;
  let validData = [valid, message];

  if(element.validation.email){
    valid = /\S+@\S+\.\S+/.test(element.value);
    message = `${!valid ? 'Must be a valid email':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  if(element.validation.confirm){
    valid = element.value.trim() === formdata[element.validation.confirm].value.trim();
    message = `${!valid ? 'Passwords do not match':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  if(element.validation.required){
    valid = element.value.trim() !== '';
    message = `${!valid ? 'This field is required':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  return validData;
}

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };

  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if(element.blur){
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;
  
  return newFormdata;
}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for(let key in formdata){
    if(key == 'confirmPassword'){
      continue;
    }

    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;

  for(let key in formdata){
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
}