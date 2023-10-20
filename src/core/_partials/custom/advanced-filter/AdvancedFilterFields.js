import React from "react";
import { useTranslation } from "react-i18next";
import { InputGroup } from "react-bootstrap";
import { Field } from "formik";
import { Input, Select } from "../../controls";

export function AdvancedFilterField({ field }) {
  const { t } = useTranslation();
  const operand = {
    "number": ['GreaterOrEqual', 'Greater', 'LessOrEqual', 'Less', 'Equal', 'NotEqual'],
    "Date": ['GreaterOrEqual', 'Greater', 'LessOrEqual', 'Less', 'Equal', 'NotEqual'],
    "DateTime": ['GreaterOrEqual', 'Greater', 'LessOrEqual', 'Less', 'Equal', 'NotEqual'],
    "Time": ['GreaterOrEqual', 'Greater', 'LessOrEqual', 'Less', 'Equal', 'NotEqual'],
    "string": ['Equal', 'NotEqual', 'Contains', 'NotContains', 'StartsWith', 'EndsWith'],
  };

  const operations = [
    {
      operation:'GreaterOrEqual',
      value: 1,
      display: t("Common.GreaterOrEqual"),
      order: 1
    },
    {
      operation:'Greater',
      value: 2,
      display: t("Common.Greater"),
      order: 1
    },
    {
      operation:'LessOrEqual',
      value: 3,
      display: t("Common.LessOrEqual"),
      order: 1
    },
    {
      operation:'Less',
      value: 4,
      display: t("Common.Less"),
      order: 1
    },
    {
      operation:'Equal',
      value: 5,
      display: t("Common.Equal"),
      order: 1
    },
    {
      operation:'NotEqual',
      value: 6,
      display: t("Common.NotEqual"),
      order: 1
    },
    {
      operation:'Contains',
      value: 7,
      display: t("Common.Contains"),
      order: 1
    },
    {
      operation:'NotContains',
      value: 8,
      display: t("Common.NotContains"),
      order: 1
    },
    {
      operation:'StartsWith',
      value: 9,
      display: t("Common.StartsWith"),
      order: 1
    },
    {
      operation:'EndsWith',
      value: 1,
      display: t("Common.EndsWith"),
      order: 1
    },
  ];

  return(
    <InputGroup
    className="mb-3"
    style={{ width: "100%" }}
  >
    <InputGroup.Prepend
      style={{ width: "30%", overFlow: "hidden" }}
    >
      <InputGroup.Text
        style={{ width: "100%" }}
        id="inputGroup-sizing-default"
      >
        {t(field.display)}
      </InputGroup.Text>
    </InputGroup.Prepend>
    <Field
      name={field.name}
      component={Input}
      type="text"
      customFeedbackLabel=""
      label={""}
      style={{ width: "50%" }}
    />
    <Select
      name={field.name + "_op"}
      label={""}
      customFeedbackLabel=""
      style={{ width: "20%" }}
    >
      {operations.filter(x=> {
        return operand[field.type].filter(o => x.operation === o).length > 0
      }
      ).map(op => (
        <option value={op.value} key={op.value}>{op.display}</option>
      ))}
    </Select>
  </InputGroup>
  );
}
