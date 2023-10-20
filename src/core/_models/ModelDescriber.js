export function getConfig(model, fieldDefault, sortDefault) {
  let config = {
    model: "",
    id: "",
    title: "",
    defaultSorted: [{ dataField: fieldDefault || "", order: sortDefault || "asc" }],
    sizePerPageList: [
      { text: "10", value: 10 },
      { text: "50", value: 50 },
      { text: "100", value: 100 },
    ],
    initialFilter: {
      Filters: [],
      OrderBy: "",
      PageNumber: 1,
      PageSize: 50,
    }
  };

  for (const key in model) {
    if (!model.hasOwnProperty(key) || !(typeof model[key] == 'object')) continue;

    const element = model[key];
    if (element.type.indexOf("key") > -1) config.id = key.toString();
    if (element.type.indexOf("title") > -1) config.title = key.toString();
  }

  config.model = config.id.replace("Id", "");
  if(!!fieldDefault == false) config.defaultSorted[0].dataField = config.title;
  config.initialFilter.OrderBy= config.defaultSorted[0].dataField + " " + config.defaultSorted[0].order

  return config;
}

export function getFields(model, prefix) {
  let keys = Object.keys(model);
  return keys.reduce((ac, a) => ({ ...ac, [a]: model[a].type == "ref" ? getFields(model[a], model[a].entity): !!prefix? prefix + "." + a: a }), {});
}

export function initial(model, parent) {
  let obj = {};

  for (const key in model) {
    if (Object.hasOwnProperty.call(model, key)) {
      const el = model[key];
      if(!!model.entity && !!parent)
        el.display = model.entity + el.display;

      if(typeof x == 'object')
        obj[key] = initial(el, el.entity);
      else
        obj[key] = el;
    }
  }

  return obj;
}