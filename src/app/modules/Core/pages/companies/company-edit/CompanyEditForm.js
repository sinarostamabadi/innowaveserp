/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  Select,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllCompanyTypes } from "./../../../_redux/companyTypes/companyTypesCrud";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";

export const CompanyEditForm = forwardRef(
  ({ company, btnRef, editmode }, ref) => {
    const { t } = useTranslation();

    const [companyTypes, setCompanyTypes] = useState([]);
    useEffect(() => {
      if (companyTypes.length == 0)
        getAllCompanyTypes().then(({ data }) =>
          setCompanyTypes((phoneTypes) => [
            { CompanyTypeId: null, TitleFa: t("Common.WithoutSelect") },
            ...data.Items,
          ])
        );
    }, [companyTypes.length]);

    const CompanyEditSchema = Yup.object().shape({
      TitleFa: Yup.string()
        .min(2, t("err.Min", { 0: 2 }))
        .max(100, t("err.Max", { 0: 100 }))
        .required(t("err.IsRequired", { 0: t("Company.TitleFa") })),
      NationalCode: Yup.string()
        .min(10, t("err.Min", { 0: "10" }))
        .max(10, t("err.Max", { 0: "10" })),
      CompanyTypeId: Yup.string().required(
        t("err.IsRequired", { 0: t("Company.CompanyType") })
      ),
    });

    const [datares, setRes] = useState(company);
    useEffect(() => {
      setRes(company);
    }, [company]);

    let callBack;

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnCompanySend");
        btnSend.click();
      },
    }));

    function clean(data) {
      return {
        CompanyId: data.CompanyId,
        ParentId: data.ParentId,
        TitleFa: data.TitleFa,
        TitleEn: data.TitleEn,
        CompanyTypeId: !!data.CompanyTypeId ? +data.CompanyTypeId : null,
        BusinessCertifyNo: data.BusinessCertifyNo,
        RegisterNumber: data.RegisterNumber,
        RegisterDate: FaObjToEnDateTime(data.RegisterDateObj),
        EconomicCode: data.EconomicCode,
        CompanyPersons: data.CompanyPersons,
      };
    }

    return (
      <>
        <div className="mt-5">
          <Formik
            enableReinitialize={true}
            initialValues={datares}
            validationSchema={CompanyEditSchema}
            onSubmit={(values) => {
              !!callBack && callBack(clean(values));
            }}
          >
            {({ handleSubmit }) => (
              <>
                <Form id="Formik" className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="TitleFa"
                        component={Input}
                        customFeedbackLabel=""
                        label={t("Company.TitleFa")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="TitleEn"
                        component={Input}
                        autoComplete="off"
                        customFeedbackLabel=""
                        label={t("Company.TitleEn")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="BusinessCertifyNo"
                        component={Input}
                        type="text"
                        autoComplete="off"
                        customFeedbackLabel=""
                        label={t("Company.BusinessCertifyNo")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Select
                        name="CompanyTypeId"
                        label={t("Company.CompanyType")}
                        customFeedbackLabel=""
                      >
                        {companyTypes.map((companyType) => (
                          <option
                            key={companyType.CompanyTypeId}
                            value={companyType.CompanyTypeId}
                          >
                            {companyType.TitleFa}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="RegisterNumber"
                        component={Input}
                        type="text"
                        customFeedbackLabel=""
                        label={t("Company.RegisterNumber")}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="EconomicCode"
                        component={Input}
                        type="text"
                        customFeedbackLabel=""
                        label={t("Company.EconomicCode")}
                      />
                    </div>
                    <div className="col-lg-3">
                      <DatePickerField
                        name="RegisterDateObj"
                        customFeedbackLabel=""
                        label={t("Company.RegisterDate")}
                      />
                    </div>
                  </div>
                  <button
                    id="BtnCompanySend"
                    type="submit"
                    style={{ display: "none" }}
                    ref={btnRef}
                    onSubmit={() => handleSubmit()}
                  ></button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </>
    );
  }
);
