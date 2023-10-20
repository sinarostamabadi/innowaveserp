import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../../core/_partials/controls";
import { getAllUnits } from "../../../../../General/_redux/units/unitsCrud";

export function ProductUnitEditForm({
  saveProductUnit,
  productUnit,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const ProductUnitEditSchema = Yup.object().shape({
    UnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("ProductUnit.Unit") })
    )
  });

  const [units, setUnits] = useState([]);
  useEffect(() => {
    getAllUnits().then(({ data }) => {
      setUnits((units) => [
        { UnitId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  function cleanProductUnit(dirtyData) {
    return {
      ProductUnitId: +dirtyData.ProductUnitId,
      ProductId: +dirtyData.ProductId,
      Product: dirtyData.Product,
      UnitId: +dirtyData.UnitId,
      Unit: units.filter(x=> x.UnitId == dirtyData.UnitId)[0],
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonProductUnit"
        enableReinitialize={true}
        initialValues={productUnit}
        validationSchema={ProductUnitEditSchema}
        onSubmit={(values) => {
          saveProductUnit(cleanProductUnit(values));
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
                    <Select
                      name="UnitId"
                      label={t("ProductUnit.Unit")}
                    >
                      {units.map((unit) => (
                        <option
                          key={unit.UnitId}
                          value={unit.UnitId}
                        >
                          {unit.Name}
                        </option>
                      ))}
                    </Select>
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
