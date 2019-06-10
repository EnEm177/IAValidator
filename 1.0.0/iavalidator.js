/*!
 * validate.js 0.12.0
 * http://validatejs.org/
 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
 * validate.js may be freely distributed under the MIT license.
*/

(function(a,b,c){"use strict";var d=function(a,b,c){c=e.extend({},e.options,c);var f=e.runValidations(a,b,c);if(f.some(function(a){return e.isPromise(a.error)}))throw new Error("Use validate.async if you want support for promises");return d.processValidationResults(f,c)},e=d;e.extend=function(a){return[].slice.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]}),a},e.extend(d,{version:{major:0,minor:12,patch:0,metadata:null,toString:function(){var a=e.format("%{major}.%{minor}.%{patch}",e.version);return e.isEmpty(e.version.metadata)||(a+="+"+e.version.metadata),a}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(a,b,c){var d,f,g,h,i,j,k,l=[];(e.isDomElement(a)||e.isJqueryElement(a))&&(a=e.collectFormValues(a));for(d in b){g=e.getDeepObjectValue(a,d),h=e.result(b[d],g,a,d,c,b);for(f in h){if(i=e.validators[f],!i)throw k=e.format("Unknown validator %{name}",{name:f}),new Error(k);j=h[f],j=e.result(j,g,a,d,c,b),j&&l.push({attribute:d,value:g,validator:f,globalOptions:c,attributes:a,options:j,error:i.call(i,g,j,d,a,c)})}}return l},processValidationResults:function(a,b){a=e.pruneEmptyErrors(a,b),a=e.expandMultipleErrors(a,b),a=e.convertErrorMessages(a,b);var c=b.format||"grouped";if("function"!=typeof e.formatters[c])throw new Error(e.format("Unknown format %{format}",b));return a=e.formatters[c](a),e.isEmpty(a)?void 0:a},async:function(a,b,c){c=e.extend({},e.async.options,c);var d=c.wrapErrors||function(a){return a};c.cleanAttributes!==!1&&(a=e.cleanAttributes(a,b));var f=e.runValidations(a,b,c);return new e.Promise(function(g,h){e.waitForResults(f).then(function(){var i=e.processValidationResults(f,c);i?h(new d(i,c,a,b)):g(a)},function(a){h(a)})})},single:function(a,b,c){return c=e.extend({},e.single.options,c,{format:"flat",fullMessages:!1}),e({single:a},{single:b},c)},waitForResults:function(a){return a.reduce(function(a,b){return e.isPromise(b.error)?a.then(function(){return b.error.then(function(a){b.error=a||null})}):a},new e.Promise(function(a){a()}))},result:function(a){var b=[].slice.call(arguments,1);return"function"==typeof a&&(a=a.apply(null,b)),a},isNumber:function(a){return"number"==typeof a&&!isNaN(a)},isFunction:function(a){return"function"==typeof a},isInteger:function(a){return e.isNumber(a)&&a%1===0},isBoolean:function(a){return"boolean"==typeof a},isObject:function(a){return a===Object(a)},isDate:function(a){return a instanceof Date},isDefined:function(a){return null!==a&&void 0!==a},isPromise:function(a){return!!a&&e.isFunction(a.then)},isJqueryElement:function(a){return a&&e.isString(a.jquery)},isDomElement:function(a){return a&&a.querySelectorAll&&a.querySelector?e.isObject(document)&&a===document?!0:"object"==typeof HTMLElement?a instanceof HTMLElement:a&&"object"==typeof a&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName:!1},isEmpty:function(a){var b;if(!e.isDefined(a))return!0;if(e.isFunction(a))return!1;if(e.isString(a))return e.EMPTY_STRING_REGEXP.test(a);if(e.isArray(a))return 0===a.length;if(e.isDate(a))return!1;if(e.isObject(a)){for(b in a)return!1;return!0}return!1},format:e.extend(function(a,b){return e.isString(a)?a.replace(e.format.FORMAT_REGEXP,function(a,c,d){return"%"===c?"%{"+d+"}":String(b[d])}):a},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(a){return e.isNumber(a)?100*a%1===0?""+a:parseFloat(Math.round(100*a)/100).toFixed(2):e.isArray(a)?a.map(function(a){return e.prettify(a)}).join(", "):e.isObject(a)?a.toString():(a=""+a,a.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(a,b,c){return""+b+" "+c.toLowerCase()}).toLowerCase())},stringifyValue:function(a,b){var c=b&&b.prettify||e.prettify;return c(a)},isString:function(a){return"string"==typeof a},isArray:function(a){return"[object Array]"==={}.toString.call(a)},isHash:function(a){return e.isObject(a)&&!e.isArray(a)&&!e.isFunction(a)},contains:function(a,b){return e.isDefined(a)?e.isArray(a)?-1!==a.indexOf(b):b in a:!1},unique:function(a){return e.isArray(a)?a.filter(function(a,b,c){return c.indexOf(a)==b}):a},forEachKeyInKeypath:function(a,b,c){if(e.isString(b)){var d,f="",g=!1;for(d=0;d<b.length;++d)switch(b[d]){case".":g?(g=!1,f+="."):(a=c(a,f,!1),f="");break;case"\\":g?(g=!1,f+="\\"):g=!0;break;default:g=!1,f+=b[d]}return c(a,f,!0)}},getDeepObjectValue:function(a,b){return e.isObject(a)?e.forEachKeyInKeypath(a,b,function(a,b){return e.isObject(a)?a[b]:void 0}):void 0},collectFormValues:function(a,b){var c,d,f,g,h,i,j={};if(e.isJqueryElement(a)&&(a=a[0]),!a)return j;for(b=b||{},g=a.querySelectorAll("input[name], textarea[name]"),c=0;c<g.length;++c)f=g.item(c),e.isDefined(f.getAttribute("data-ignored"))||(name=f.name.replace(/\./g,"\\\\."),i=e.sanitizeFormValue(f.value,b),"number"===f.type?i=i?+i:null:"checkbox"===f.type?f.attributes.value?f.checked||(i=j[name]||null):i=f.checked:"radio"===f.type&&(f.checked||(i=j[name]||null)),j[name]=i);for(g=a.querySelectorAll("select[name]"),c=0;c<g.length;++c)if(f=g.item(c),!e.isDefined(f.getAttribute("data-ignored"))){if(f.multiple){i=[];for(d in f.options)h=f.options[d],h&&h.selected&&i.push(e.sanitizeFormValue(h.value,b))}else{var k="undefined"!=typeof f.options[f.selectedIndex]?f.options[f.selectedIndex].value:"";i=e.sanitizeFormValue(k,b)}j[f.name]=i}return j},sanitizeFormValue:function(a,b){return b.trim&&e.isString(a)&&(a=a.trim()),b.nullify!==!1&&""===a?null:a},capitalize:function(a){return e.isString(a)?a[0].toUpperCase()+a.slice(1):a},pruneEmptyErrors:function(a){return a.filter(function(a){return!e.isEmpty(a.error)})},expandMultipleErrors:function(a){var b=[];return a.forEach(function(a){e.isArray(a.error)?a.error.forEach(function(c){b.push(e.extend({},a,{error:c}))}):b.push(a)}),b},convertErrorMessages:function(a,b){b=b||{};var c=[],d=b.prettify||e.prettify;return a.forEach(function(a){var f=e.result(a.error,a.value,a.attribute,a.options,a.attributes,a.globalOptions);return e.isString(f)?("^"===f[0]?f=f.slice(1):b.fullMessages!==!1&&(f=e.capitalize(d(a.attribute))+" "+f),f=f.replace(/\\\^/g,"^"),f=e.format(f,{value:e.stringifyValue(a.value,b)}),void c.push(e.extend({},a,{error:f}))):void c.push(a)}),c},groupErrorsByAttribute:function(a){var b={};return a.forEach(function(a){var c=b[a.attribute];c?c.push(a):b[a.attribute]=[a]}),b},flattenErrorsToArray:function(a){return a.map(function(a){return a.error}).filter(function(a,b,c){return c.indexOf(a)===b})},cleanAttributes:function(a,b){function c(a,b,c){return e.isObject(a[b])?a[b]:a[b]=c?!0:{}}function d(a){var b,d={};for(b in a)a[b]&&e.forEachKeyInKeypath(d,b,c);return d}function f(a,b){if(!e.isObject(a))return a;var c,d,g=e.extend({},a);for(d in a)c=b[d],e.isObject(c)?g[d]=f(g[d],c):c||delete g[d];return g}return e.isObject(b)&&e.isObject(a)?(b=d(b),f(a,b)):{}},exposeModule:function(a,b,c,d,e){c?(d&&d.exports&&(c=d.exports=a),c.validate=a):(b.validate=a,a.isFunction(e)&&e.amd&&e([],function(){return a}))},warn:function(a){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+a)},error:function(a){"undefined"!=typeof console&&console.error&&console.error("[validate.js] "+a)}}),d.validators={presence:function(a,b){return b=e.extend({},this.options,b),(b.allowEmpty!==!1?!e.isDefined(a):e.isEmpty(a))?b.message||this.message||"can't be blank":void 0},length:function(a,b,c){if(e.isDefined(a)){b=e.extend({},this.options,b);var d,f=b.is,g=b.maximum,h=b.minimum,i=b.tokenizer||function(a){return a},j=[];a=i(a);var k=a.length;return e.isNumber(k)?(e.isNumber(f)&&k!==f&&(d=b.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",j.push(e.format(d,{count:f}))),e.isNumber(h)&&h>k&&(d=b.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",j.push(e.format(d,{count:h}))),e.isNumber(g)&&k>g&&(d=b.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",j.push(e.format(d,{count:g}))),j.length>0?b.message||j:void 0):(e.error(e.format("Attribute %{attr} has a non numeric value for `length`",{attr:c})),b.message||this.notValid||"has an incorrect length")}},numericality:function(a,b,c,d,f){if(e.isDefined(a)){b=e.extend({},this.options,b);var g,h,i=[],j={greaterThan:function(a,b){return a>b},greaterThanOrEqualTo:function(a,b){return a>=b},equalTo:function(a,b){return a===b},lessThan:function(a,b){return b>a},lessThanOrEqualTo:function(a,b){return b>=a},divisibleBy:function(a,b){return a%b===0}},k=b.prettify||f&&f.prettify||e.prettify;if(e.isString(a)&&b.strict){var l="^-?(0|[1-9]\\d*)";if(b.onlyInteger||(l+="(\\.\\d+)?"),l+="$",!new RegExp(l).test(a))return b.message||b.notValid||this.notValid||this.message||"must be a valid number"}if(b.noStrings!==!0&&e.isString(a)&&!e.isEmpty(a)&&(a=+a),!e.isNumber(a))return b.message||b.notValid||this.notValid||this.message||"is not a number";if(b.onlyInteger&&!e.isInteger(a))return b.message||b.notInteger||this.notInteger||this.message||"must be an integer";for(g in j)if(h=b[g],e.isNumber(h)&&!j[g](a,h)){var m="not"+e.capitalize(g),n=b[m]||this[m]||this.message||"must be %{type} %{count}";i.push(e.format(n,{count:h,type:k(g)}))}return b.odd&&a%2!==1&&i.push(b.notOdd||this.notOdd||this.message||"must be odd"),b.even&&a%2!==0&&i.push(b.notEven||this.notEven||this.message||"must be even"),i.length?b.message||i:void 0}},datetime:e.extend(function(a,b){if(!e.isFunction(this.parse)||!e.isFunction(this.format))throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");if(e.isDefined(a)){b=e.extend({},this.options,b);var c,d=[],f=b.earliest?this.parse(b.earliest,b):NaN,g=b.latest?this.parse(b.latest,b):NaN;return a=this.parse(a,b),isNaN(a)||b.dateOnly&&a%864e5!==0?(c=b.notValid||b.message||this.notValid||"must be a valid date",e.format(c,{value:arguments[0]})):(!isNaN(f)&&f>a&&(c=b.tooEarly||b.message||this.tooEarly||"must be no earlier than %{date}",c=e.format(c,{value:this.format(a,b),date:this.format(f,b)}),d.push(c)),!isNaN(g)&&a>g&&(c=b.tooLate||b.message||this.tooLate||"must be no later than %{date}",c=e.format(c,{date:this.format(g,b),value:this.format(a,b)}),d.push(c)),d.length?e.unique(d):void 0)}},{parse:null,format:null}),date:function(a,b){return b=e.extend({},b,{dateOnly:!0}),e.validators.datetime.call(e.validators.datetime,a,b)},format:function(a,b){(e.isString(b)||b instanceof RegExp)&&(b={pattern:b}),b=e.extend({},this.options,b);var c,d=b.message||this.message||"is invalid",f=b.pattern;return e.isDefined(a)?e.isString(a)?(e.isString(f)&&(f=new RegExp(b.pattern,b.flags)),c=f.exec(a),c&&c[0].length==a.length?void 0:d):d:void 0},inclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),!e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is not included in the list";return e.format(c,{value:a})}},exclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is restricted";return e.format(c,{value:a})}},email:e.extend(function(a,b){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid email";if(e.isDefined(a))return e.isString(a)&&this.PATTERN.exec(a)?void 0:c},{PATTERN:/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i}),equality:function(a,b,c,d,f){if(e.isDefined(a)){e.isString(b)&&(b={attribute:b}),b=e.extend({},this.options,b);var g=b.message||this.message||"is not equal to %{attribute}";if(e.isEmpty(b.attribute)||!e.isString(b.attribute))throw new Error("The attribute must be a non empty string");var h=e.getDeepObjectValue(d,b.attribute),i=b.comparator||function(a,b){return a===b},j=b.prettify||f&&f.prettify||e.prettify;return i(a,h,b,c,d)?void 0:e.format(g,{attribute:j(b.attribute)})}},url:function(a,b){if(e.isDefined(a)){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid url",d=b.schemes||this.schemes||["http","https"],f=b.allowLocal||this.allowLocal||!1;if(!e.isString(a))return c;var g="^(?:(?:"+d.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",h="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";f?h+="?":g+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",g+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+h+")(?::\\d{2,5})?(?:[/?#]\\S*)?$";var i=new RegExp(g,"i");return i.exec(a)?void 0:c}}},d.formatters={detailed:function(a){return a},flat:e.flattenErrorsToArray,grouped:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=e.flattenErrorsToArray(a[b]);return a},constraint:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=a[b].map(function(a){return a.validator}).sort();return a}},d.exposeModule(d,this,a,b,c)}).call(this,"undefined"!=typeof exports?exports:null,"undefined"!=typeof module?module:null,"undefined"!=typeof define?define:null);
//# sourceMappingURL=validate.min.map

/*
 * iaValidator.js 1.0.0
 * Author: Nitin Mittal
 * Email: nitin.mittal@infoaxon.com
 * (c) InfoAxon Technologies
 * */

const errorClass = 'error';
const errorBlock = `<span class=${errorClass}></span>`;
const checkboxError = 'You must check the box to proceed.';

(function(){
    var iaValidator = {
        constraints :   {
            creditCard: {
                presence: {message: "^Credit Card is required"},
                format: {
                    pattern: /^(34|37|4|5[1-5]).*$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^%{num} is not a valid credit card number", {num:value});
                    }
                },
                length: function(value, attributes, attributeName, options, constraints) {
                    if (value) {
                        if ((/^(34|37).*$/).test(value)) return {is: 15};
                        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
                    }
                    return false;
                }
            },
            
            creditCardZip: function(value, attributes, attributeName, options, constraints) {
                if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
                return {
                    presence: {message: "^This field is required when using AMEX"},
                    length: {is: 15}
                };
            },
    
            age: {
                presence: {message: "^Age is required"},
                length: {
                    maximum: 3,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Age must not exceed 3 digits", {});
                    }
                },
                format: {
                    pattern: /^(1{1}[01]{1}[0-9]{1}|[1-9]{1}[0-9]{0,1})$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Hey, this is way much higher", {});
                    }
                }
            },
            
            regNumber: {
                presence: {message: "^Registration number is required"},
                format: {
                    pattern: /^(([A-Za-z]){2,3}(-|\s){0,1}([0-9]){1,2}(-|\s){0,1}([A-Za-z]){1,3}(-|\s){0,1}([0-9]){1,4})$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Enter a valid registration number", {});
                    }
                }
            },
            
            date: {
                presence: {message: "^Date is required"},
                format: {
                    pattern: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Enter date in a valid format", {});
                    }
                }
            },
            
            address: {
                presence: {message: "^This field is required"},
                length: {
                    maximum: 100,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This field cannot exceed 100 characters", {});
                    }
                },
                format: {
                    pattern: /^[A-Za-z0-9\s,\.-\/]+.$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Some invalid character is entered", {});
                    }
                }
            },
            
            addressOptional: {
                presence: false,
                length: {
                    maximum: 30,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This field cannot exceed 30 characters", {});
                    }
                },
                format: {
                    pattern: /^[A-Za-z0-9\s,\.-]+.$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Some invalid character is entered", {});
                    }
                }
            },
            
            email: {
                presence: {message: "^We need your email"},
                format: {
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This is not a valid email", {});
                    }
                }
            },
    
            mobile: {
                presence: {message: "^Mobile number is required"},
                length: {
                    minimum: 10, maximum: 10,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Hey, mobile number must be 10 digits", {});
                    }
                },
                format: {
                    pattern: /^[6-9]{1}[0-9]{9}$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Please provide a valid mobile number", {});
                    }
                }
            },
            
            pincode: {
                presence: {message: "^Pincode is required"},
                length: {
                    minimum: 6, maximum: 6,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Pincode must contain 6 digits", {});
                    }
                },
                format: {
                    pattern: /^[0-9]{6}$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Not a valid pincode.", {});
                    }
                }
            },
            
            pan: {
                presence: {message: "^PAN is required"},
                length: {
                    minimum: 10, maximum: 10,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^PAN must contain 10 characters", {});
                    }
                },
                format: {
                    pattern: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Not a valid PAN", {});
                    }
                }
            },
            
            aadhar: {
                presence: {message: "^Aadhar is required"},
                length: {
                    minimum: 12, maximum: 12,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Aadhar must contain 12 digits", {});
                    }
                },
                format: {
                    pattern: /^[0-9]{12}$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Not a valid aadhar", {});
                    }
                }
            },

            fullName: {
                presence: {message: "^This field is required"},
                format: {
                    pattern: /^(\w{2,30}|\w{2,30}(\s\w{2,30})*)$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^Enter a valid name", {});
                    }
                }
            },
            
            alphabets: {
                presence: {message: "^This field is required"},
                format: {
                    pattern: /^[a-zA-Z]+$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This field only contains alphabets", {});
                    }
                }
            },
            
            number: {
                presence: {message: "^This field is required"},
                format: {
                    pattern: /^[0-9]+$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^We need a valid number", {});
                    }
                }
            },
            
            alphanumeric: {
                presence: {message: "^This field is required"},
                format: {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This field only contains alphabets or digits.", {});
                    }
                }
            },
            
            required: {
                presence: {message: "^This field is required"},
                format: {
                    pattern: /^.*$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return this.validate.format("^This field is required", {});
                    }
                }
            }
            
        },

        bindElementsValidationByID  :   function(parentID){
            this.bindElementsValidation('#'+parentID);
        },

        bindElementsValidationByClass   :   function(parentsClass){
            this.bindElementsValidation('.'+parentsClass);
        },

        bindElementsValidation  :   function(parentSelector){
            $(parentSelector).find("input, select, textarea").each((j, _child) => {
                const child = $(_child);
                if(child.is("input[type='text']") || child.is("input[type='tel']")){
                    if(child.is("input[type='tel']")){
                        child.on("keypress", (event) => {
                            return this.isNumberKey(event);
                        });
                    }
                    
                    if(!(!child.data('input'))){
                        if(child.data('input') == 'alphanumeric' ){
                            child.on("keypress", (event) => {
                                return this.isAlphanumericKey(event);
                            });
                        } else if(child.data('input') == 'number' ){
                            child.on("keypress", (event) => {
                                return this.isNumberKey(event);
                            });
                        } else if (child.data('input') == 'alphabets' ){
                            child.on("keypress", (event) => {
                                return this.isAlphabetKey(event);
                            });
                        } else if (child.data('input') == 'alphabetSpace' ){
                            child.on("keypress", (event) => {
                                return this.isAlphabetSpaceKey(event);
                            });
                        }
                    }		
                        
                    //child.off("input");
                    child.on("input", (event) => {
                        this.bindValidations(event);
                    });
                    child.on("blur", (event) => {
                        this.bindValidations(event);
                    });
                    child.on("change", (event) => {
                        this.bindValidations(event);
                    });
                } else if(child.is("input") || child.is("textarea") || child.is("select") ){
                    //child.off("change");
                    child.on("change", (event) => {
                        this.bindValidations(event);
                    });
                }
            });
        },

        bindValidations :   function(event){
            const target = $(event.target);
            const vldType = target.data("validation");
            this.validateElement(target, vldType);
        },

        validateElement :   function(target, vldType){
            let vld = {};
            let error = "";
            let isFieldValid = true;
            
            if(target.prop('disabled'))
                return true;
            
            if(target.is("input[type='checkbox']")){
                if(target.data('validation') == 'required'){
                    if(target.prop("checked") == true){
                        this.removeCheckboxValidationError(target);
                        return true;
                    } else {
                        this.showCheckboxValidationError(target, checkboxError);
                        return false;
                    }
                }
            }
            
            if(!(!(vldType))){
                const obj = {};
                if(String(target.val()) != ""){
                    obj[vldType] = String(target.val());
                }			
                vld = validate(obj, this.constraints);
                isFieldValid = !(vld[String(vldType)]);
            }
        
            if(isFieldValid) {
                this.removeValidationError(target);	
            } else {
                error = String(vld[vldType][0]);		
                this.showValidationError(target, error);	
            }
            return isFieldValid;
        },

        removeValidationError   :   function($target){
            $target.next(`.${errorClass}`).remove();
        },

        showValidationError :   function($target, error){
            var errorSpan = $(`${errorBlock}`).text(error);
            if($target.next(`.${errorClass}`).length>0)
                $target.next(`.${errorClass}`).text(error);
            else
                $target.after(errorSpan);
        },

        removeCheckboxValidationError   :   function($target){
            $target.parent().next(`.${errorClass}`).remove();
        },
        
        showCheckboxValidationError :   function($target, error){
            var errorSpan = $(`${errorBlock}`).text(error);
            if($target.parent().next(`.${errorClass}`).length>0)
                $target.parent().next(`.${errorClass}`).text(error);
            else
                $target.parent().after(errorSpan);
        },

        validateSectionByID  :   function(parentID){
            return this.validateSection('#'+parentID);
        },

        validateSectionByClass   :   function(parentsClass){
            return this.validateSection('.'+parentsClass);
        },

        validateSection :   function(elementSelector){
            let isSectionValid = true;
            let isFieldValid = true;
            let child = null;
            let vldType = null;
            $(elementSelector).find("input, select, textarea").each((j, _child) => {
                child = $(_child);
                vldType = child.data("validation");
                isFieldValid = this.validateElement(child, vldType);
                if(!isFieldValid){
                    isSectionValid = false;
                }
            });
            return isSectionValid;
        },
        
        validateElementByID :   function(elementID){
            let isFieldValid = true;
            const target = $('#'+elementID);
            const vldType = target.data("validation");
            isFieldValid = this.validateElement(target, vldType);
            return isFieldValid;
        },  
        
        validateElementsByClass :   function(elementsClass){
            let isSectionValid = true;
            let isFieldValid = true;
            let child = null;
            let vldType = null;
            $('.'+elementsClass).each((j, _child) => {
                child = $(_child);
                vldType = child.data("validation");
                isFieldValid = this.validateElement(child, vldType);
                if(!isFieldValid){
                    isSectionValid = false;
                }
            });
            return isSectionValid;
        }, 
        
        isNumberKey :   function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        },
        
        isAlphabetKey  :   function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
                return true;
            }
            return false;
        },

        isAlphabetSpaceKey  :   function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 33 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
                return true;
            }
            return false;
        },
        
        isAlphanumericKey   :   function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 32 || (charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
                return true;
            }
            return false;
        }
    }
    window.iaValidator = iaValidator;
}());