import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import { getProductGroupById } from "../../../_redux/productGroups/productGroupsCrud";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { ProductWarehousesUIProvider } from "../product-warehouses/ProductWarehousesUIContext";
import { ProductWarehouses } from "../product-warehouses/ProductWarehouses";
import { ProductUnitsUIProvider } from "../product-units/ProductUnitsUIContext";
import { ProductUnits } from "../product-units/ProductUnits";

export function ProductEdit({
  history,
  match: {
    params: { id, groupId },
  },
}) {
  const { t } = useTranslation();
  const [group, setGroup] = useState(null);

  const initModel = {
    ProductId: undefined,
    Code: "",
    Name: "",
    Country: "",
    ProductGroupId: "",
    ProductGroup: "",
    CountryId: "",
    BrandId: "",
    BaseUnitId: "",
    ParentId: "", 
    ParentCount: "", 
    ScalesKeyNumber: "",
    HasSerial: false,
    ProductWarehouses: [],
    ProductUnits: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [productObj, setProductObj] = useState(copyModel);
  const [productWarehouseObj, setProductWarehouseObj] = useState(
    copyModel.ProductWarehouses
  );
  const [productUnitObj, setProductUnitObj] = useState(copyModel.ProductUnits);

  const { actionsLoading, productForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
      error: state.products.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchProduct(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!!groupId) 
      getProductGroupById(groupId).then((res) => {
        setGroup(res.data);
        setProductObj({...copyModel, ProductGroupId: res.data.ProductGroupId, ProductGroup: res.data});
      });
  }, [groupId, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Product.Entity");

    if (productForEdit && id) {
      _title = t("Common.Edit") + " " + productForEdit.Name;
      setProductObj({...productForEdit, ProductGroupId: !!productForEdit.ProductGroupId? [productForEdit.ProductGroup]: null});
      setProductWarehouseObj(productForEdit.ProductWarehouses);
      setProductUnitObj(productForEdit.ProductUnits);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  const saveProduct = (values) => {
    if (!id) {
      dispatch(
        actions.createProduct(values, () => {
          backToProductsList();
        })
      )
        .then((arg) => {
          backToProductsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateProduct(id, values, () => {
          backToProductsList();
        })
      )
        .then(() => backToProductsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefProductWarehouses = useRef("2");
  const btnRefProductUnits = useRef("3");

  const saveProductClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let productWarehouseObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              productWarehouseObj[prop] = obj;
            }
          }
        }

        productWarehouseObj["ProductWarehouses"] = [];
        productWarehouseObj["ProductUnits"] = [];

        btnRefProductWarehouses.current.Collect((productWarehousesData) => {
          productWarehouseObj.ProductWarehouses = productWarehousesData;
        });
        btnRefProductUnits.current.Collect((productUnitsData) => {
          productWarehouseObj.ProductUnits = productUnitsData;
        });

        setTimeout(() => {
          saveProduct(productWarehouseObj);
        }, 200);
      });
    }
  };

  const backToProductsList = () => {
    if(!!groupId)
      history.push(`/warehouse/products/group/${groupId}`);
    else
      history.push(`/warehouse/products`);
  };
  
  return (
    <>
      {((!!id && editMode) || (!!id == false && !!groupId == false) || (!!groupId && group != null)) && (
        <Card>
          {actionsLoading && <ModalProgressBar />}
          {!actionsLoading && error != null && (
            <>
              <ModalProgressBar variant="danger" />
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={error}
              ></Alerty>
            </>
          )}
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToProductsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveProductClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="product"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="product"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <ProductEditForm
                  actionsLoading={actionsLoading}
                  product={productObj}
                  ref={btnRef}
                  group={group}
                />
              </Tab>
              <Tab
                eventKey="warehouse"
                title={t("ProductWarehouse.Entity")}
                className="nav-item"
              >
                <ProductWarehousesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  productWarehouse={productWarehouseObj}
                  ref={btnRefProductWarehouses}
                >
                  <ProductWarehouses />
                </ProductWarehousesUIProvider>
              </Tab>
              <Tab
                eventKey="unit"
                title={t("ProductUnit.Entity")}
                className="nav-item"
              >
                <ProductUnitsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  productUnit={productUnitObj}
                  ref={btnRefProductUnits}
                >
                  <ProductUnits />
                </ProductUnitsUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
