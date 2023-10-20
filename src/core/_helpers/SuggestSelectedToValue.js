export function ToValue(value, property, field) {
  field = field || property;
  return Array.isArray(value[property]) && !!value[property].length
    ? +value[property][0][field]
    : !!value[field]
    ? +value[field]
    : null;
}

export function ToObject(value, property, field) {
  field = field || property;
  return Array.isArray(value[property]) && !!value[property].length
    ? +value[property][0]
    : !!value[property]
    ? value[field]
    : null;
}
