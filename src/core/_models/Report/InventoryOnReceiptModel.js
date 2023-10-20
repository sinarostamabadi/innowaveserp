export const InventoryOnReceiptModel = {
    ProductName: {
      type: "key|String",
      display: "ProductName",
      sortable: true,
    },
    ReceiptNo: {
      type: "string",
      display: "ReceiptNo",
      sortable: true,
    },
    ArrivalAmount: {
      type: "number",
      display: "ArrivalAmount",
      sortable: true,
    },
    OutgoAmount: {
      type: "number",
      display: "OutgoAmount",
      sortable: true,
    },
    RemainingAmount: {
      type: "number",
      display: "RemainingAmount",
      sortable: true,
    }
  };
  