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
  TextArea,
} from "../../../../../../core/_partials/controls";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { suggestProduct } from "../../../../Warehouse/_redux/products/productsCrud";
import { getByProduct } from "../../../../Warehouse/_redux/productUnits/productUnitsCrud";

export const TakeAwayRequestEditForm = forwardRef(
  ({ takeAwayRequest, mode }, ref) => {
    const { t } = useTranslation();
    const defaultInput = useRef(null);
    !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

    let callBack;
    const TakeAwayRequestEditSchema = Yup.object().shape({
      Title: Yup.string().required(
        t("err.IsRequired", { 0: t("TakeAwayRequest.Title") })
      ),
      TakeAwayRequestNumber: Yup.string().required(
        t("err.IsRequired", { 0: t("TakeAwayRequest.TakeAwayRequestNumber") })
      ),
      RegisterDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("TakeAwayRequest.RegisterDate") }))
        .nullable(),
      FromDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("TakeAwayRequest.FromDate") }))
        .nullable(),
      ToDateObj: Yup.object()
        .required(t("err.IsRequired", { 0: t("TakeAwayRequest.ToDate") }))
        .nullable(),
      FromTimeObj: Yup.string()
        .required(t("err.IsRequired", { 0: t("TakeAwayRequest.FromTime") }))
        .nullable(),
      ToTimeObj: Yup.string()
        .required(t("err.IsRequired", { 0: t("TakeAwayRequest.ToTime") }))
        .nullable(),
    });

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnTakeAwayRequestSend");
        btnSend.click();
      },
    }));

    const Genders = [
      { text: "بدون انتخاب", value: null },
      { text: "مرد", value: 1 },
      { text: "زن", value: 0 },
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
      if (!!takeAwayRequest.TakeAwayRequestId)
        setProductSelected(takeAwayRequest.RewardProductId);
    }, [takeAwayRequest]);

    function cleanData(data) {
      return {
        TakeAwayRequestId: takeAwayRequest.TakeAwayRequestId,
        TakeAwayRequestTypeId: mode,
        Title: data.Title,
        TakeAwayRequestNumber: +data.TakeAwayRequestNumber,
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
        FromYearsOld:
          data.FromYearsOld == null || data.FromYearsOld == ""
            ? null
            : +data.FromYearsOld,
        ToYearsOld:
          data.ToYearsOld == "" || data.ToYearsOld == null
            ? null
            : +data.ToYearsOld,
        Sex: data.Sex == "" || data.Sex == null ? null : +data.Sex,
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
        TakeAwayRequestCosts: [],
      };
    }

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={takeAwayRequest}
          validationSchema={TakeAwayRequestEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(cleanData(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-12">
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      customFeedbackLabel=""
                      label={t("RestaurantDiscountType.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={
                        !!takeAwayRequest && !!takeAwayRequest.Person
                          ? [takeAwayRequest.Person]
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
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <Field
                      name="Description"
                      component={TextArea}
                      customFeedbackLabel=""
                      label={t("TakeAwayRequest.Description")}
                      setref={defaultInput}
                    />
                  </div>
                </div>
                <button
                  id="BtnTakeAwayRequestSend"
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
