/* eslint-disable no-unused-vars */
import {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./DetailsUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPackById } from "../../../_redux/Packs/PacksCrud";

const DetailsUIContext = createContext();

export function useDetailsUIContext() {
  return useContext(DetailsUIContext);
}

export const DetailsUIConsumer = DetailsUIContext.Consumer;

export const DetailsUIProvider = forwardRef(
  ({ currentBodyBuildingContractId, children, detail, btnRef }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          details.map((d) => {
            let x = {
              BodyBuildingContractDetailId:
                d.BodyBuildingContractDetailId.toString().indexOf("temp") > -1
                  ? null
                  : +d.BodyBuildingContractDetailId,
              BodyBuildingContractId: d.BodyBuildingContractId,
              BodyBuildingServiceId: d.BodyBuildingServiceId,
              BodyBuildingPackId: d.BodyBuildingPackId,
              ServiceCount: +d.ServiceCount || 0,
              RemaineCount: +d.RemaineCount || 0,
              Price: +d.BodyBuildingService.Price || 0,
              DiscountPrice: +d.DiscountPrice || 0,
              PayablePrice: +d.PayablePrice || 0,
              IsDeleted: d.IsDeleted,
            };

            return x;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bodyBuildingContractId, setBodyBuildingContractId] = useState(
      currentBodyBuildingContractId
    );

    const initDetail = {
      BodyBuildingContractDetailId: undefined,
      BodyBuildingContractId: undefined,
      BodyBuildingServiceId: undefined,
      BodyBuildingService: undefined,
      BodyBuildingPackId: undefined,
      BodyBuildingPack: undefined,
      ServiceCount: 0,
      RemaineCount: 0,
      Price: 0,
      DiscountPrice: 0,
      PayablePrice: 0,
      IsDeleted: false,
    };

    const { actionsLoading } = useSelector(
      (state) => ({
        actionsLoading: state.contracts.actionsLoading,
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
      setDetails(detail);
      setTotalCount(!!detail && detail.length > 0 ? detail.length : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail]);

    useEffect(() => {
      initDetail.BodyBuildingContractId = currentBodyBuildingContractId;

      setBodyBuildingContractId(currentBodyBuildingContractId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBodyBuildingContractId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    // Edit Dialog, New Dialog
    const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
    const openNewDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDetailDialog(true);
    };
    const openEditDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowEditDetailDialog(true);
    };
    const closeEditDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDetailDialog(false);
    };

    const [showDeleteDetailDialog, setShowDeleteDetailDialog] = useState(false);
    const openDeleteDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowDeleteDetailDialog(true);
    };
    const closeDeleteDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
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

    const findDetail = (bodyBuildingContractDetailId) => {
      if (!!bodyBuildingContractDetailId == false) return;

      const detailObj = details.filter(
        (detail) =>
          detail.BodyBuildingContractDetailId == bodyBuildingContractDetailId
      )[0];
      return detailObj;
    };

    const addDetail = (detail) => {
      if (!!detail.BodyBuildingPackId) {
        getPackById(detail.BodyBuildingPackId).then(({ data }) => {
          for (
            let index = 0;
            index < data.BodyBuildingPackServices.length;
            index++
          ) {
            const element = data.BodyBuildingPackServices[index];
            const tempDetail = { ...detail };
            tempDetail.BodyBuildingContractDetailId =
              "temp_" + Math.floor(Math.random() * 10000);
            tempDetail.BodyBuildingService = element.BodyBuildingService;
            tempDetail.BodyBuildingServiceId = element.BodyBuildingServiceId;
            tempDetail.Price = element.BodyBuildingService.Price;
            setDetails((details) => [...details, tempDetail]);
          }
        });
      } else {
        detail.BodyBuildingContractDetailId =
          "temp_" + Math.floor(Math.random() * 10000);
        setDetails((details) => [...details, detail]);
      }
    };

    const removeDetail = (bodyBuildingContractDetailId) => {
      if (bodyBuildingContractDetailId.toString().indexOf("temp_") > -1)
        setDetails(
          details.filter(
            (x) =>
              x.BodyBuildingContractDetailId != bodyBuildingContractDetailId
          )
        );
      else {
        let detail = findDetail(bodyBuildingContractDetailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.BodyBuildingContractDetailId ==
          detail.BodyBuildingContractDetailId
            ? detail
            : item
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
      bodyBuildingContractId,
      setBodyBuildingContractId,
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
      <DetailsUIContext.Provider value={value}>
        {children}
      </DetailsUIContext.Provider>
    );
  }
);
