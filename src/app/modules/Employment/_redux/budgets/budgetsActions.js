
import * as requestFromServer from "./budgetsCrud";
import { budgetsSlice, callTypes } from "./budgetsSlice";
const { actions } = budgetsSlice;
export const fetchBudgets = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBudgets(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.budgetsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find budgets";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBudget = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.budgetFetched({ budgetForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBudgetById(id)  
    .then((response) => {
      const budget = response.data;
      dispatch(actions.budgetFetched({ budgetForEdit: budget }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find budget";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBudget = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBudget(id)  
    .then((response) => {
      dispatch(actions.budgetDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete budget";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBudget = (budgetForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBudget(budgetForCreation)  
    .then((response) => {
      const budget = response.data;
      dispatch(actions.budgetCreated(budget));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create budget";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBudget = (budget) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBudget(budget)  
    .then((response) => {
      dispatch(actions.budgetUpdated({ budget }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update budget";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBudgetsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBudgets(ids, status)  
    .then(() => {
      dispatch(actions.budgetsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update budgets status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBudgets = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBudgets(ids)  
    .then(() => {
      dispatch(actions.budgetsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete budgets";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 