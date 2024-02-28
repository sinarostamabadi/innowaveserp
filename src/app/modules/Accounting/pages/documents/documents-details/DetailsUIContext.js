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
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";
import { createDocumentDtl } from "../../../../Accounting/_redux/documentDtls/documentDtlsActions";

const DetailsUIContext = createContext();

export function useDetailsUIContext() {
  return useContext(DetailsUIContext);
}

export const DetailsUIConsumer = DetailsUIContext.Consumer;

export const DetailsUIProvider = forwardRef(
  ({ currentDocumentId, children, detail, btnRef }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          activeDetails.map((d) => {
            let xx = {
              DocumentDtlId: null,
              ProductId: d.ProductId,
              ProductUnitId: d.ProductUnitId,
              Amount: +d.Amount,
              UseDate: !!d.UseDate ? d.UseDate : null,
              ExpireDate: !!d.ExpireDate ? d.ExpireDate : null,
              IsDeleted: false,
            };

            return xx;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);

    const initDetail = {
      DocumentDtlId: undefined,
      DocumentId: documentId,
      AccountId: null,
      AccountFloatingId: null,
      AccountFloatingId2: null,
      AccountFloatingId3: null,
      CostCenterId: null,
      No: null,
      Bed: null,
      Bes: null,
      CurrencyRate: "",
      CurrencyId: "",
      CurrencyBed: "",
      CurrencyBes: "",
      Des: "",
      ReferenceNo: "",
      ReferenceDes: "",
      SysReference: "",
      SysReferenceKey: "",
      SysReferenceId_1_TableName: "",
      SysReferenceId_1: "",
      SysReferenceId_2_TableName: "",
      SysReferenceId_2: "",
      ReferenceDate: "",
      MatchRefrence: "",
      ContractNumber: "",
      Atf1: "",
      Atf2: "",
      Atf3: "",
      Atf4: "",
      IsDeleted: false,
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.documents.actionsLoading,
        realPersonForEdit: state.documents.documentForEdit,
        error: state.documents.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState({
      filter: {
        value: "",
      },
      sortOrder: "asc", // asc||desc
      sortField: "DocumentDtlId",
      pageNumber: 1,
      pageSize: 10,
    });
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
    const [activeDetails, setActiveDetails] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setDetails(
        !!realPersonForEdit &&
          !!realPersonForEdit.DocumentDtls &&
          realPersonForEdit.DocumentDtls.length > 0 &&
          realPersonForEdit.DocumentId == documentId
          ? realPersonForEdit.DocumentDtls
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.DocumentDtls &&
          realPersonForEdit.DocumentDtls.length > 0 &&
          realPersonForEdit.DocumentId == documentId
          ? realPersonForEdit.DocumentDtls.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDetail.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

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

    const [showDeleteDetailsDialog, setShowDeleteDetailsDialog] =
      useState(false);
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
        (detail) => detail.DocumentDtlId == detailId
      )[0];

      return {
        DocumentDtlId: detailObj.DocumentDtlId,
        DocumentId: detailObj.DocumentId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        UseDate: detailObj.UseDate,
        UseDateObj: !!detailObj.UseDate ? EnToFaObjDate(detailObj.UseDate) : "",
        ExpireDate: detailObj.ExpireDate,
        ExpireDateObj: !!detailObj.ExpireDate
          ? EnToFaObjDate(detailObj.ExpireDate)
          : "",
        IsDeleted: false,
      };
    };

    const dispatch = useDispatch();

    const addDetail = (detail) => {
      dispatch(
        createDocumentDtl(detail, (res) => {
          setDetails((details) => [...details, res]);
        })
      );
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.DocumentDtlId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.DocumentDtlId == detail.DocumentDtlId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
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
      actionsLoading,
      documentId,
      setDocumentId,
      initDetail,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
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
        <DetailsUIContext.Provider value={value}>
          {children}
        </DetailsUIContext.Provider>
      </>
    );
  }
);
