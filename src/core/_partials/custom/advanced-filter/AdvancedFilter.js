import React, { useMemo, useState, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { Accordion, Card } from "react-bootstrap";
import { AdvancedFilterField } from "./AdvancedFilterFields";
import { useTranslation } from "react-i18next";

const prepareFilter = (queryParams, values, extraFilter) => {
  const newQueryParams = { ...queryParams };
  const filters = [];

  for (const key in values) {
    if (values.hasOwnProperty(key) && key.indexOf("_op") === -1) {
      const element = values[key];
      if (!!element)
        filters.push({
          Property: key,
          Operation: +values[key + "_op"],
          Values: [element],
        });
    }
  }

  newQueryParams.Filters = filters;

  if (!!extraFilter && newQueryParams.Filters.length)
    newQueryParams.Filters = newQueryParams.Filters.map((x) => {
      if (x.Property === extraFilter.Property) return extraFilter;
      else return x;
    });
  else if (!!extraFilter && newQueryParams.Filters.length === 0)
    newQueryParams.Filters.push(extraFilter);

  return newQueryParams;
};

export function AdvancedFilter({ listLoading, uiActions, extraFilter }) {
 
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const [field, setField] = useState([]);

  useEffect(() => {
    let fieldsObj = {};
    let rootNode = "";

    if (!!uiActions.dataModel) {
      for (const key in uiActions.dataModel) {
        if (
          (uiActions.dataModel.hasOwnProperty(key) && typeof uiActions.dataModel[key] == 'object' &&
            uiActions.dataModel[key].type && uiActions.dataModel[key].type.indexOf("key") > -1) ||
          !Array.isArray(uiActions.dataModel[key]) &&
          !uiActions.dataModel[key].type === "ref"
        )
          rootNode = key.replace("Id", "");
      }

      for (const key in uiActions.dataModel) {
        if (uiActions.dataModel.hasOwnProperty(key) || Array.isArray(uiActions.dataModel[key])) {
          const element = uiActions.dataModel[key];

          if (
            ["title|string", "string", "number", "title|number", "key|number"].includes(
              element.type
            ) &&
            (key.indexOf("Id") === -1 || element.searchable === true)
          ) {
            fieldsObj[key] = "";
            fieldsObj[key + "_op"] = 7;

            setField((field) => [
              ...field,
              {
                name: key,
                type: element.type,
                display: rootNode + "." + element.display,
              },
            ]);
          }
        }
      }
    }
    setFields(fieldsObj);
   
  }, [uiActions.dataModel]);

  const filterUIProps = useMemo(() => {
    return {
      setQueryParams: uiActions.setQueryParams,
      queryParams: uiActions.queryParams,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      filterUIProps.queryParams,
      values,
      extraFilter
    );

    if (!isEqual(newQueryParams, filterUIProps.queryParams)) {
      newQueryParams.PageNumber = 1;
      filterUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      {!!field && field.length > 0 && (
        <Formik
          initialValues={fields}
          onSubmit={(values) => {
            applyFilter(values);
          }}
        >
          {({
            handleSubmit,
          }) => (
            <>
              <Accordion className="mb-5">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Card.Title
                      style={{ color: "grey", fontSize: "0.9rem !important" }}
                    >
                      <i className="fas fa-search"></i> {t("Common.AdvancedSearch")}
                    </Card.Title>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <form
                        onSubmit={handleSubmit}
                        className="form form-label-right"
                      >
                        <div
                          className="form-group row mb-0"
                        >
                          {!!field &&
                            field.length > 0 &&
                            field.map((model) => (
                              <div key={model.name} className="col-lg-6">
                                <AdvancedFilterField key={model.name} field={{...model, type: model.type.replace("key|", "").replace("title|", "")}}/>
                              </div>
                            ))}
                        </div>

                        <button
                          id="BtnSearch"
                          type="submit"
                          onSubmit={() => handleSubmit()}
                          className="btn btn-success my-3"
                        >
                          <i className="fas fa-search"></i> {t("Common.Search")}
                        </button>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
