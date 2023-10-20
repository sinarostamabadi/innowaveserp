import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantMenuItems/RestaurantMenuItemsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantMenuItemEditForm } from "./RestaurantMenuItemEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { RestaurantMenuItemIngredientsUIProvider } from "../RestaurantMenuItem-ingredients/RestaurantMenuItemIngredientsUIContext";
import { RestaurantMenuItemIngredients } from "../RestaurantMenuItem-ingredients/RestaurantMenuItemIngredients";
import { RestaurantMenuItemPricesUIProvider } from "../RestaurantMenuItem-prices/RestaurantMenuItemPricesUIContext";
import { RestaurantMenuItemPrices } from "../RestaurantMenuItem-prices/RestaurantMenuItemPrices";

export function RestaurantMenuItemEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const defaultRestaurant = !!getStorage("defaultRestaurant")
  ? JSON.parse(getStorage("defaultRestaurant"))
  : null;

  const initModel = {
		RestaurantMenuItemId: undefined,
    RestaurantId: !!defaultRestaurant ? defaultRestaurant.RestaurantId: "",
    Restaurant: defaultRestaurant,
    RestaurantMenuGroupId: "",
    RestaurantMenuGroup: null,
    PlaceOfPreparationId: "",
    NameFa: "",
    NameEn: "",
    PrepTime: "",
    PrepTimeObj: "",
    CookTime: "",
    CookTimeObj: "",
    WaitTime: "",
    WaitTimeObj: "",
    IsAccepted: false,
    AcceptedDate: "",
    AcceptedDateObj: "",
    Barcode: "",
    RestaurantMenuItemIngredients: [],
    RestaurantMenuItemPrices: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [restaurantMenuItemObj, setRestaurantMenuItemObj] = useState(copyModel);
  const [restaurantMenuItemIngredientObj, setRestaurantMenuItemIngredientObj] = useState(
    copyModel.RestaurantMenuItemIngredients
  );
  const [restaurantMenuItemPriceObj, setRestaurantMenuItemPriceObj] = useState(copyModel.RestaurantMenuItemPrices);

  const { actionsLoading, restaurantMenuItemForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.restaurantMenuItems.actionsLoading,
      restaurantMenuItemForEdit: state.restaurantMenuItems.restaurantMenuItemForEdit,
      error: state.restaurantMenuItems.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchRestaurantMenuItem(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("RestaurantMenuItem.Entity");

    if (restaurantMenuItemForEdit && id) {
      _title = t("Common.Edit") + " " + restaurantMenuItemForEdit.NameFa;
      setRestaurantMenuItemObj({...restaurantMenuItemForEdit, RestaurantMenuGroupId: [restaurantMenuItemForEdit.RestaurantMenuGroup]});
      setRestaurantMenuItemIngredientObj(restaurantMenuItemForEdit.RestaurantMenuItemIngredients);
      setRestaurantMenuItemPriceObj(restaurantMenuItemForEdit.RestaurantMenuItemPrices);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemForEdit, id]);

  const saveRestaurantMenuItem = (values) => {
    if (!id) {
      dispatch(
        actions.createRestaurantMenuItem(values, () => {
          backToRestaurantMenuItemsList();
        })
      )
        .then((arg) => {
          backToRestaurantMenuItemsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateRestaurantMenuItem(id, values, () => {
          backToRestaurantMenuItemsList();
        })
      )
        .then(() => backToRestaurantMenuItemsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefRestaurantMenuItemIngredients = useRef("2");
  const btnRefRestaurantMenuItemPrices = useRef("3");

  const saveRestaurantMenuItemClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let restaurantMenuItemIngredientObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              restaurantMenuItemIngredientObj[prop] = obj;
            }
          }
        }

        restaurantMenuItemIngredientObj["RestaurantMenuItemIngredients"] = [];
        restaurantMenuItemIngredientObj["RestaurantMenuItemPrices"] = [];

        btnRefRestaurantMenuItemIngredients.current.Collect((restaurantMenuItemIngredientsData) => {
          restaurantMenuItemIngredientObj.RestaurantMenuItemIngredients = restaurantMenuItemIngredientsData;
        });
        btnRefRestaurantMenuItemPrices.current.Collect((restaurantMenuItemPricesData) => {
          restaurantMenuItemIngredientObj.RestaurantMenuItemPrices = restaurantMenuItemPricesData;
        });

        setTimeout(() => {
          saveRestaurantMenuItem(restaurantMenuItemIngredientObj);
        }, 200);
      });
    }
  };

  const backToRestaurantMenuItemsList = () => {
    history.push(`/restaurant/RestaurantMenuItems`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToRestaurantMenuItemsList}
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
                onClick={saveRestaurantMenuItemClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="restaurantMenuItem"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="restaurantMenuItem"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <RestaurantMenuItemEditForm
                  actionsLoading={actionsLoading}
                  restaurantMenuItem={restaurantMenuItemObj}
                  ref={btnRef}
                />
              </Tab>
              <Tab
                eventKey="warehouse"
                title={t("RestaurantMenuItemIngredient.Entity")}
                className="nav-item"
                >
                <RestaurantMenuItemIngredientsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  restaurantMenuItemIngredient={restaurantMenuItemIngredientObj}
                  ref={btnRefRestaurantMenuItemIngredients}
                  >
                  <RestaurantMenuItemIngredients />
                </RestaurantMenuItemIngredientsUIProvider>
              </Tab>
              <Tab
                eventKey="unit"
                title={t("RestaurantMenuItemPrice.Entity")}
                className="nav-item"
              >
                <RestaurantMenuItemPricesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  restaurantMenuItemPrice={restaurantMenuItemPriceObj}
                  ref={btnRefRestaurantMenuItemPrices}
                >
                  <RestaurantMenuItemPrices />
                </RestaurantMenuItemPricesUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
