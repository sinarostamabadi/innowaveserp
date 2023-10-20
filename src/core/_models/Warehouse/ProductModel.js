export const ProductModel = {
  ProductId: {
    type: "key|number",
    display: "ProductId",
    sortable: true,
  },
  Code: {
    type: "string",
    display: "Code",
    sortable: true,
  },
  Name: {
    type: "title|string",
    display: "Name",
    sortable: true,
  },
  ProductGroupId: {
    type: "number",
    display: "ProductGroupId",
    sortable: true,
  },
  CountryId: {
    type: "number",
    display: "CountryId",
    sortable: true,
  },
  BrandId: {
    type: "number",
    display: "BrandId",
    sortable: true,
  },
  PackageTypeId: {
    type: "number",
    display: "PackageTypeId",
    sortable: true,
  },
  HasSerial: {
    type: "boolean",
    display: "HasSerial",
    sortable: true,
  },
};
