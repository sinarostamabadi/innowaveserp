/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "src/core/_helpers";
import { PaymentTools } from "../quick/Dependency";
import { PaymentModel } from "src/core/_models/Cash/PaymentModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const PaymentsUIContext = createContext();

export function usePaymentsUIContext() {
  return useContext(PaymentsUIContext);
}

export const PaymentsUIConsumer = PaymentsUIContext.Consumer;

export const PaymentsUIProvider = forwardRef(
  ({ currentDocumentId, children, payment, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          payments.map((payment) => {
            let tempDoc = PaymentTools.CleanApi(payment);
            if (
              !!tempDoc.PaymentId &&
              tempDoc.PaymentId.toString().indexOf("temp_") > -1
            ) {
              tempDoc.PaymentId = null;
            }

            return tempDoc;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);
    const initPayment = {...PaymentTools.Model, DocumentId: currentDocumentId};
    const [selectedItem, setSelectedItem] = useState(initPayment);
    const { actionsLoading, documentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        documentForEdit: state.companies.documentForEdit,
        error: state.companies.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(getConfig(PaymentModel, "PaymentDate", "desc").initialFilter);

    const setQueryParams = useCallback((nextQueryParams) => {
      setQueryParamsBase((prevQueryParams) => {
        if (isFunction(nextQueryParams)) {
          nextQueryParams = nextQueryParams(prevQueryParams);
        }

        if (isEqual(prevQueryParams, nextQueryParams)) {
          return prevQueryParams;
        }

        return nextQueryParams;
      });
    }, []);

    const [payments, setPayments] = useState(payment.map(x=> PaymentTools.Clean(x)));
    const [activePayments, setActivePayments] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActivePayments(payments.filter((x) => x.IsDeleted == false));
      setTotalCount(payments.filter((x) => x.IsDeleted == false).length);
    }, [payments]);

    useEffect(() => {
      initPayment.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setSelectedItem(findPayment(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);
    
    const [showEditPaymentDialog, setShowEditPaymentDialog] = useState(false);
    const openNewPaymentDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPayment));

      setTimeout(() => {
        setShowEditPaymentDialog(true);
      }, 200);
    };
    const openEditPaymentDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findPayment(selectedId));
      setTimeout(() => {
        setShowEditPaymentDialog(true);
      }, 200);
    };
    const closeEditPaymentDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPayment));
      setShowEditPaymentDialog(false);
    };

    const [showDeletePaymentDialog, setShowDeletePaymentDialog] = useState(false);
    const openDeletePaymentDialog = (id) => {
      setSelectedId(id);
      setShowDeletePaymentDialog(true);
    };
    const closeDeletePaymentDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPayment));
      setShowDeletePaymentDialog(false);
    };

    const [showDeletePaymentsDialog, setShowDeletePaymentsDialog] = useState(
      false
    );
    const openDeletePaymentsDialog = () => {
      setShowDeletePaymentsDialog(true);
    };
    const closeDeletePaymentsDialog = () => {
      setShowDeletePaymentsDialog(false);
    };

    const [showFetchPaymentsDialog, setShowFetchPaymentsDialog] = useState(false);
    const openFetchPaymentsDialog = () => {
      setShowFetchPaymentsDialog(true);
    };
    const closeFetchPaymentsDialog = () => {
      setShowFetchPaymentsDialog(false);
    };

    const findPayment = (paymentId) => {
      return payments.filter((payment) => payment.PaymentId == paymentId)[0];
    };

    const addPayment = (payment) => {
      payment.PaymentId = "temp_" + Math.floor(Math.random() * 100);
      payment.DocumentId = +payment.DocumentId;

      setPayments((payments) => [...payments, payment]);
    };

    const removePayment = (paymentId) => {
      if (paymentId.toString().indexOf("temp_") > -1) {
        setPayments((payments) =>
          payments.filter((item) => item.PaymentId != paymentId)
        );
      } else {
        setPayments((payments) =>
          payments.map((item) => {
            let copyPayment = CloneObject(item);
            if (copyPayment.PaymentId == paymentId) copyPayment.IsDeleted = true;

            return copyPayment;
          })
        );
      }
    };

    const updatePayment = (payment) => {
      payment.DocumentId = +payment.DocumentId;
      setPayments((payments) =>
        payments.map((item) =>
          item.PaymentId === payment.PaymentId ? payment : item
        )
      );
    };

    const value = {
      payments,
      activePayments,
      findPayment,
      addPayment,
      removePayment,
      updatePayment,
      totalCount,
      setTotalCount,
      actionsLoading,
      documentId,
      setDocumentId,
      initPayment,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      showEditPaymentDialog,
      openEditPaymentDialog,
      openNewPaymentDialog,
      closeEditPaymentDialog,
      showDeletePaymentDialog,
      openDeletePaymentDialog,
      closeDeletePaymentDialog,
      showDeletePaymentsDialog,
      openDeletePaymentsDialog,
      closeDeletePaymentsDialog,
      showFetchPaymentsDialog,
      openFetchPaymentsDialog,
      closeFetchPaymentsDialog,
    };

    return (
      <PaymentsUIContext.Provider value={value}>
        {children}
      </PaymentsUIContext.Provider>
    );
  }
);
