import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, Input } from "../../../../../../../core/_partials/controls";
import { getAllPhoneTypes } from "./../../../../../General/_redux/phoneTypes/phoneTypesCrud";

export function PhoneEditForm({ savePhone, phone, actionsLoading, onHide }) {
  const { t } = useTranslation();

  const [phoneTypes, setPhoneTypes] = useState([]);
  useEffect(() => {
    if (phoneTypes.length == 0)
      getAllPhoneTypes().then(({ data }) =>
        setPhoneTypes((phoneTypes) => [
          { PhoneTypeId: null, TitleFa: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [phoneTypes.length]);

  // Validation schema
  const PhoneEditSchema = Yup.object().shape({
    PhoneNumber: Yup.string()
      .min(3, t("err.Min", { 0: 3 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Phone.PhoneNumber") })),
    PhoneTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("Phone.PhoneType") })
    ),
  });

  function clean(dirty) {
    return {
      PhoneId: +dirty.PhoneId,
      PersonId: +dirty.PersonId,
      PhoneTypeId: +dirty.PhoneTypeId,
      PhoneType: {
        PhoneTypeId: +dirty.PhoneTypeId,
        TitleFa: phoneTypes.find((p) => p.PhoneTypeId == dirty.PhoneTypeId)
          .TitleFa,
      },
      AreaCode: dirty.AreaCode,
      PhoneNumber: dirty.PhoneNumber,
      Extension: dirty.Extension,
      IsDeleted: false,
    };
  }
  return (
    <>
      <Formik
        key="CompanyPhone"
        enableReinitialize={true}
        initialValues={phone}
        validationSchema={PhoneEditSchema}
        onSubmit={(values) => {
          savePhone(clean(values));
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
                  <div className="col-lg-12">
                    <Select name="PhoneTypeId" label={t("Phone.PhoneType")}>
                      {phoneTypes.map((phoneType) => (
                        <option
                          key={phoneType.PhoneTypeId}
                          value={phoneType.PhoneTypeId}
                        >
                          {phoneType.TitleFa}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="AreaCode"
                      component={Input}
                      label={t("Phone.AreaCode")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="PhoneNumber"
                      component={Input}
                      label={t("Phone.PhoneNumber")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Extension"
                      component={Input}
                      label={t("Phone.Extension")}
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
    </>
  );
}
