import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../../core/_partials/controls";
import { getAllPackageTypes } from "../../../../_redux/packageTypes/packageTypesCrud";
import { getAllWarehouses } from "../../../../../General/_redux/warehouses/warehousesCrud";

export function ProductWarehouseEditForm({
  saveProductWarehouse,
  productWarehouse,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const ProductWarehouseEditSchema = Yup.object().shape({
    WarehouseId: Yup.string().required(
      t("err.IsRequired", { 0: t("ProductWarehouse.Warehouse") })
    ),
    PackageTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("ProductWarehouse.PackageType") })
    ),
    OrderPoint: Yup.string().required(
      t("err.IsRequired", { 0: t("ProductWarehouse.OrderPoint") })
    ),
  });

  const [packageTypes, setPackageTypes] = useState([]);
  useEffect(() => {
    getAllPackageTypes().then(({ data }) => {
      setPackageTypes((packageTypes) => [
        { PackageTypeId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    getAllWarehouses().then(({ data }) => {
      setWarehouses((warehouses) => [
        { WarehouseId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  function cleanProductWarehouse(dirtyData) {
    return {
      ProductWarehouseId: +dirtyData.ProductWarehouseId,
      ProductId: +dirtyData.ProductId,
      Product: dirtyData.Product,
      WarehouseId: +dirtyData.WarehouseId,
      Warehouse: warehouses.filter(x=> x.WarehouseId == dirtyData.WarehouseId)[0],
      PackageTypeId: +dirtyData.PackageTypeId,
      PackageType: packageTypes.filter(x=> x.PackageTypeId == dirtyData.PackageTypeId)[0],
      OrderPoint: +dirtyData.OrderPoint,
      MinStock: +dirtyData.MinStock,
      MaxStock: +dirtyData.MaxStock,
      Location: dirtyData.Location,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonProductWarehouse"
        enableReinitialize={true}
        initialValues={productWarehouse}
        validationSchema={ProductWarehouseEditSchema}
        onSubmit={(values) => {
          saveProductWarehouse(cleanProductWarehouse(values));
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
                  <div className="col-lg-6">
                    <Select
                      name="PackageTypeId"
                      label={t("ProductWarehouse.PackageType")}
                    >
                      {packageTypes.map((packageType) => (
                        <option
                          key={packageType.PackageTypeId}
                          value={packageType.PackageTypeId}
                        >
                          {packageType.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Select
                      name="WarehouseId"
                      label={t("ProductWarehouse.PackageType")}
                    >
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.WarehouseId}
                          value={warehouse.WarehouseId}
                        >
                          {warehouse.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="OrderPoint"
                      component={Input}
                      label={t("ProductWarehouse.OrderPoint")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="MinStock"
                      component={Input}
                      label={t("ProductWarehouse.MinStock")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="MaxStock"
                      component={Input}
                      label={t("ProductWarehouse.MaxStock")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Field
                      name="Location"
                      component={Input}
                      label={t("ProductWarehouse.Location")}
                    />
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
