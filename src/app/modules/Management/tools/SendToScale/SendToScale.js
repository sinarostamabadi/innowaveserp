import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filter";
import { Table } from "./Table";
import { SendToScaleProvider, SendToScaleConsumer } from "./Context";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { getAllScales } from "../../../General/_redux/scales/scalesCrud";

export function SendToScale({ history }) {
  const { t } = useTranslation();
  const [scale, setScale] = useState();
  const [scales, setScales] = useState([]);

  const events = {
    gotoSellPricing: (id) => {
      history.push(`/Sell/sellPricings/new`);
    },
  };

  useEffect(() => {
    if (scales.length == 0) {
      getAllScales().then(({ data }) => {
        setScales((scales) => [...data.Items])
        setScale(data.Items[0].ScaleId);
      });
    }
  }, [scales.length, t]);

  const btnSearchRef = createRef("1");
  const searchClick = () => {
    if (btnSearchRef && btnSearchRef.current) {
      btnSearchRef.current.Search();
    }
  };

  const sendToScale = (scaleId) => {
    axios.get(`http://185.158.175.89:6070/api/Management/sendToScale/${scaleId}`);
  };

  return (
    <SendToScaleProvider events={events}>
      <Card>
        <CardHeader
          title={t("Common.Tools") + " " + t("Tools.SendToScale.Tool")}
        >
          <CardHeaderToolbar>
            <>
              <div class="form-row align-items-center mr-3">
                <div class="col-auto my-1">
                  <label class="sr-only" for="inscaleFormInputName">
                    ترازو
                  </label>
                  <select
                    name="ScaleId"
                    className="form-control"
                    label={t("BowlingReserve.Scale")}
                    onChange={(val) => setScale(val.target.value)}
                    value={scale}
                  >
                    {scales.map((scale) => (
                      <option key={scale.ScaleId} value={scale.ScaleId}>
                        {scale.Title}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-auto my-1">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => sendToScale(scale)}
                  >
                    <i class="fas fa-cash-register"></i> {t("Scale.SendToScale")}
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={searchClick}
              >
                <i class="fas fa-search"></i> {t("Common.Search")}
              </button>
            </>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Filter ref={btnSearchRef} />
          <Table />
        </CardBody>
      </Card>
    </SendToScaleProvider>
  );
}
