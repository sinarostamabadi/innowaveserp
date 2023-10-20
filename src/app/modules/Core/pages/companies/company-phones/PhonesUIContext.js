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
import { initialFilter } from "./PhonesUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "../../../../../../core/_helpers";

const PhonesUIContext = createContext();

export function usePhonesUIContext() {
  return useContext(PhonesUIContext);
}

export const PhonesUIConsumer = PhonesUIContext.Consumer;

export const PhonesUIProvider = forwardRef(
  ({ currentPersonId, children, phone, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          phones.map((phone) => {
            if (
              !!phone.PhoneId &&
              phone.PhoneId.toString().indexOf("temp_") > -1
            ) {
              phone.PhoneId = null;
              delete phone.PersonId;
            }

            return phone;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initPhone = {
      PhoneId: undefined,
      PhoneTypeId: undefined,
      PersonId: personId,
      AreaCode: "",
      PhoneNumber: "",
      Extension: "",
    };

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

    const [phones, setPhones] = useState(phone);
    const [activePhones, setActivePhones] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!companyForEdit &&
        !!companyForEdit.Phones &&
        companyForEdit.Phones.length > 0
      ) {
        setPhones(companyForEdit.Phones);
        setTotalCount(companyForEdit.Phones.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyForEdit]);

    useEffect(() => {
      setActivePhones(phones.filter((x) => x.IsDeleted == false));
    }, [phones]);

    useEffect(() => {
      initPhone.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    const [showEditPhoneDialog, setShowEditPhoneDialog] = useState(false);
    const openNewPhoneDialog = () => {
      setSelectedId(undefined);
      setShowEditPhoneDialog(true);
    };
    const openEditPhoneDialog = (id) => {
      setSelectedId(id);
      setShowEditPhoneDialog(true);
    };
    const closeEditPhoneDialog = () => {
      setSelectedId(undefined);
      setShowEditPhoneDialog(false);
    };

    const [showDeletePhoneDialog, setShowDeletePhoneDialog] = useState(false);
    const openDeletePhoneDialog = (id) => {
      setSelectedId(id);
      setShowDeletePhoneDialog(true);
    };
    const closeDeletePhoneDialog = () => {
      setSelectedId(undefined);
      setShowDeletePhoneDialog(false);
    };

    const [showDeletePhonesDialog, setShowDeletePhonesDialog] = useState(false);
    const openDeletePhonesDialog = () => {
      setShowDeletePhonesDialog(true);
    };
    const closeDeletePhonesDialog = () => {
      setShowDeletePhonesDialog(false);
    };

    const [showFetchPhonesDialog, setShowFetchPhonesDialog] = useState(false);
    const openFetchPhonesDialog = () => {
      setShowFetchPhonesDialog(true);
    };
    const closeFetchPhonesDialog = () => {
      setShowFetchPhonesDialog(false);
    };

    const findPhone = (phoneId) => {
      return phones.filter((phone) => phone.PhoneId == phoneId)[0];
    };

    const addPhone = (phone) => {
      phone.PhoneId = "temp_" + Math.floor(Math.random() * 100);
      phone.PhoneTypeId = +phone.PhoneTypeId;
      phone.PersonId = +phone.PersonId;

      setPhones((phones) => [...phones, phone]);
    };

    const removePhone = (phoneId) => {
      if (phoneId.toString().indexOf("temp_") > -1) {
        setPhones((phones) =>
          phones.filter((item) => item.PhoneId != phoneId)
        );
      } else {
        setPhones((phones) =>
          phones.map((item) => {
            let copyPhone = CloneObject(item);
            if (copyPhone.PhoneId == phoneId) copyPhone.IsDeleted = true;

            return copyPhone;
          })
        );
      }
    };

    const updatePhone = (phone) => {
      phone.PhoneTypeId = +phone.PhoneTypeId;
      phone.PersonId = +phone.PersonId;

      setPhones((phones) =>
        phones.map((item) => (item.PhoneId === phone.PhoneId ? phone : item))
      );
    };

    const value = {
      phones,
      activePhones,
      findPhone,
      addPhone,
      removePhone,
      updatePhone,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initPhone,
      selectedId,
      queryParams,
      setQueryParams,
      showEditPhoneDialog,
      openEditPhoneDialog,
      openNewPhoneDialog,
      closeEditPhoneDialog,
      showDeletePhoneDialog,
      openDeletePhoneDialog,
      closeDeletePhoneDialog,
      showDeletePhonesDialog,
      openDeletePhonesDialog,
      closeDeletePhonesDialog,
      showFetchPhonesDialog,
      openFetchPhonesDialog,
      closeFetchPhonesDialog,
    };

    return (
      <PhonesUIContext.Provider value={value}>
        {children}
      </PhonesUIContext.Provider>
    );
  }
);
