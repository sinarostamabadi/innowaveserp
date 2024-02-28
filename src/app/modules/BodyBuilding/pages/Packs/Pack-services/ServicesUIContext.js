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
import { initialFilter } from "./ServicesUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ServicesUIContext = createContext();

export function useServicesUIContext() {
  return useContext(ServicesUIContext);
}

export const ServicesUIConsumer = ServicesUIContext.Consumer;

export const ServicesUIProvider = forwardRef(
  ({ currentBodyBuildingPackId, children, service, btnRef }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          services.map((d) => {
            let x = {
              BodyBuildingPackServiceId:
                d.BodyBuildingPackServiceId.toString().indexOf("temp") > -1
                  ? null
                  : +d.BodyBuildingPackServiceId,
              BodyBuildingPackId: d.BodyBuildingPackId,
              BodyBuildingServiceId: d.BodyBuildingServiceId,
              ServiceCount: +d.ServiceCount,
              IsDeleted: d.IsDeleted,
            };

            return x;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bodyBuildingPackId, setBodyBuildingPackId] = useState(
      currentBodyBuildingPackId
    );

    const initService = {
      BodyBuildingPackServiceId: "",
      BodyBuildingPackId: bodyBuildingPackId,
      BodyBuildingServiceId: "",
      ServiceCount: 0,
      IsDeleted: false,
    };

    const { actionsLoading } = useSelector(
      (state) => ({
        actionsLoading: state.packs.actionsLoading,
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

    const [services, setServices] = useState(service);
    const [activeServices, setActiveServices] = useState(service);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setServices(service);
      setTotalCount(!!service && service.length > 0 ? service.length : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service]);

    useEffect(() => {
      initService.BodyBuildingPackId = currentBodyBuildingPackId;

      setBodyBuildingPackId(currentBodyBuildingPackId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBodyBuildingPackId]);

    useEffect(() => {
      setActiveServices(services.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services]);

    // Edit Dialog, New Dialog
    const [showEditServiceDialog, setShowEditServiceDialog] = useState(false);
    const openNewServiceDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditServiceDialog(true);
    };
    const openEditServiceDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findService(id));
      setShowEditServiceDialog(true);
    };
    const closeEditServiceDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditServiceDialog(false);
    };

    const [showDeleteServiceDialog, setShowDeleteServiceDialog] =
      useState(false);
    const openDeleteServiceDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findService(id));
      setShowDeleteServiceDialog(true);
    };
    const closeDeleteServiceDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteServiceDialog(false);
    };

    const [showDeleteServicesDialog, setShowDeleteServicesDialog] =
      useState(false);
    const openDeleteServicesDialog = () => {
      setShowDeleteServicesDialog(true);
    };
    const closeDeleteServicesDialog = () => {
      setShowDeleteServicesDialog(false);
    };

    const [showFetchServicesDialog, setShowFetchServicesDialog] =
      useState(false);
    const openFetchServicesDialog = () => {
      setShowFetchServicesDialog(true);
    };
    const closeFetchServicesDialog = () => {
      setShowFetchServicesDialog(false);
    };

    const findService = (bodyBuildingPackServiceId) => {
      if (!!bodyBuildingPackServiceId == false) return;

      const serviceObj = services.filter(
        (service) =>
          service.BodyBuildingPackServiceId == bodyBuildingPackServiceId
      )[0];

      return {
        BodyBuildingPackServiceId: serviceObj.BodyBuildingPackServiceId,
        BodyBuildingPackId: serviceObj.BodyBuildingPackId,
        BodyBuildingServiceId: serviceObj.BodyBuildingServiceId,
        BodyBuildingService: serviceObj.BodyBuildingService,
        ServiceCount: serviceObj.ServiceCount,
        IsDeleted: false,
      };
    };

    const addService = (service) => {
      service.BodyBuildingPackServiceId =
        "temp_" + Math.floor(Math.random() * 100);

      setServices((services) => [...services, service]);
    };

    const removeService = (bodyBuildingPackServiceId) => {
      if (bodyBuildingPackServiceId.toString().indexOf("temp_") > -1)
        setServices(
          services.filter(
            (x) => x.BodyBuildingPackServiceId != bodyBuildingPackServiceId
          )
        );
      else {
        let service = findService(bodyBuildingPackServiceId);
        service["IsDeleted"] = true;
        updateService(service);
      }
    };

    const updateService = (service) => {
      setServices((services) =>
        services.map((item) =>
          item.BodyBuildingPackServiceId == service.BodyBuildingPackServiceId
            ? service
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(service);
      }, 200);
    };

    const value = {
      services,
      activeServices,
      totalCount,
      setTotalCount,
      findService,
      addService,
      removeService,
      updateService,
      actionsLoading,
      bodyBuildingPackId,
      setBodyBuildingPackId,
      initService,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditServiceDialog,
      openEditServiceDialog,
      openNewServiceDialog,
      closeEditServiceDialog,
      // Delete
      showDeleteServiceDialog,
      openDeleteServiceDialog,
      closeDeleteServiceDialog,
      // Deletes
      showDeleteServicesDialog,
      openDeleteServicesDialog,
      closeDeleteServicesDialog,
      // Fetch
      showFetchServicesDialog,
      openFetchServicesDialog,
      closeFetchServicesDialog,
    };

    return (
      <ServicesUIContext.Provider value={value}>
        {children}
      </ServicesUIContext.Provider>
    );
  }
);
