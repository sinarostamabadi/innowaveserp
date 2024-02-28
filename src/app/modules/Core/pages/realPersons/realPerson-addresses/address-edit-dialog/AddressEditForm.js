/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Select,
  Input,
  SuggestionField,
  TextArea,
} from "../../../../../../../core/_partials/controls";
import { SPECIFICATIONS_DICTIONARY } from "../AddressesUIHelper";
import { getAllAddressCategories } from "./../../../../../General/_redux/addressCategories/addressCategoriesCrud";

export function AddressEditForm({
  saveAddress,
  address,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  console.log("address > ", address);
  const [addressCategories, setAddressCategories] = useState([]);
  useEffect(() => {
    if (addressCategories.length == 0)
      getAllAddressCategories().then(({ data }) =>
        setAddressCategories((addressCategories) => [
          { AddressCategoryId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [addressCategories.length, t]);

  // Validation schema
  const AddressEditSchema = Yup.object().shape({
    AddressFa: Yup.string()
      .min(3, t("err.Min", { 0: 3 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Address.AddressFa") })),
    AddressCategoryId: Yup.string().required(
      t("err.IsRequired", { 0: t("Address.AddressCategory") })
    ),
  });

  const handleSuggestionCity = useCallback((query, fnCallback) => {
    axios
      .post("city/get", {
        Filters: [{ Property: "TitleFa", Operation: 7, Values: [query] }],
        OrderBy: "TitleFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  function clean(dirty) {
    return {
      AddressId: dirty.AddressId,
      AddressCategoryId: +dirty.AddressCategoryId,
      PersonId: +dirty.PersonId,
      AddressCategory: {
        AddressCategoryId: dirty.AddressCategoryId,
        Title: addressCategories.find(
          (p) => p.AddressCategoryId == dirty.AddressCategoryId
        ).Title,
      },
      CityId:
        Array.isArray(dirty.CityId) && dirty.CityId.length == 1
          ? dirty.CityId[0].CityId
          : !!dirty.CityId
          ? +dirty.CityId
          : null,
      City:
        Array.isArray(dirty.CityId) && dirty.CityId.length == 1
          ? dirty.CityId[0]
          : !!dirty.CityId
          ? dirty.City
          : null,
      AddressFa: dirty.AddressFa,
      AddressEn: dirty.AddressEn,
      PostalCode: dirty.PostalCode,
      MailBoxNumber: dirty.MailBoxNumber,
      Longitude: !!dirty.Longitude == false ? null : +dirty.Longitude,
      Latitude: !!dirty.Latitude == false ? null : +dirty.Latitude,
      IsDeleted: false,
    };
  }

  return (
    <>
      {address != null && (
        <Formik
          enableReinitialize={true}
          initialValues={address}
          validationSchema={AddressEditSchema}
          onSubmit={(values) => {
            saveAddress(clean(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Modal.Body className="">
                {actionsLoading && (
                  <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                  </div>
                )}
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Select
                        name="AddressCategoryId"
                        label={t("Address.AddressCategory")}
                      >
                        {addressCategories.map((addressCategory) => (
                          <option
                            key={addressCategory.AddressCategoryId}
                            value={addressCategory.AddressCategoryId}
                          >
                            {addressCategory.Title}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-lg-6">
                      <SuggestionField
                        name="CityId"
                        labelKey="TitleFa"
                        customFeedbackLabel=""
                        label={t("Address.City")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        handleSearch={handleSuggestionCity}
                        defaultValue={!!address.City ? [address.City] : []}
                        renderMenuItemChildren={(option, props) => (
                          <div>
                            <h6>{option.TitleFa}</h6>
                            <span>
                              {t("Township.Entity")}: {option.Township.TitleFa}
                            </span>
                            <br />
                            <span>
                              {t("Province.Entity")}:{" "}
                              {option.Township.Province.TitleFa}
                            </span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="AddressFa"
                        as="textarea"
                        component={TextArea}
                        label={t("Address.AddressFa")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="AddressEn"
                        as="textarea"
                        component={TextArea}
                        label={t("Address.AddressEn")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="PostalCode"
                        component={Input}
                        label={t("Address.PostalCode")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="MailBoxNumber"
                        component={Input}
                        label={t("Address.MailBoxNumber")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="Longitude"
                        component={Input}
                        label={t("Address.Longitude")}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="Latitude"
                        component={Input}
                        label={t("Address.Latitude")}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  {t("Common.Cancel")}
                </button>
                <> </>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  {t("Common.Save")}
                </button>
              </Modal.Footer>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
