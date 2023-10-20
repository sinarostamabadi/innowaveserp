import { forwardRef, useImperativeHandle, useCallback, useState, useEffect, createRef } from "react";
import { InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import { DatePickerField, Select, Input, SuggestionField } from "src/core/_partials/controls";
import { getAllLines } from "./../../../_redux/lines/linesCrud";
import { releaseLine } from "../../../_redux/reserves/reservesCrud";

export const ReserveSimpleForm = forwardRef(
  ({ reserve }, ref) => {
    const { t } = useTranslation();
    const defaultInput = createRef();
    useEffect(() => defaultInput.current.focus(), [defaultInput]);

    let callBack;
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnReserveSend");
        btnSend.click();
      },
    }));

    const ReserveEditSchema = Yup.object().shape({
      LineId: Yup.number().required(t("err.IsRequired", { 0: t("BowlingReserve.Line") })),
      PersonId: Yup.array().nullable().min(1, t("err.IsRequired", { 0: t("BowlingReserve.Person") })),
      ReserveDate: Yup.string().required(t("err.IsRequired", { 0: t("BowlingReserve.ReserveDate") }))
    });
    const [lines, setLines] = useState([]);

    useEffect(() => {
      if (lines.length == 0)
        getAllLines().then(({ data }) =>
          setLines((lines) => [
            { LineId: "", Title: t("Common.WithoutSelect") },
            ...data.Items,
          ])
        );
    }, [lines.length, t]);

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

    function clean(dirty) {
      return {
        ReserveId: dirty.ReserveId,
        LineId: !!dirty.LineId ? +dirty.LineId : null,
        ReserveDate: dirty.ReserveDate,
        PersonId: !!dirty.PersonId ? +dirty.PersonId : null,
        ClosetNumber: 0,
        PersonCount: dirty.ReservePersonScores.length,
        PayablePrice: !!dirty.PayablePrice ? +dirty.PayablePrice : null,
        IsSet: true,
        ReservePersonScores: dirty.ReservePersonScores,
      };
    }

    function doneGame(lineId) {
      releaseLine(lineId)
    }

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={reserve}
          validationSchema={ReserveEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(clean(values));
          }}
        >
          {({ handleSubmit, values }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-3">
                    <div className="row">
                      <div className="col pr-1">
                        <Select
                          name="LineId"
                          label={t("BowlingReserve.Line")}
                          setref={defaultInput}
                        >
                          {lines.map((line) => (
                            <option key={line.LineId} value={line.LineId}>
                              {line.Title}
                            </option>
                          ))}
                        </Select>
                      </div>
                      {/* <div className="col-auto pl-1 pt-8">
                        <Button variant="danger" onClick={_ => doneGame(values["LineId"])}>{t("Common.Done")}</Button>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <Field
                      name="PayablePrice"
                      component={Input}
                      type="number"
                      customFeedbackLabel=""
                      label={t("BowlingReserve.PayablePrice")}
                    />
                  </div>
                  <div className="col-md-3">
                    <DatePickerField
                      name="ReserveDate"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BowlingReserve.ReserveDate")}
                      value={reserve.ReserveDate}
                    />
                  </div>
                  <div className="col-md-3">
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      objectName="Person"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BowlingReserve.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={reserve ? [reserve.Person] : []}
                      renderMenuItemChildren={(option) => (
                        <div>
                          <h6>{option.FullNameFa}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <button
                  id="BtnReserveSend"
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
