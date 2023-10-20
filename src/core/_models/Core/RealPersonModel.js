export const RealPersonModel = {
  RealPersonId: {
    type: "key|number",
    display: "RealPersonId",
    sortable: true,
  },
  NationalCode: {
    type: "string",
    display: "NationalCode",
    sortable: true,
  },
  FirstNameFa: {
    type: "string",
    display: "FirstNameFa",
    sortable: true,
  },
  LastNameFa: {
    type: "string",
    display: "LastNameFa",
    sortable: true,
  },
  FullNameFa: {
    type: "title|string",
    display: "FullNameFa",
    sortable: true,
  },
  BirthDate: {
    type: "DateTime",
    display: "BirthDate",
    sortable: true,
  },
  GenderId: {
    type: "number",
    display: "GenderId",
    sortable: true,
  },
  FatherNameFa: {
    type: "string",
    display: "FatherNameFa",
    sortable: true,
  },
  FatherNameEn: {
    type: "string",
    display: "FatherNameEn",
    sortable: true,
  },
  PlaceOfBirthId: {
    type: "number",
    display: "PlaceOfBirthId",
    sortable: true,
  },
  IssueCityId: {
    type: "number",
    display: "IssueCityId",
    sortable: true,
  },
  WalletPrice: {
    type: "number",
    display: "WalletPrice",
    sortable: true
  },
  PointPrice: {
    type: "number",
    display: "PointPrice",
    sortable: true
  },
  CreditPrice: {
    type: "number",
    display: "CreditPrice",
    sortable: true
  },
  IODeviceId: {
    type: "number",
    display: "IODeviceId",
    sortable: true
  }
};
