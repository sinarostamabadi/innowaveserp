/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/documents/documentsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { DocumentEditForm } from "./DocumentEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import {
  CloneObject,
  getStorage,
  EnToFaObjDate,
} from "../../../../../../core/_helpers";
// import { useReactToPrint } from "react-to-print";
import { useReactToPrint } from "src/core/_helpers/Print";
import { useTranslation } from "react-i18next";
import moment from "jalali-moment";
import { DetailsUIProvider } from "../documents-details/DetailsUIContext";
import { Details } from "../documents-details/Details";
import { PrintReport } from "../print/Print";
import axios from "axios";

export function DocumentEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    shallowEqual
  );
  const initModel = {
    DocumentId: undefined,
    DocumentTypeId: 1, // Accounting Document
    DocumentType: { Title: "سند حسابداری" }, // Accounting Document
    DocumentDateObj: EnToFaObjDate(new Date()),
    DocumentDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    DocumentNo: 0,
    YearId: EnToFaObjDate(new Date()).year,
    RefNo: null,
    DocumentDes: null,
    PrintCount: 0,
    IsDeleted: false,
    Cancel: false,
    Control: false,
    Archive: false,
    Empty: false,
    AtfNo: null,
    DailyNumber: null,
    SysReference: null,
    LockedBy: null,
    IsDraft: true,
    CreatedBy: 0,
    Creator: { UserName: auth.user.UserName },
    DocumentDtls: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [printModel, setPrintModel] = useState(null);
  const [documentObj, setDocumentObj] = useState(copyModel);
  const [documentDtlObj, setDocumentDtlObj] = useState(copyModel.DocumentDtls);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, documentForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.documents.actionsLoading,
      documentForEdit: state.documents.documentForEdit,
      error: state.documents.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) dispatch(actions.fetchDocument(id));
    else {
      //delete copyModel.DocumentDateObj;

      dispatch(
        actions.createDocument(copyModel, (document) => {
          setDocumentObj({
            ...document,
            DocumentDateObj: EnToFaObjDate(document.DocumentDate),
          });
          setDocumentDtlObj(document.DocumentDtls);
        })
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Document.Entity");

    if (id && documentForEdit && documentForEdit.DocumentId == id) {
      _title = t("Common.Edit") + " " + documentForEdit.DocumentNo;
      setDocumentObj({
        ...documentForEdit,
        DocumentDateObj: EnToFaObjDate(documentForEdit.DocumentDate),
      });
      setDocumentDtlObj(documentForEdit.DocumentDtls);
      setPrintModel(documentForEdit);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentForEdit, id]);

  const saveDocument = (values) => {
    if (!id && !documentObj.DocumentId) {
      dispatch(actions.createDocument(values))
        .then((arg) => {
          backToDocumentsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateDocument(id || documentObj.DocumentId, values))
        .then(() => backToDocumentsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const btnRefDetails = useRef("2");

  const saveDocumentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToDocumentsList = () => {
    history.push(`/accounting/documents`);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    pageStyle:
      "@page { size: A4; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; overflow-y: hidden !important;} }",
  });

  const [generateReport, setGenerateReport] = useState(false);
  const Print = () => {
    setGenerateReport(true);
    axios
      .get(`Document/ExportAccountingPdf?id=${id}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "blob",
      })
      .then((responseBlob) => {
        const self = this;
        let reader = new FileReader();

        reader.onload = function () {
          let response = { status: true, message: "" };

          try {
            response = JSON.parse(reader.result.toString());
          } catch (e) {}

          if (response.status) {
            let blob = new Blob([responseBlob.data], {
              type: "application/pdf",
            });
            let url = window["URL"].createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `Accounting.pdf`;
            a.click();
            window["URL"].revokeObjectURL(url);
            setGenerateReport(false);
          } else {
            alert(response.message);
            setGenerateReport(false);
          }
        };
        reader.readAsText(responseBlob.data);
      })
      .catch((error) => {
        setGenerateReport(false);
      });
  };

  return (
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
            onClick={backToDocumentsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i> {t("Common.Back")}
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> {t("Common.Reset")}
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-light ml-2"
            onClick={Print}
            disabled={generateReport}
          >
            <i
              className={`fa fa-${
                generateReport ? "spinner fa-spin" : "print"
              }`}
            ></i>{" "}
            {generateReport
              ? t("Common.GeneratingReport")
              : t("Common.Download")}
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveDocumentClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* {(!id || (!!id && !!documentObj && documentObj.DocumentId == id)) && ( */}
        <>
          <div className="mt-5">
            <DocumentEditForm
              actionsLoading={actionsLoading}
              document={documentObj}
              btnRef={btnRef}
              saveDocument={saveDocument}
            />
          </div>

          <DetailsUIProvider
            currentDocumentId={id || documentObj.DocumentId}
            actionsLoading={actionsLoading}
            detail={documentDtlObj}
            ref={btnRefDetails}
          >
            <Details />
          </DetailsUIProvider>
        </>
        {/* )} */}

        {!!printModel && (
          <div style={{ display: "none", height: "auto" }}>
            <PrintReport ref={componentRef} data={printModel} />
          </div>
        )}
      </CardBody>
    </Card>
  );
}
