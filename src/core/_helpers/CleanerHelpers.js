export const CleanFormikObject = (data, arrayName, objectName) => {
    if(!!data === false) return null;

    return !!data[arrayName] && data[arrayName].length
        ? data[arrayName][0]
        : (!!data[objectName] ? data[objectName]: null);
}

export const CleanFormikProperty = (data, arrayName, property) => {
    if(!!data === false) return null;
    
    return !!data[arrayName] && data[arrayName].length
        ? data[arrayName][0][property]
        : (!!data[property] ? data[property]: null);
}