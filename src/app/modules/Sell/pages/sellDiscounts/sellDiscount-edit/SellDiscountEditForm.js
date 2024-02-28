import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import {
  Input,
  Select,
  CheckboxField,
  DatePickerField,
  SuggestionField,
  TimePickerField,
} from "../../../../../../core/_partials/controls";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { suggestProduct } from "../../../../Warehouse/_redux/products/productsCrud";
import { getByProduct } from "../../../../Warehouse/_redux/productUnits/productUnitsCrud";

export const SellDiscountEditForm = forwardRef(
  ({ sellDiscount, mode }, ref) => {
    const { t } = useTranslation();
    const defaultInput = useRef(null);
    !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

    let callBack;
    const SellDiscountEditSchema = Yup.object().shape({
      Title: Yup.string().required(
        t("err.IsRequired", { 0: t("SellDiscount.Title") })
      ),
      SellDiscountNumber: Yup.string().required(
        t("err.IsRequired", { 0: t("SellDiscount.SellDiscountNumber") })
      ),
      RegisterDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("SellDiscount.RegisterDate") }))
        .nullable(),
      FromDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("SellDiscount.FromDate") }))
        .nullable(),
      ToDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("SellDiscount.ToDate") }))
        .nullable(),
      FromTimeObj: Yup.string()
        .required(t("err.IsRequired", { 0: t("SellDiscount.FromTime") }))
        .nullable(),
      ToTimeObj: Yup.string()
        .required(t("err.IsRequired", { 0: t("SellDiscount.ToTime") }))
        .nullable(),
    });

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnSellDiscountSend");
        btnSend.click();
      },
    }));

    const Genders = [
      { text: "Not selected", value: null },
      { text: "Male", value: 1 },
      { text: "Female", value: 0 },
    ];

    const handleSuggestionPerson = useCallback((query, fnCallback) => {
      axios
        .post("person/get", {
          Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
          OrderBy: "FullNameFa asc",
          PageNumber: 1,
          PageSize: 10,
        })
        .then(({ data }) => {
          fnCallback(data.Items);
        });
    });

    const handleSuggestionPersonGroup = useCallback((query, fnCallback) => {
      axios
        .post("PersonGroup/get", {
          Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
          OrderBy: "Title asc",
          PageNumber: 1,
          PageSize: 10,
        })
        .then(({ data }) => {
          fnCallback(data.Items);
        });
    });

    const handleSuggestionProduct = useCallback((query, fnCallback) => {
      suggestProduct(query).then(({ data }) => {
        fnCallback(data.Items);
      });
    });

    const [productSelected, setProductSelected] = useState(null);
    const [productUnits, setProductUnits] = useState([]);
    useEffect(() => {
      console.log("Test > ", productSelected);
      if (!!productSelected) {
        getByProduct(productSelected + "").then(({ data }) => {
          setProductUnits((productUnits) => [
            {
              ProductUnitId: null,
              Title: t("Common.WithoutSelect"),
              Unit: { Name: t("Common.WithoutSelect") },
            },
            ...data.Items,
          ]);
        });
      }
    }, [productSelected]);

    useEffect(() => {
      if (!!sellDiscount.SellDiscountId)
        setProductSelected(sellDiscount.RewardProductId);
    }, [sellDiscount]);

    function cleanData(data) {
      return {
        SellDiscountId: sellDiscount.SellDiscountId,
        SellDiscountTypeId: mode,
        Title: data.Title,
        SellDiscountNumber: +data.SellDiscountNumber,
        PersonId:
          Array.isArray(data.PersonId) && data.PersonId.length == 1
            ? +data.PersonId[0].PersonId
            : !!data.PersonId
            ? data.PersonId
            : null,
        PersonGroupId:
          Array.isArray(data.PersonGroupId) && data.PersonGroupId.length == 1
            ? +data.PersonGroupId[0].PersonGroupId
            : !!data.PersonGroupId
            ? data.PersonGroupId
            : null,
        RegisterDate: FaObjToEnDateTime(data.RegisterDateObj),
        FromDate: FaObjToEnDateTime(data.FromDateObj),
        ToDate: FaObjToEnDateTime(data.ToDateObj),
        FromTime: data.FromTimeObj && data.FromTimeObj.format("HH:mm"),
        ToTime: data.ToTimeObj && data.ToTimeObj.format("HH:mm"),
        HasProduct: data.HasProduct,
        FromYearsOld: data.FromYearsOld == null || data.FromYearsOld == "" ? null : +data.FromYearsOld,
        ToYearsOld: data.ToYearsOld == "" || data.ToYearsOld == null? null : +data.ToYearsOld,
        Sex: data.Sex == "" || data.Sex == null? null: +data.Sex,
        RewardProductId:
          Array.isArray(data.RewardProductId) &&
          data.RewardProductId.length == 1
            ? +data.RewardProductId[0].ProductId
            : !!data.RewardProductId
            ? data.RewardProductId
            : null,
        RewardProduct:
          Array.isArray(data.RewardProductId) &&
          data.RewardProductId.length == 1
            ? +data.RewardProductId[0]
            : !!data.RewardProductId
            ? data.RewardProduct
            : null,
        RewardProductUnitId:
          data.RewardProductUnitId && +data.RewardProductUnitId,
        RewardProductUnit: !!data.RewardProductUnitId
          ? {
              RewardProductUnitId:
                data.RewardProductUnitId && +data.RewardProductUnitId,
              Name: "",
            }
          : null,
        SellDiscountDetails: [],
      };
    }

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={sellDiscount}
          validationSchema={SellDiscountEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(cleanData(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-3">
                    <Field
                      name="Title"
                      component={Input}
                      required
                      customFeedbackLabel=""
                      label={t("SellDiscount.Title")}
                      setref={defaultInput}
                    />
                  </div>
                  <div className="col-md-3">
                    <Field
                      name="SellDiscountNumber"
                      component={Input}
                      required
                      customFeedbackLabel=""
                      label={t("SellDiscount.SellDiscountNumber")}
                    />
                  </div>
                  <div className="col-md-3">
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      customFeedbackLabel=""
                      label={t("RestaurantDiscountType.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={
                        !!sellDiscount && !!sellDiscount.Person
                          ? [sellDiscount.Person]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.FullNameFa}</h6>
                        </div>
                      )}
                      extraAction={[
                        {
                          icon: "far fa-plus",
                          title: t("RealPerson.Entity"),
                          url: "/Core/realPersons/new",
                        },
                      ]}
                    />
                  </div>
                  <div className="col-md-3">
                    <SuggestionField
                      name="PersonGroupId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("RestaurantDiscountType.PersonGroup")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPersonGroup}
                      defaultValue={
                        !!sellDiscount && !!sellDiscount.PersonGroup
                          ? [sellDiscount.PersonGroup]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-3">
                    <DatePickerField
                      name="RegisterDateObj"
                      required
                      customFeedbackLabel=""
                      label={t("SellDiscount.RegisterDate")}
                    />
                  </div>
                  <div className="col-md-3">
                    <DatePickerField
                      name="FromDateObj"
                      required
                      customFeedbackLabel=""
                      label={t("SellDiscount.FromDate")}
                    />
                  </div>
                  <div className="col-md-3">
                    <DatePickerField
                      name="ToDateObj"
                      required
                      customFeedbackLabel=""
                      label={t("SellDiscount.ToDate")}
                    />
                  </div>
                  <div className="col-md-3">
                    <div className="row">
                      <div className="col-md-6">
                        <CheckboxField
                          name="HasProduct"
                          customFeedbackLabel=""
                          label={t("SellDiscount.HasProduct")}
                        />
                      </div>
                      <div className="col-md-6">
                        <CheckboxField
                          name="IsActive"
                          customFeedbackLabel=""
                          label={t("SellDiscount.IsActive")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-3">
                    <TimePickerField
                      name="FromTimeObj"
                      required
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("SellDiscount.FromTime")}
                    />
                  </div>
                  <div className="col-lg-3">
                    <TimePickerField
                      name="ToTimeObj"
                      required
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("SellDiscount.ToTime")}
                    />
                  </div>
                  <div className="col-md-2">
                    <Field
                      name="FromYearsOld"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("SellDiscount.FromYearsOld")}
                    />
                  </div>
                  <div className="col-md-2">
                    <Field
                      name="ToYearsOld"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("SellDiscount.ToYearsOld")}
                    />
                  </div>
                  <div className="col-lg-2">
                    <Select
                      name="Sex"
                      label={t("RealPerson.Gender")}
                      customFeedbackLabel=""
                      type="number"
                    >
                      {Genders.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.text}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                {(mode == 2 || sellDiscount.SellDiscountTypeId == 2) && (
                  <>
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <SuggestionField
                          name="RewardProductId"
                          fieldKey="ProductId"
                          labelKey="Name"
                          customFeedbackLabel=""
                          label={t("SellDiscount.RewardProduct")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionProduct}
                          handleOnChange={(val) => setProductSelected(val)}
                          defaultValue={
                            sellDiscount && !!sellDiscount.RewardProduct
                              ? [sellDiscount.RewardProduct]
                              : []
                          }
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Name}</h6>
                              <span>
                                <strong>{t("Common.Code")}: </strong>
                                {option.Code}
                              </span>
                            </div>
                          )}
                        />
                      </div>
                      <div className="col-lg-6">
                        <Select
                          name="RewardProductUnitId"
                          label={t("SellDiscount.RewardProductUnit")}
                        >
                          {productUnits.map((productUnit) => (
                            <option
                              key={productUnit.ProductUnitId}
                              value={productUnit.ProductUnitId}
                            >
                              {!!productUnit && !!productUnit.Unit
                                ? productUnit.Unit.Name
                                : ""}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </>
                )}
                <button
                  id="BtnSellDiscountSend"
                  type="submit"
                  style={{ display: "none" }}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
      </>
    );
  }
);
