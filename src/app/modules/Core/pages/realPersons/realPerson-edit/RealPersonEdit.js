/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/realPersons/realPersonsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RealPersonEditForm } from "./RealPersonEditForm";
import { PersonEditForm } from "./PersonEditForm";
import { AddressesUIProvider } from "../realPerson-addresses/AddressesUIContext";
import { Addresses } from "../realPerson-addresses/Addresses";
import { PhonesUIProvider } from "../realPerson-phones/PhonesUIContext";
import { Phones } from "../realPerson-phones/Phones";
import { PersonSpecialDaysUIProvider } from "../realPerson-specialdays/PersonSpecialDaysUIContext";
import { PersonSpecialDays } from "../realPerson-specialdays/PersonSpecialDays";
import { RelationPersonGroupsUIProvider } from "../realPerson-relationPersonGroups/RelationPersonGroupsUIContext";
import { RelationPersonGroups } from "../realPerson-relationPersonGroups/RelationPersonGroups";
import { CreditsUIProvider } from "../realPerson-credit/CreditsUIContext";
import { Credits } from "../realPerson-credit/Credits";
import { WalletsUIProvider } from "../realPerson-wallet/WalletsUIContext";
import { Wallets } from "../realPerson-wallet/Wallets";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

export function RealPersonEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    PersonId: undefined,
    FullNameEn: "",
    Email: "",
    WebSite: "",
    Mobile: "",
    DiscountMax: "",
    AccountFloatingId: null,
    RealPerson: {
      RealPersonId: undefined,
      FirstNameFa: "",
      NationalCode: "",
      LastNameFa: "",
      BirthDate: "",
      BirthDateObj: undefined,
      GenderId: "",
      FatherNameFa: "",
      PlaceOfBirthId: "",
      IssueCityId: "",
      IODeviceId: "",
    },
    Phones: [],
    Addresses: [],
    Credits: [],
    Wallets: [],
    PersonSpecialDays: [],
    RelationPersonGroups: [],
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { actionsLoading, realPersonForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.realPersons.actionsLoading,
      realPersonForEdit: state.realPersons.realPersonForEdit,
      error: state.realPersons.error,
    }),
    shallowEqual
  );

  const [personObj, setPersonObj] = useState(initModel);
  const [realObj, setRealObj] = useState(initModel.RealPerson);
  const [phonesObj, setPhonesObj] = useState(initModel.Phones);
  const [addressObj, setAddressObj] = useState(initModel.Addresses);
  const [creditObj, setCreditObj] = useState(initModel.Credits);
  const [walletObj, setWalletObj] = useState(initModel.Wallets);
  const [personSpecialDaysObj, setPersonSpecialDaysObj] = useState(
    initModel.PersonSpecialDays
  );
  const [relationPersonGroupsObj, setRelationPersonGroupsObj] = useState(
    initModel.RelationPersonGroups
  );

  const dispatch = useDispatch();
  useEffect(() => {
    !!id &&
      dispatch(actions.fetchRealPerson(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("RealPerson.Entity");

    if (realPersonForEdit && id) {
      _title = t("Common.Edit") + " " + realPersonForEdit.FullNameFa;

      setPersonObj(realPersonForEdit);
      setRealObj({
        ...realPersonForEdit.RealPerson,
        BirthDateObj: EnToFaObjDate(realPersonForEdit.RealPerson.BirthDate),
      });
      setPhonesObj(realPersonForEdit.Phones);
      setAddressObj(realPersonForEdit.Addresses);
      setCreditObj(realPersonForEdit.Credits);
      setWalletObj(realPersonForEdit.Wallets);
      setPersonSpecialDaysObj(
        !!realPersonForEdit.PersonSpecialDays
          ? realPersonForEdit.PersonSpecialDays
          : []
      );
      setRelationPersonGroupsObj(realPersonForEdit.RelationPersonGroups);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realPersonForEdit, id]);
  console.log("creditObj > ", creditObj);
  const SavePerson = (data) => {
    if (!id) {
      dispatch(
        actions.createRealPerson(data, () => {
          backToRealPersonsList();
        })
      )
        .then(() => {
          backToRealPersonsList();
        })
        .catch(() => {
          //backToRealPersonsList();
        });
    } else {
      dispatch(
        actions.updateRealPerson(id, data, () => {
          backToRealPersonsList();
        })
      )
        .then(() => {
          backToRealPersonsList();
        })
        .catch(() => {
          //backToRealPersonsList();
        });
    }
  };

  const btnRefPerson = useRef("1");
  const btnRefRealPerson = useRef("2");
  const btnRefPhones = useRef("3");
  const btnRefAddresses = useRef("4");
  const btnRefPersonSpecialDays = useRef("5");
  const btnRefPersonGroups = useRef("6");
  const btnRefCredits = useRef("7");
  const btnRefWallets = useRef("8");

  const saveRealPersonClick = () => {
    let personObj = {};

    btnRefPerson.current.Collect((datas) => {
      for (const prop in datas) {
        if (datas.hasOwnProperty(prop)) {
          const obj = datas[prop];

          if (!!obj && typeof obj != "object") personObj[prop] = obj;
        }
      }

      btnRefRealPerson.current.Collect((datas) => {
        personObj["RealPerson"] = datas;

        btnRefPhones.current.Collect((datas) => {
          personObj["Phones"] = datas;
        });
        btnRefAddresses.current.Collect((datas) => {
          personObj["Addresses"] = datas;
        });
        btnRefPersonSpecialDays.current.Collect((datas) => {
          personObj["PersonSpecialDays"] = datas;
        });
        btnRefPersonGroups.current.Collect((datas) => {
          personObj["RelationPersonGroups"] = datas;
        });
        btnRefCredits.current.Collect((datas) => {
          personObj["Credits"] = datas;
        });
        btnRefWallets.current.Collect((datas) => {
          personObj["Wallets"] = datas;
        });

        SavePerson(personObj);
      });
    });
  };

  const backToRealPersonsList = () => {
    history.push(`/core/realPersons`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
        <Card>
          {actionsLoading && <ModalProgressBar />}
          {!actionsLoading && error != null && (
            <>
              <ModalProgressBar variant="danger" />
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={error}
              ></Alerty>
            </>
          )}
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToRealPersonsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveRealPersonClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="realPerson"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="realPerson"
                title={t("RealPerson.Entity")}
                className="nav-item"
              >
                <RealPersonEditForm
                  actionsLoading={actionsLoading}
                  realPerson={realObj}
                  ref={btnRefRealPerson}
                />
                <PersonEditForm
                  actionsLoading={actionsLoading}
                  person={personObj}
                  ref={btnRefPerson}
                />
              </Tab>
              <Tab
                eventKey="phones"
                title={t("Phone.Plural")}
                className="nav-item"
              >
                <PhonesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  phone={phonesObj}
                  ref={btnRefPhones}
                >
                  <Phones />
                </PhonesUIProvider>
              </Tab>
              <Tab
                eventKey="addresses"
                title={t("Address.Plural")}
                className="nav-item"
              >
                <AddressesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  address={addressObj}
                  ref={btnRefAddresses}
                >
                  <Addresses />
                </AddressesUIProvider>
              </Tab>
              <Tab
                eventKey="personSpecialDays"
                title={t("PersonSpecialDay.Plural")}
                className="nav-item"
              >
                <PersonSpecialDaysUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  personSpecialDay={personSpecialDaysObj}
                  ref={btnRefPersonSpecialDays}
                >
                  <PersonSpecialDays />
                </PersonSpecialDaysUIProvider>
              </Tab>
              <Tab
                eventKey="relationPersonGroups"
                title={t("PersonGroup.Plural")}
                className="nav-item"
              >
                <RelationPersonGroupsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  relationPersonGroup={relationPersonGroupsObj}
                  ref={btnRefPersonGroups}
                >
                  <RelationPersonGroups />
                </RelationPersonGroupsUIProvider>
              </Tab>
              <Tab
                eventKey="credits"
                title={t("Credit.Plural")}
                className="nav-item"
              >
                <CreditsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  credit={creditObj}
                  ref={btnRefCredits}
                >
                  <Credits />
                </CreditsUIProvider>
              </Tab>
              <Tab
                eventKey="wallets"
                title={t("Wallet.Plural")}
                className="nav-item"
              >
                <WalletsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  wallet={walletObj}
                  ref={btnRefWallets}
                >
                  <Wallets />
                </WalletsUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
