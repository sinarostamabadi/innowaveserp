import React from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import { useTranslation } from "react-i18next";
import { ProductProfitProvider } from "./Context";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";

export function ProductProfit({ history }) {
  const { t } = useTranslation();
  const events = {};

 
  function download() {
    window.open(process.env.REACT_APP_API_URL + 'ProductManagement/ProductBenefit');

    // axios.get("/ProductManagement/ProductBenefit", {
    //   responseType: 'blob',
    // }).then(res => {
    //   console.log("res > ", res);
    //   console.log("res.data > ", res.data);
    //   fileDownload(res.data, "ProductBenefit.xlsx");
    // });
  }

  return (
    <ProductProfitProvider events={events}>
      <Card>
        <CardHeader
          title={t("Common.Report") + " " + t("Reports.ProductProfit.Report")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={() => download()}
              className="btn btn-primary"
            >
              <i class="fas fa-download"></i> {t("Common.Download")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <p>با کلیک روی دکمه‌ی دانلود اکسل مربوطه را دریافت نمایید.</p>
        </CardBody>
      </Card>
    </ProductProfitProvider>
  );
}
