# IAValidator
IAValidator.js provides a declarative way of validating HTML Fields.
This is a validation framework built over Validate.js (https://validatejs.org/) that helps you to apply validations instantly just by 
adding HTML5 attributes and calling the binding function.
IAValidator.js is an open source component of InfoAxon Technologies.

## Getting Started

### Installing
Currently only client side javascript version is available.

### Browser/CDN

```
<script src="https://drive.google.com/uc?export=view&id=1Wpqd2sSUZc30YgqFiyk0ERY39a8Fo5Oe"></script>
```

### Dependencies
There is only one external dependency i.e. **JQuery**! You may include this CDN to resolve this.

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
```

Also, you can override the error class you want in your error msgs by overriding the global variable errorClass after 
loading this script.

### Supported Runtimes
IAValidator.js works with any ECMAScript 6.0 runtime which means it works in both the browser and in node.js

All modern browsers are supported (MicrosoftEdge 14+, Firefox 54+, Opera 55+, Safari 10+, Chrome 58+).

## Examples
You can find one basic example included in the [project](https://github.com/EnEm177/IAValidator/blob/master/Sample).

They are meant to give a feeling for how to use the library and should not be considered production ready code.

## Vaidations Functions

### Binding Functions
These methods must be used to bind all your input, select and textarea elements for validation after rendering your HTML.

* **iaValidator.bindElementsValidationByID(parentID)** - pass the ID of the element which is parent to all fields.
```
<script>iaValidator.bindElementsValidationByID('validationDivID')</script>
```
* **iaValidator.bindElementsValidationByClass('validationDivClass')** - pass the common class of the parents under which all required fields exists.
```
<script>iaValidator.bindElementsValidationByClass('validation-fields')</script>
```
* **iaValidator.bindElementsValidationByID(parendID)** - pass your own selector to the parents of fields.
```
<script>iaValidator.bindElementsValidationByID('#divID .divClass')</script>
```

### Verify Functions
These methods must be used to check if the fields are already valid before further processing or to explicitly perform validations. 
Returns **true** or **false**

* **iaValidator.validateSectionByID(parentID)** - pass the ID of the element which is parent to all fields.
```
<script>iaValidator.validateSectionByID('validationDivID')</script>
```
* **iaValidator.validateSectionByClass('validationDivClass')** - pass the common class of the parents under which all required fields exists.
```
<script>iaValidator.validateSectionByClass('validation-fields')</script>
```
* **iaValidator.validateSection(parendID)** - pass your own selector to the parents of fields.
```
<script>iaValidator.validateSection('#divID .divClass')</script>
```
* **iaValidator.validateElementByID(elementID)** - pass the ID of element you want to validate.
```
<script>iaValidator.validateElementByID('fieldID')</script>
```
* **iaValidator.validateElementsByClass(elementsClass)** - pass the Class of elements you want to validate.
```
<script>iaValidator.validateElementsByClass(fieldsClass')</script>
```

## Vaidation Attributes

### data-input
This attribute must be used to restrict the user's input to definite keys. Below are the restrictions available:

* **number** - This will only allow digits in that particular field. **For example - mobile, aadhar, pincode**
* **alphabets** - This will only allow alphabets in that particular field. **For example - firstName, lastName**
* **alphanumeric** - This will only allow both alphabets & digits in that particular field but no special character.  
**For example - PAN**
* **alphabetSpace** - This will only allow both alphabets & digits & **Space** character in that particular field.
**For example - fullName**

```
<input type="text" name="pan" data-input="alphanumeric" />
```

**Note - All the input elements of type='tel' are restricted with digits by default.*

### data-validation
This attribute must be used to define the type of validation the element must have. Below are the constraints available:

* **creditCard** - Checks for valid Credit Card number.
* **regNumber** -  Checks for vehicle registration number. Chunks can also be separated by '-' (Hyphen) or ' ' (Space).
* **email** - Checks for valid email address.
* **mobile** - 10 is max & min length. Check for valid mobile number.
* **pincode** - 6 is max & min length. Check for only digits.
* **pan** - 10 is max & min length. Check for valid PAN.
* **aadhar** -  12 is max & min length. Check for only digits.
* **fullName** - Allowed names separated by [Space]. Don't allow extra spaces.
* **date** - Checks for date in format DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY
* **address** - Maximum length allowed is 100. Allows all characters that are valid for address.
* **age** - Allowed age is 1-119 inclusive.
* **alphabets** - Checks for only alphabets.
* **number** - Checks for only digits.
* **alphanumeric** - Checks for both alphabets & digits.
* **required** - Checks that the field is not empty.

```
<input type="text" name="regNumber" data-validation="regNumber" />
```

**Note -**
* **All the fields become mandatory after applying above validations for now**
* **All the input fields with type="checkbox" can only have data-validation="required"**

## How To Apply Vaidations

Step 1: Prepare an HTML Page containg input fields and provide an ID or Class to its parent.

```
<form id="formFields">
  <div>
      <input type="text" name="fullName" />
  </div>
  <div>
      <input type="tel" name="mobile" />
  </div>
  <div>
      <select name="city">
          <options value="">Select</options> 
          <options value="New Delhi">New Delhi</options> 
          <options value="Mumbai">Mumbai</options> 
      </select>
  </div>
</form>
```

Step 2: Add HTML5 Data attributes with values discussed above as required.

```
<form id="formFields">
  <div>
      <input type="text" name="fullName" data-validation="fullName" data-input="alphabetSpace"/> //adding data-validation & data-input
  </div>
  <div>
      <input type="text" name="mobile" data-validation="mobile" data-input="number"/>
  </div>
  <div>
      <select name="city" data-validation="required">
          <options value="">Select</options> 
          <options value="New Delhi">New Delhi</options> 
          <options value="Mumbai">Mumbai</options> 
      </select>
  </div>
</form>
```

Step 3: Call any of the binding functions discussed above after rendering the HTML.

```
<script>
  $(document).ready(funtion(){
      iaValidator.bindElementsValidationByID('formFields');
      // This binds all input fields with input, blur and change events
  });
</script>
```

Note: That's it now all input elements will validate themselves. You're good to go.

Step 4: To validation the required elements on particular event call Validate Functions.

```
    <form id="formFields" action="" onsubmit="return validateSectionByID('formFields')">
        ...
        ...
        <button type="submit">Submit</button>
    </form>
```

**Congrats! Now you have saved a lot of time with validations**


## Authors

* **Nitin Mittal** - *Initial Version* - [InfoAxon Technologies](http://infoaxon.com/)

## Acknowledgements

* The design of this readme has been heavily inspired by backbonejs.org.
* Many of the validators have been inspired by Validate.js.
* The inspiration comes by Muthoot Project under InfoAxon Technologies

