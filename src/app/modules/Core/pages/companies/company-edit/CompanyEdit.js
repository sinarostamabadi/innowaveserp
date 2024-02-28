/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/companies/companiesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CompanyEditForm } from "./CompanyEditForm";
import { PersonEditForm } from "./PersonEditForm";
import { AddressesUIProvider } from "../company-addresses/AddressesUIContext";
import { Addresses } from "../company-addresses/Addresses";
import { PhonesUIProvider } from "../company-phones/PhonesUIContext";
import { Phones } from "../company-phones/Phones";
import { PersonSpecialDaysUIProvider } from "../company-specialdays/PersonSpecialDaysUIContext";
import { PersonSpecialDays } from "../company-specialdays/PersonSpecialDays";
import { RelationPersonGroupsUIProvider } from "../company-relationPersonGroups/RelationPersonGroupsUIContext";
import { RelationPersonGroups } from "../company-relationPersonGroups/RelationPersonGroups";
import { CompanyPersonsUIProvider } from "../company-person/CompanyPersonsUIContext";
import { CompanyPersons } from "../company-person/CompanyPersons";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

export function CompanyEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    PersonId: undefined,
    Email: "",
    WebSite: "",
    Mobile: "",
    DiscountMax: "",
    Company: {
      CompanyId: undefined,
      TitleFa: "",
      TitleEn: "",
      CompanyTypeId: "",
      BusinessCertifyNo: "",
      RegisterNumber: "",
      RegisterDate: "",
      EconomicCode: "",
      ParentId: "",
      CompanyPersons: [],
    },
    Phones: [],
    Addresses: [],
    PersonSpecialDays: [],
    RelationPersonGroups: [],
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { actionsLoading, companyForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      companyForEdit: state.companies.companyForEdit,
      error: state.companies.error,
    }),
    shallowEqual
  );

  const [personObj, setPersonObj] = useState(initModel);
  const [realObj, setRealObj] = useState(initModel.Company);
  const [phonesObj, setPhonesObj] = useState(initModel.Phones);
  const [addressObj, setAddressObj] = useState(initModel.Addresses);
  const [personSpecialDaysObj, setPersonSpecialDaysObj] = useState(
    initModel.PersonSpecialDays
  );
  const [relationPersonGroupsObj, setRelationPersonGroupsObj] = useState(
    initModel.RelationPersonGroups
  );
  const [companyPersonsObj, setCompanyPersonsObj] = useState(
    initModel.Company.CompanyPersons
  );

  const dispatch = useDispatch();
  useEffect(() => {
    !!id && dispatch(actions.fetchCompany(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Company.Entity");

    if (companyForEdit && id) {
      _title = t("Common.Edit") + " " + companyForEdit.FullNameFa;

      setPersonObj(companyForEdit);
      setRealObj({
        ...companyForEdit.Company,
        RegisterDateObj: EnToFaObjDate(companyForEdit.Company.RegisterDate),
      });
      setPhonesObj(companyForEdit.Phones);
      setAddressObj(companyForEdit.Addresses);
      setPersonSpecialDaysObj(
        !!companyForEdit.PersonSpecialDays
          ? companyForEdit.PersonSpecialDays
          : []
      );
      setRelationPersonGroupsObj(companyForEdit.RelationPersonGroups);
      setCompanyPersonsObj(companyForEdit.Company.CompanyPersons);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyForEdit, id]);

  const SavePerson = (data) => {
    if (!id) {
      dispatch(
        actions.createCompany(data, () => {
          backToCompaniesList();
        })
      )
        .then(() => {
          backToCompaniesList();
        })
        .catch(() => {
          //backToCompaniesList();
        });
    } else {
      dispatch(
        actions.updateCompany(id, data, () => {
          backToCompaniesList();
        })
      )
        .then(() => {
          backToCompaniesList();
        })
        .catch(() => {
          //backToCompaniesList();
        });
    }
  };

  const btnRefPerson = useRef("1");
  const btnRefCompany = useRef("2");
  const btnRefPhones = useRef("3");
  const btnRefAddresses = useRef("4");
  const btnRefPersonSpecialDays = useRef("5");
  const btnRefPersonGroups = useRef("6");
  const btnRefCompanyPersons = useRef("6");

  const saveCompanyClick = () => {
    let companyObj = {};

    btnRefPerson.current.Collect((datas) => {
      for (const prop in datas) {
        if (datas.hasOwnProperty(prop)) {
          const obj = datas[prop];

          if (!!obj && typeof obj != "object") companyObj[prop] = obj;
        }
      }

      btnRefCompany.current.Collect((datas) => {
        companyObj["Company"] = {};

        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (!!obj && typeof obj != "object") {
              companyObj["Company"][prop] = obj;
            }
          }
        }
        companyObj.Company.CompanyTypeId = +companyObj.Company.CompanyTypeId;
        btnRefPhones.current.Collect((datas) => {
          companyObj["Phones"] = datas;
        });
        btnRefAddresses.current.Collect((datas) => {
          companyObj["Addresses"] = datas;
        });
        btnRefPersonSpecialDays.current.Collect((datas) => {
          companyObj["PersonSpecialDays"] = datas;
        });
        btnRefPersonGroups.current.Collect((datas) => {
          companyObj["RelationPersonGroups"] = datas;
        });
        btnRefCompanyPersons.current.Collect((datas) => {
          companyObj.Company["CompanyPersons"] = datas;
        });
        SavePerson(companyObj);
      });
    });
  };

  const backToCompaniesList = () => {
    history.push(`/Core/companies`);
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
                onClick={backToCompaniesList}
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
                onClick={saveCompanyClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="company"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="company"
                title={t("Company.Entity")}
                className="nav-item"
              >
                <CompanyEditForm
                  actionsLoading={actionsLoading}
                  company={realObj}
                  ref={btnRefCompany}
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
                eventKey="companyPersons"
                title={t("CompanyPerson.Plural")}
                className="nav-item"
              >
                <CompanyPersonsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  companyPerson={companyPersonsObj}
                  ref={btnRefCompanyPersons}
                >
                  <CompanyPersons />
                </CompanyPersonsUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
