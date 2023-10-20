import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscounts/sellDiscountsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { SellDiscountEditForm } from "./SellDiscountEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../sellDiscounts-details/DetailsUIContext";
import { Details } from "../sellDiscounts-details/Details";
import { ProductsUIProvider } from "../sellDiscount-products/ProductsUIContext";
import { Products } from "../sellDiscount-products/Products";
import { EnToFaObjDate, CloneObject } from "../../../../../../core/_helpers";
import moment from "jalali-moment";

export function SellDiscountEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();

  const initModel = {
    SellDiscountId: undefined,
    SellDiscountTypeId: mode,
    Title: "",
    SellDiscountNumber: "",
    PersonId: null,
    Person: "",
    PersonGroupId: null,
    PersonGroup: "",
    RegisterDateObj: EnToFaObjDate(new Date()),
    RegisterDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),
    FromDateObj: "",
    FromDate: "",
    ToDateObj: "",
    ToDate: "",
    FromTimeObj: "",
    FromTime: "",
    ToTimeObj: "",
    ToTime: "",
    HasProduct: false,
    FromYearsOld: "",
    ToYearsOld: "",
    Sex: "",
    RewardProductId: null,
    RewardProduct: "",
    RewardProductUnitId: null,
    RewardProductUnit: "",
    SellDiscountDetails: [],
    SellDiscountFactors: [],
    SellDiscountProducts: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [sellDiscountObj, setSellDiscountObj] = useState(copyModel);
  const [sellDiscountDetailObj, setSellDiscountDetailObj] = useState(
    copyModel.SellDiscountDetails
  );
  const [sellDiscountFactorsObj, setSellDiscountFactorsObj] = useState(
    copyModel.SellDiscountFactors
  );
  const [sellDiscountProductsObj, setSellDiscountProductsObj] = useState(
    copyModel.SellDiscountProducts
  );

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, sellDiscountForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.sellDiscounts.actionsLoading,
      sellDiscountForEdit: state.sellDiscounts.sellDiscountForEdit,
      error: state.sellDiscounts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSellDiscount(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SellDiscount.Entity");

    if (sellDiscountForEdit && id) {
      _title =
        t("Common.Edit") +
        " " +
        t("SellDiscount.Entity") +
        " «" +
        sellDiscountForEdit.Title +
        "»";

      setSellDiscountObj({
        ...sellDiscountForEdit,
        RegisterDateObj: !!sellDiscountForEdit.RegisterDate == false? null: EnToFaObjDate(sellDiscountForEdit.RegisterDate),
        FromDateObj: !!sellDiscountForEdit.FromDate == false? null: EnToFaObjDate(sellDiscountForEdit.FromDate),
        ToDateObj: !!sellDiscountForEdit.ToDate == false? null: EnToFaObjDate(sellDiscountForEdit.ToDate)
      });
      setSellDiscountDetailObj(sellDiscountForEdit.SellDiscountDetails);
      setSellDiscountFactorsObj(sellDiscountForEdit.SellDiscountFactors);
      setSellDiscountProductsObj(sellDiscountForEdit.SellDiscountProducts);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountForEdit, id]);

  const saveSellDiscount = (values) => {
    if (!id) {
      dispatch(
        actions.createSellDiscount(values, () => {
          backToSellDiscountsList();
        })
      )
        .then((arg) => {
          backToSellDiscountsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateSellDiscount(id, values, () => {
          backToSellDiscountsList();
        })
      )
        .then(() => backToSellDiscountsList())
        .catch((err) => {});
    }
  };

  const btnRefSellDiscount = useRef("1");
  const btnRefDetails = useRef("2");
  const btnRefFactors = useRef("3");
  const btnRefProducts = useRef("4");

  const saveSellDiscountClick = () => {
    if (btnRefSellDiscount && btnRefSellDiscount.current) {
      btnRefSellDiscount.current.Collect((datas) => {
        let sellDiscountObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              sellDiscountObj[prop] = obj;
            }
          }
        }
        sellDiscountObj["SellDiscountDetails"] = [];
        sellDiscountObj["SellDiscountProducts"] = [];

        if (!!btnRefDetails.current && !!btnRefDetails.current.Collect)
          btnRefDetails.current.Collect((detailsData) => {
            sellDiscountObj.SellDiscountDetails = detailsData;
          });

        if (!!btnRefProducts.current && !!btnRefProducts.current.Collect)
          btnRefProducts.current.Collect((productsData) => {
            sellDiscountObj.SellDiscountProducts = productsData;
          });

        saveSellDiscount(sellDiscountObj);
      });
    }
  };

  const backToSellDiscountsList = () => {
    history.push(`/Sell/sellDiscounts`);
  };

  return (
    <>
      {((!!id && !!sellDiscountObj.SellDiscountId) || !!id == false) && (
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
                onClick={backToSellDiscountsList}
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
                onClick={saveSellDiscountClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <SellDiscountEditForm
              actionsLoading={actionsLoading}
              sellDiscount={sellDiscountObj}
              ref={btnRefSellDiscount}
              mode={mode || sellDiscountObj.SellDiscountTypeId}
            />
            <div
              className="row"
              style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
            >
              {(mode != 1 || sellDiscountObj.SellDiscountTypeId != 1) && (
                <div className="col-6">
                  <ProductsUIProvider
                    currentSellDiscountId={id}
                    actionsLoading={actionsLoading}
                    product={sellDiscountProductsObj}
                    ref={btnRefProducts}
                    mode={mode || sellDiscountObj.SellDiscountTypeId}
                  >
                    <Products />
                  </ProductsUIProvider>
                </div>
              )}
              <div className="col-6">
                <DetailsUIProvider
                  currentSellDiscountId={id}
                  actionsLoading={actionsLoading}
                  detail={sellDiscountDetailObj}
                  ref={btnRefDetails}
                  mode={mode || sellDiscountObj.SellDiscountTypeId}
                >
                  <Details />
                </DetailsUIProvider>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
