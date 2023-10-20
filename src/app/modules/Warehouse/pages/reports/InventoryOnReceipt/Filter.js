import React, {
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useInventoryOnReceiptContext } from "./Context";
import {
  useReactToPrint,
  CloneObject,
  getStorage
} from "src/core/_helpers";
import { Print } from "./Print";
import { DefaultWarehouse } from "src/core/_partials/custom/defaults/DefaultWarehouse";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));
  
  const context = useInventoryOnReceiptContext();
  const uiProps = useMemo(() => {
    return {
      items: context.items,
      filters: context.filters,
      setFilters: context.setFilters,
      readyToPrint: context.readyToPrint,
    };
  }, [context]);  
  
  useEffect(() => {
    if (uiProps.readyToPrint) {
      setPrintModel(uiProps.items);
      Printing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.readyToPrint]);

  const ReceiptBasedInventorySchema = Yup.object().shape({
    // WarehouseId: Yup.string()
    //   .required(t("err.IsRequired", { 0: t("Reports.WarehouseId") })).nullable(),
  });

  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;

  const initModel ={
    WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId : "",
    Warehouse: defaultWarehouse,
  }

  let copyModel = CloneObject(initModel);

  const [receiptBasedInventoryObj, setReceiptBasedInventoryObj] = useState(copyModel);
  const [printModel, setPrintModel] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 9pt;padding: 0;margin: 0;} @page { margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  const Printing = () => {
    handlePrint();
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={receiptBasedInventoryObj}
        validationSchema={ReceiptBasedInventorySchema}
        onSubmit={(values) => {
          uiProps.setFilters({
            WarehouseId: !!values.WarehouseId ? +values.WarehouseId : null,
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <DefaultWarehouse
                    name="WarehouseId"
                    defaultWarehouse={receiptBasedInventoryObj.Warehouse} />
                </div>
              </div>
              <button
                id="BtnSearchProduct"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
      <div style={{ display: "none" }}>
        <Print ref={componentRef} data={printModel} filters={uiProps.filters}/>
      </div>
    </>
  );
});
