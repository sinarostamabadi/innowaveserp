import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Input,
  Select,
  DatePickerField,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import { getFreeRestaurantTables } from "./../../../_redux/RestaurantTables/RestaurantTablesCrud";
import { getAllRestaurantInvoiceStatuses } from "./../../../_redux/RestaurantInvoiceStatus/RestaurantInvoiceStatusesCrud";
import { DefaultRestaurant } from "../../../../../../core/_partials/custom/defaults/DefaultRestaurant";

export const RestaurantInvoiceEditForm = forwardRef(
  (
    { restaurantInvoice, btnRef, saveRestaurantInvoice, changeRelated },
    ref
  ) => {
    const { t } = useTranslation();
    const [restaurantTables, setRestaurantTables] = useState([]);
    const [invoiceDate, setInvoiceDate] = useState(
      restaurantInvoice.InvoiceDateObj
    );
    const [personId, setPersonId] = useState(restaurantInvoice.PersonId);

    const [restaurantInvoiceStatuses, setRestaurantInvoiceStatuses] = useState(
      []
    );

    const RestaurantInvoiceEditSchema = Yup.object().shape({
      RestaurantTableId: Yup.string().required(
        t("err.IsRequired", { 0: t("RestaurantInvoice.RestaurantTable") })
      ),
      InvoiceDateObj: Yup.object().required(
        t("err.IsRequired", { 0: t("RestaurantInvoice.InvoiceDate") })
      ),
      PersonId: Yup.array().required(
        t("err.IsRequired", { 0: t("RestaurantInvoice.Person") })
      ),
    });

    let callBack;
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnInvoiceSend");
        btnSend.click();
      },
    }));

    useEffect(() => {
      if (restaurantTables.length == 0)
        getFreeRestaurantTables().then(({ data }) =>
          setRestaurantTables((restaurantTables) => [
            { RestaurantTableId: null, Title: t("Common.WithoutSelect") },
            ...data.Items,
          ])
        );
    }, [restaurantTables.length]);
    useEffect(() => {
      if (restaurantInvoiceStatuses.length == 0)
        getAllRestaurantInvoiceStatuses().then(({ data }) =>
          setRestaurantInvoiceStatuses((restaurantInvoiceStatuses) => [
            {
              RestaurantInvoiceStatusId: null,
              Title: t("Common.WithoutSelect"),
            },
            ...data.Items,
          ])
        );
    }, [restaurantInvoiceStatuses.length]);

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

    useEffect(() => {
      let invoiceDateTime = "";

      if (!!invoiceDate)
        invoiceDateTime = moment
          .from(
            invoiceDate.year + "/" + invoiceDate.month + "/" + invoiceDate.day,
            process.env.REACT_APP_DATE,
            "YYYY/MM/DD"
          )
          .locale("en")
          .format("YYYY-MM-DD");
      changeRelated(invoiceDateTime, personId);
    }, [invoiceDate, personId, changeRelated]);

    return (
      <>
        <Formik
          id="restaurantInvoice"
          key="restaurantInvoice"
          enableReinitialize={true}
          initialValues={restaurantInvoice}
          validationSchema={RestaurantInvoiceEditSchema}
          onSubmit={(values) => {
            console.log("values > ", values);
            !!callBack && callBack(values);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  {!!restaurantInvoice &&
                  !!restaurantInvoice.RestaurantInvoiceId ? (
                    <>
                      <div className="col-lg-3">
                        <Field
                          name="InvoiceNumber"
                          component={Input}
                          type="number"
                          customFeedbackLabel=""
                          label={t("RestaurantInvoice.InvoiceNumber")}
                          disabled={true}
                          readOnly={true}
                        />
                      </div>
                      <div className="col-lg-3">
                        <Select
                          key="RestaurantInvoiceStatusId"
                          name="RestaurantInvoiceStatusId"
                          label={t("RestaurantInvoice.RestaurantInvoiceStatus")}
                          customFeedbackLabel=""
                        >
                          {restaurantInvoiceStatuses.map((type) => (
                            <option
                              key={type.RestaurantInvoiceStatusId}
                              value={type.RestaurantInvoiceStatusId}
                            >
                              {type.Title}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="col-lg-3">
                    <DefaultRestaurant
                      name="RestaurantId"
                      defaultRestaurant={restaurantInvoice.Restaurant}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Select
                      key="RestaurantTableId"
                      name="RestaurantTableId"
                      label={t("RestaurantInvoice.RestaurantTable")}
                      customFeedbackLabel=""
                    >
                      {restaurantTables.map((type) => (
                        <option
                          key={type.RestaurantTableId}
                          value={type.RestaurantTableId}
                        >
                          {type.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-3">
                    <DatePickerField
                      name="InvoiceDateObj"
                      customFeedbackLabel=""
                      label={t("RestaurantInvoice.InvoiceDate")}
                      handleOnChange={setInvoiceDate}
                    />
                  </div>
                  <div className="col-lg-3">
                    <SuggestionField
                      key="PersonId"
                      name="PersonId"
                      labelKey="FullNameFa"
                      customFeedbackLabel=""
                      label={t("FutsalReserve.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      handleOnChange={(val) => setPersonId(val)}
                      defaultValue={
                        !!restaurantInvoice && !!restaurantInvoice.Person
                          ? [restaurantInvoice.Person]
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
                <button
                  id="BtnInvoiceSend"
                  type="submit"
                  style={{ display: "none" }}
                  ref={btnRef}
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
