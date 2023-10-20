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
import { initialFilter } from "./DetailsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const DetailsUIContext = createContext();

export function useDetailsUIContext() {
  return useContext(DetailsUIContext);
}

export const DetailsUIConsumer = DetailsUIContext.Consumer;

export const DetailsUIProvider = forwardRef(
  ({ currentAssignmentId, children, detail, dependency, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            activeDetails.map((d) => {
              let xx = {
                AssignmentDtlId: d.AssignmentDtlId.toString().indexOf("temp") > -1? null: d.AssignmentDtlId,
                ProductId: d.ProductId,
                ProductUnitId: d.ProductUnitId,
                Amount: +d.Amount,
                ReceiptDtlId: d.ReceiptDtlId,
                ExpireDate: d.ExpireDate,
                IsDeleted: false,
                AssignmentSerials: d.AssignmentSerials.map((s) => {
                  return { SerialNumber: s.SerialNumber };
                }),
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [assignmentId, setAssignmentId] = useState(currentAssignmentId);

    const initDetail = {
      AssignmentDtlId: "",
      AssignmentId: assignmentId,
      ProductId: "",
      ProductUnitId: "",
      Amount: "",
      ReceiptDtlId: "",
      ExpireDate: "",
      IsDeleted: false,
      SerialCount: 0,
      AssignmentSerials: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.assignments.actionsLoading,
        realPersonForEdit: state.assignments.assignmentForEdit,
        error: state.assignments.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(initialFilter);
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

    const [details, setDetails] = useState(detail);
    const [activeDetails, setActiveDetails] = useState(detail);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setDetails(
        !!realPersonForEdit &&
          !!realPersonForEdit.AssignmentDtls &&
          realPersonForEdit.AssignmentDtls.length > 0
          ? realPersonForEdit.AssignmentDtls
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.AssignmentDtls &&
          realPersonForEdit.AssignmentDtls.length > 0
          ? realPersonForEdit.AssignmentDtls.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDetail.AssignmentId = currentAssignmentId;

      setAssignmentId(currentAssignmentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAssignmentId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    useEffect(() => {
      console.log("serialErrors >> ", serialErrors);
      setSerialErrors(
        activeDetails.filter((d) => d.AssignmentSerials.length != d.Amount && d.Product.HasSerial)
          .length > 0
          ? "تعداد سریال‌های کالاهای سریالی باید با مقدار یکسان باشد."
          : ""
      );
    }, [activeDetails]);

    // Serials Dialog
    const [showSerialDetailDialog, setShowSerialDetailDialog] = useState(false);
    const openSerialDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowSerialDetailDialog(true);
    };
    const closeSerialDetailDialog = () => {
      setSelectedId(undefined);
      setShowSerialDetailDialog(false);
    };

    // Edit Dialog, New Dialog
    const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
    const openNewDetailDialog = () => {
      setSelectedId(undefined);
      setShowEditDetailDialog(true);
    };
    const openEditDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowEditDetailDialog(true);
    };
    const closeEditDetailDialog = () => {
      setSelectedId(undefined);
      setShowEditDetailDialog(false);
    };

    const [showDeleteDetailDialog, setShowDeleteDetailDialog] = useState(false);
    const openDeleteDetailDialog = (id) => {
      setSelectedId(id);
      setShowDeleteDetailDialog(true);
    };
    const closeDeleteDetailDialog = () => {
      setSelectedId(undefined);
      setShowDeleteDetailDialog(false);
    };

    const [showDeleteDetailsDialog, setShowDeleteDetailsDialog] = useState(
      false
    );
    const openDeleteDetailsDialog = () => {
      setShowDeleteDetailsDialog(true);
    };
    const closeDeleteDetailsDialog = () => {
      setShowDeleteDetailsDialog(false);
    };

    const [showFetchDetailsDialog, setShowFetchDetailsDialog] = useState(false);
    const openFetchDetailsDialog = () => {
      setShowFetchDetailsDialog(true);
    };
    const closeFetchDetailsDialog = () => {
      setShowFetchDetailsDialog(false);
    };

    const findDetail = (detailId) => {
      if (!!detailId == false) return;

      const detailObj = details.filter(
        (detail) => detail.AssignmentDtlId == detailId
      )[0];

      return {
        AssignmentDtlId: detailObj.AssignmentDtlId,
        AssignmentId: detailObj.AssignmentId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        ReceiptDtlId: detailObj.ReceiptDtlId,
        ExpireDate: detailObj.ExpireDate,
        IsDeleted: false,
        SerialCount: detailObj.AssignmentSerials.length,
        AssignmentSerials: detailObj.AssignmentSerials,
      };
    };

    const addDetail = (detail) => {
      detail.AssignmentDtlId = "temp_" + Math.floor(Math.random() * 100);

      setDetails((details) => [...details, detail]);
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.AssignmentDtlId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.AssignmentDtlId == detail.AssignmentDtlId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.AssignmentSerialId = "temps_" + Math.floor(Math.random() * 1000);
      let detailObj = findDetail(serial.AssignmentDtlId);
      detailObj.AssignmentSerials.push(serial);
      detailObj.SerialCount = detailObj.AssignmentSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let detailObj = findDetail(serial.AssignmentDtlId);
      detailObj.AssignmentSerials = detailObj.AssignmentSerials.filter(
        (x) => x.AssignmentSerialId != serial.AssignmentSerialId
      );
      detailObj.SerialCount = detailObj.AssignmentSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      detail = findDetail(selectedItem.AssignmentDtlId);
      return (
        detail.AssignmentSerials.filter((x) => x.SerialNumber == serial).length > 0
      );
    };

    const value = {
      details,
      activeDetails,
      totalCount,
      setTotalCount,
      findDetail,
      addDetail,
      removeDetail,
      updateDetail,
      // Serial Actions
      addSerial,
      removeSerial,
      checkSerial,
      actionsLoading,
      assignmentId,
      setAssignmentId,
      initDetail,
      selectedId,
      selectedItem,
      dependency,
      queryParams,
      setQueryParams,
      // Serials
      showSerialDetailDialog,
      openSerialDetailDialog,
      closeSerialDetailDialog,
      // Edit
      showEditDetailDialog,
      openEditDetailDialog,
      openNewDetailDialog,
      closeEditDetailDialog,
      // Delete
      showDeleteDetailDialog,
      openDeleteDetailDialog,
      closeDeleteDetailDialog,
      // Deletes
      showDeleteDetailsDialog,
      openDeleteDetailsDialog,
      closeDeleteDetailsDialog,
      // Fetch
      showFetchDetailsDialog,
      openFetchDetailsDialog,
      closeFetchDetailsDialog,
    };

    return (
      <>
        {!!serialErrors && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={serialErrors}
            className=""
          ></Alerty>
        )}
        <DetailsUIContext.Provider value={value}>
          {children}
        </DetailsUIContext.Provider>
      </>
    );
  }
);
