import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  CheckboxField,
  SuggestionField,
  Select,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { getAllUnits } from "../../../../General/_redux/units/unitsCrud";
import { suggestProduct } from "../../../_redux/products/productsCrud";

export const ProductEditForm = forwardRef(({ product, group }, ref) => {
  const { t } = useTranslation();
  const [fullCode, setFullCode] = useState(null);
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const ProductEditSchema = Yup.object().shape({
    Code: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Product.Code") })),
    Name: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Product.Name") })),
    ProductGroupId: Yup.array().required(
      t("err.IsRequired", { 0: t("Product.ProductGroup") })
    ),
    BaseUnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("Product.BaseUnit") })
    ),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnProductSend");
      btnSend.click();
    },
  }));

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    Axios.post("ProductGroup/Get", {
      Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
      OrderBy: "Title asc",
      PageNumber: 1,
      PageSize: 10,
    }).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  useEffect(() => {
    if (!!product && !!product.ProductGroup && !!product.ProductGroup.FullCode)
      setFullCode(product.ProductGroup.FullCode);
  }, [product]);

  const handleSuggestionCountry = useCallback((query, fnCallback) => {
    Axios.post("Country/Get", {
      Filters: [{ Property: "TitleFa", Operation: 7, Values: [query] }],
      OrderBy: "TitleFa asc",
      PageNumber: 1,
      PageSize: 10,
    }).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionBrand = useCallback((query, fnCallback) => {
    Axios.post("Brand/Get", {
      Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
      OrderBy: "Title asc",
      PageNumber: 1,
      PageSize: 10,
    }).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [units, setUnits] = useState([]);
  useEffect(() => {
    if (units.length == 0)
      getAllUnits().then(({ data }) =>
        setUnits((units) => [
          { UnitId: "", Name: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [units.length]);

  function cleanData(data) {
    return {
      ProductId: data.ProductId,
      BaseUnitId: data.BaseUnitId && +data.BaseUnitId,
      CountryId: Array.isArray(data.CountryId) && data.CountryId.length
        ? data.CountryId[0].CountryId
        : !!data.CountryId ? data.CountryId : null,
      BrandId: Array.isArray(data.BrandId) && data.BrandId.length
        ? data.BrandId[0].BrandId
        : !!data.BrandId ? +data.BrandId : null,
      ProductGroupId: Array.isArray(data.ProductGroupId) && data.ProductGroupId.length
        ? data.ProductGroupId[0].ProductGroupId
        : !!data.ProductGroupId ? +data.ProductGroupId : null,
      Code: data.Code,
      HasSerial: data.HasSerial,
      Name: data.Name,
      ParentId: Array.isArray(data.ParentId) && data.ParentId.length == 1 ? data.ParentId[0].ProductId : !!data.ParentId ? data.ParentId : null,
      ParentCount: data.ParentCount == "" || data.ParentCount == null ? null : +data.ParentCount,
      ScalesKeyNumber: data.ScalesKeyNumber == "" || data.ScalesKeyNumber == null ? null : +data.ScalesKeyNumber,
      ProductWarehouses: data.ProductWarehouses,
    };
  }

  return (
    <div className="pt-3">
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          console.log("values > ", values);
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="Code"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Product.Code")}
                    setref={defaultInput}
                  />
                </div>
                <div className="col-lg-4">
                  <label>{t("ProductGroup.FullCode")}</label>
                  <label className="form-control" name="FullCode">
                    {!!fullCode ? fullCode : !!group ? group.Code : ""}
                  </label>
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Name"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Product.Name")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="ProductGroupId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("Product.ProductGroup")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProductGroup}
                    handleOnChange={(val) => setFullCode(val)}
                    defaultValue={
                      !!group ? [group] : (!!product && !!product.ProductGroup ? [product.ProductGroup] : [])
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="CountryId"
                    labelKey="TitleFa"
                    customFeedbackLabel=""
                    label={t("Product.Country")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionCountry}
                    defaultValue={
                      product && !!product.Country ? [product.Country] : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.TitleFa}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="BrandId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("Product.Brand")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionBrand}
                    defaultValue={
                      product && !!product.Brand ? [product.Brand] : []
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
                <div className="col-lg-4">
                  <Select
                    name="BaseUnitId"
                    label={t("Product.BaseUnit")}
                    setref={defaultInput}
                  >
                    {units.map((unit) => (
                      <option key={unit.UnitId} value={unit.UnitId}>
                        {unit.Name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <CheckboxField
                    name="HasSerial"
                    customFeedbackLabel=""
                    label={t("Product.HasSerial")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <SuggestionField
                    name="ParentId"
                    labelKey="Name"
                    fieldKey="ProductId"
                    customFeedbackLabel=""
                    label={t("Product.Parent")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProduct}
                    defaultValue={
                      product && !!product.Parent ? [product.Parent] : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Name}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ParentCount"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Product.ParentCount")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ScalesKeyNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Product.ScalesKeyNumber")}
                  />
                </div>
              </div>
              <button
                id="BtnProductSend"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
});
