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
} from "../../../../../../core/_partials/controls";
import { getAllWarehouses } from "../../../../General/_redux/warehouses/warehousesCrud";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { suggestPerson } from "../../../../Core/_redux/people/peopleCrud";
import { DefaultWarehouse } from "../../../../../../core/_partials/custom/defaults/DefaultWarehouse";

export const BowlingCompetitionEditForm = forwardRef(({ bowlingCompetition }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const BowlingCompetitionEditSchema = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("BowlingCompetition.Title") })
    )
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnBowlingCompetitionSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BowlingCompetitionId: bowlingCompetition.BowlingCompetitionId,
      Title: data.Title,
      BowlingCompetitionGroups: data.BowlingCompetitionGroups,
    };
  }

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    if (warehouses.length == 0)
      getAllWarehouses().then(({ data }) =>
        setWarehouses((warehouses) => [
          { WarehouseId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [warehouses.length]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bowlingCompetition}
        validationSchema={BowlingCompetitionEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <Row className="form-group">
                <Col md={4}>
                <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BowlingCompetition.Title")}
                  />
                </Col>
              </Row>
              <button
                id="BtnBowlingCompetitionSend"
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
});
