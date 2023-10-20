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
import { initialFilter } from "./AddressesUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "../../../../../../core/_helpers";

const AddressesUIContext = createContext();

export function useAddressesUIContext() {
  return useContext(AddressesUIContext);
}

export const AddressesUIConsumer = AddressesUIContext.Consumer;

export const AddressesUIProvider = forwardRef(
  ({ currentPersonId, children, address, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          addresses.map((addressObj) => {
            let obj = CloneObject(addressObj);

            if (obj.AddressId.toString().indexOf("temp_") > -1) {
              obj.AddressId = null;
              delete obj.PersonId;
              !!obj.AddressCategory && delete obj.AddressCategory;
              !!obj.City && delete obj.City;
            }

            return obj;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initAddress = {
      AddressId: undefined,
      AddressCategoryId: undefined,
      AddressCategory: undefined,
      CityId: undefined,
      City: undefined,
      PersonId: personId,
      Person: undefined,
      AddressFa: "",
      AddressEn: "",
      PostalCode: null,
      MailBoxNumber: null,
      Longitude: null,
      Latitude: null,
      IsDeleted: false,
    };

    const [selectedItem, setSelectedItem] = useState(initAddress);
    const { actionsLoading, companyForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        companyForEdit: state.companies.companyForEdit,
        error: state.companies.error,
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

    const [addresses, setAddresses] = useState(address);
    const [activeAddresses, setActiveAddresses] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!companyForEdit &&
        !!companyForEdit.Addresses &&
        companyForEdit.Addresses.length > 0 && companyForEdit.PersonId == currentPersonId
      ) {
        setAddresses(companyForEdit.Addresses);
        setTotalCount(companyForEdit.Addresses.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyForEdit]);

    useEffect(() => {
      setActiveAddresses(addresses.filter(x => x.IsDeleted == false))
    }, [addresses]);

    useEffect(() => {
      initAddress.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    useEffect(() => {
      setSelectedItem(findAddress(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const [showEditAddressDialog, setShowEditAddressDialog] = useState(false);
    const openNewAddressDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initAddress));

      setTimeout(() => {
        setShowEditAddressDialog(true);
      }, 200);
    };
    const openEditAddressDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findAddress(selectedId));
      setTimeout(() => {
        setShowEditAddressDialog(true);
      }, 200);
    };
    const closeEditAddressDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initAddress));
      setShowEditAddressDialog(false);
    };

    const [showDeleteAddressDialog, setShowDeleteAddressDialog] = useState(
      false
    );
    const openDeleteAddressDialog = (id) => {
      setSelectedId(id);
      setShowDeleteAddressDialog(true);
    };
    const closeDeleteAddressDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initAddress));

      setShowDeleteAddressDialog(false);
    };

    const [showDeleteAddressesDialog, setShowDeleteAddressesDialog] = useState(
      false
    );
    const openDeleteAddressesDialog = () => {
      setShowDeleteAddressesDialog(true);
    };
    const closeDeleteAddressesDialog = () => {
      setShowDeleteAddressesDialog(false);
    };

    const [showFetchAddressesDialog, setShowFetchAddressesDialog] = useState(
      false
    );
    const openFetchAddressesDialog = () => {
      setShowFetchAddressesDialog(true);
    };
    const closeFetchAddressesDialog = () => {
      setShowFetchAddressesDialog(false);
    };

    const findAddress = (addressId) => {
      if (!!addressId == false) return null;
      console.log("Finder > ", addresses.filter((address) => address.AddressId == addressId));
      return addresses.filter((address) => address.AddressId == addressId)[0];
    };

    const addAddress = (address) => {
      address.AddressId = "temp_" + Math.floor(Math.random() * 100);

      setAddresses((addresses) => [...addresses, address]);
    };

    const removeAddress = (addressId) => {
      if (addressId.toString().indexOf("temp_") > -1) {
        setAddresses((addresses) =>
          addresses.filter((item) => item.AddressId != addressId)
        );
      } else {
        setAddresses((addresses) =>
          addresses.map((item) => {
            let copyAddress = CloneObject(item);
            if (copyAddress.AddressId == addressId) copyAddress.IsDeleted = true;
  
            return copyAddress;
          })
        );
      }
    };

    const updateAddress = (address) => {
      console.log("updateAddress > ", address);

      setAddresses((addresses) =>
        addresses.map((item) =>
          item.AddressId === address.AddressId ? address : item
        )
      );
    };

    const value = {
      addresses,
      activeAddresses,
      findAddress,
      addAddress,
      removeAddress,
      updateAddress,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initAddress,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      showEditAddressDialog,
      openEditAddressDialog,
      openNewAddressDialog,
      closeEditAddressDialog,
      showDeleteAddressDialog,
      openDeleteAddressDialog,
      closeDeleteAddressDialog,
      showDeleteAddressesDialog,
      openDeleteAddressesDialog,
      closeDeleteAddressesDialog,
      showFetchAddressesDialog,
      openFetchAddressesDialog,
      closeFetchAddressesDialog,
    };

    return (
      <AddressesUIContext.Provider value={value}>
        {children}
      </AddressesUIContext.Provider>
    );
  }
);
