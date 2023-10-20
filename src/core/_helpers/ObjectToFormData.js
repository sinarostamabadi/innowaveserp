export function ObjectToFormData(object) {
    var form_data = new FormData();

    for (var key in object) {
        if ((object[key] || object[key] == false) && !Array.isArray(object[key]))
            form_data.append(key, object[key]);
        else if ((object[key] || object[key] == false) && Array.isArray(object[key]))
            for (let index = 0; index < object[key].length; index++) {
                const element = object[key][index];

                for (var keyEl in element) {
                    if ((element[keyEl] || element[keyEl] == false) && !Array.isArray(element[keyEl]) && typeof element[keyEl] !== 'object')
                        form_data.append(key + `[${index}].${keyEl}`, element[keyEl]);
                    else if (!Array.isArray(element[keyEl]) && element[keyEl] instanceof File)
                        form_data.append(key + `[${index}].${keyEl}`, element[keyEl]);
                    else if (!Array.isArray(element[keyEl]) && typeof element[keyEl] === 'object' && element[keyEl] !== null) {
                        for (const objIn in element[keyEl]) {
                            if (Object.hasOwnProperty.call(element[keyEl], objIn)) {
                                const ObjInEl = element[keyEl][objIn];
                                form_data.append(key + `[${index}].${keyEl}.${objIn}`, ObjInEl);
                            }
                        }
                    }
                    else if ((element[keyEl] || element[keyEl] == false) && Array.isArray(element[keyEl]))
                        for (let indexin = 0; indexin < element[keyEl].length; indexin++) {
                            const elementIn = element[keyEl][indexin];

                            for (var keyIn in elementIn) {
                                if ((elementIn[keyIn] || elementIn[keyIn] == false) && !Array.isArray(elementIn[keyIn]))
                                    form_data.append(key + `[${index}].${keyEl}[${indexin}].${keyIn}`, elementIn[keyIn]);
                            }
                        }
                }
            }
    }

    return form_data;
}


function mergeObjects(object1, object2) {
    return [object1, object2].reduce(function (carry, objectToMerge) {
        Object.keys(objectToMerge).forEach(function (objectKey) {
            carry[objectKey] = objectToMerge[objectKey];
        });
        return carry;
    }, {});
}

function isArray(val) {

    return ({}).toString.call(val) === '[object Array]';
}

function isJsonObject(val) {

    return !isArray(val) && typeof val === 'object' && !!val && !(val instanceof Blob) && !(val instanceof Date);
}

function isAppendFunctionPresent(formData) {

    return typeof formData.append === 'function';
}

function isGlobalFormDataPresent() {

    return typeof FormData === 'function';
}

function getDefaultFormData() {

    if (isGlobalFormDataPresent()) {
        return new FormData();
    }
}

export function convertToFormData(jsonObject, options) {
    console.log("convertToFormData > ");
    if (options && options.initialFormData) {

        if (!isAppendFunctionPresent(options.initialFormData)) {

            throw 'initialFormData must have an append function.';
        }
    } else if (!isGlobalFormDataPresent()) {

        throw 'This environment does not have global form data. options.initialFormData must be specified.';
    }

    var defaultOptions = {
        initialFormData: getDefaultFormData(),
        showLeafArrayIndexes: true,
        includeNullValues: false,
        mapping: function (value) {
            console.log("mapping value > ", typeof value === 'boolean', value);
            if (typeof value === 'boolean') {
                return +value ? true : false;
            }
            return value;
        }
    };

    var mergedOptions = mergeObjects(defaultOptions, options || {});

    return convertRecursively(jsonObject, mergedOptions, mergedOptions.initialFormData);
}

function convertRecursively(jsonObject, options, formData, parentKey) {

    var index = 0;

    for (var key in jsonObject) {

        if (jsonObject.hasOwnProperty(key)) {

            var propName = parentKey || key;
            var value = options.mapping(jsonObject[key]);

            if (parentKey && isJsonObject(jsonObject)) {
                propName = parentKey + '[' + key + ']';
            }

            if (parentKey && isArray(jsonObject)) {

                if (isArray(value) || options.showLeafArrayIndexes) {
                    propName = parentKey + '[' + index + ']';
                } else {
                    propName = parentKey + '[]';
                }
            }

            if (isArray(value) || isJsonObject(value)) {

                convertRecursively(value, options, formData, propName);

            } else if (value instanceof FileList) {

                for (var j = 0; j < value.length; j++) {
                    formData.append(propName + '[' + j + ']', value.item(j));
                }
            } else if (value instanceof Blob) {

                formData.append(propName, value, value.name);

            } else if (value instanceof Date) {

                formData.append(propName, value.toISOString());

            } else if (((value === null && options.includeNullValues) || value !== null) && value !== undefined) {

                formData.append(propName, value);
            }
        }
        index++;
    }
    return formData;
}

