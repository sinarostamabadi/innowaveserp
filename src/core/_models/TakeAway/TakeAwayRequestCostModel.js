export const TakeAwayRequestCostModel = {
    entity: "TakeAwayRequestCost",
    TakeAwayRequestCostId: { type: "number", display: "TakeAwayRequestCostId", sortable: true },
    TakeAwayRequestId: { type: "key|number", display: "TakeAwayRequestId", sortable: true },
    CostId: { type: "number", display: "CostId", sortable: true },
    Price: { type: "number", display: "Price", sortable: true },
};