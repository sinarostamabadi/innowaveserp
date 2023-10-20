export const CloneObject = (object) => {
    let copyObj = {};

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            copyObj[key] = element;
        }
    }

    return copyObj;
}

export const CloneArray = (object) => {
    var clonedArray = JSON.parse(JSON.stringify(object))

    return clonedArray;
}