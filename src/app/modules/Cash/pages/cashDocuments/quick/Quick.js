import { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import SVG from "react-inlinesvg";
import moment from "jalali-moment";
import { Row, Col, InputGroup } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardHeaderToolbar,
  CardBody,
  Button,
  Input,
  DatePickerField,
  SuggestionField,
  Select,
  Alerty,
} from "src/core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  EnToFaObjDate,
  numberWithCommas,
} from "src/core/_helpers";
import "./Quick.css";
import {
  Payment,
  Pos,
  CardToCard,
  Coupon,
  BetweenBanks,
  Cheque,
  PromissoryNote,
  Credit,
  Wallet,
  Debt
} from "./parts";
import {
  create,
  update,
  getById,
} from "../../../_redux/cashDocuments/cashDocumentsCrud";
import { suggestPerson } from "../../../../Core/_redux/people/peopleCrud";
import { getAll } from "../../../../General/_redux/cashs/cashsCrud";
import * as columnFormatters from "./column-formatters";
import { CashTools } from "../quick/Dependency";
import { DeleteDialog } from "./DeleteDialog";
import { MoneyColumnFormatter } from "src/core/_formatters";
import { CardLoading } from "src/core/_partials/custom/skeleton/Skeleton";

export function Quick({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const [part, setPart] = useState({ name: null, id: null });
  const [remove, setRemove] = useState(null);

  const CashDocumentEditSchema = Yup.object().shape({
    DocumentNo: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.DocumentNo") })
    ),
    CashId: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Cash") })
    ),
    DocumentDateObj: Yup.object().required(
      t("err.IsRequired", { 0: t("CashDocument.DocumentDate") })
    ),
    PersonId: Yup.array().nullable().min(1,
      t("err.IsRequired", { 0: t("CashDocument.Person") })
    ),
    Added: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Added") })
    ),
    Deficit: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Deficit") })
    ),
  });
  const [payable, setPayable] = useState(null);
  const [receivable, setReceivable] = useState(null);
  const [cashStatus, setCashStatus] = useState({ Reciept: 0, Payment: 0 });
  const [extra, setExtra] = useState({ Added: 0, Deficit: 0 });

  const [cashDocument, setCashDocument] = useState({...CashTools.Model});
  const [transactions, setTransactions] = useState({ ...CashTools.Model });

  useEffect(() => {
    const reciept =
      (!!transactions.Transactions.filter((x) => x.TransactionTypeId == 1)
        .length
        ? transactions.Transactions.filter((x) => x.TransactionTypeId == 1)
            .map((x) => x.Price)
            .reduce((a, b) => a + b)
        : 0) + +extra.Added;
    const payment =
      (!!transactions.Transactions.filter((x) => x.TransactionTypeId == 2)
        .length
        ? transactions.Transactions.filter((x) => x.TransactionTypeId == 2)
            .map((x) => x.Price)
            .reduce((a, b) => a + b)
        : 0) + +extra.Deficit;

    setCashStatus({ Reciept: reciept, Payment: payment });
  }, [transactions, extra]);

  useEffect(() => {
    getById(id).then(({ data }) => {
      setCashDocument({
        ...data,
        DocumentDateObj: EnToFaObjDate(data.DocumentDate),
        Transactions: [],
      });

      let rec = data.DocumentRequests.filter(
        (x) => x.Request.TransactionTypeId == 1
      );
      let totalRec = rec
        .map((x) =>
          x.Request.RequestDtls.map((d) => d.Price).reduce((a, b) => a + b)
        )
        .reduce((a, b) => a + b);

      let pay = data.DocumentRequests.filter(
        (x) => x.Request.TransactionTypeId == 2
      );
      let totalPay = rec
        .map((x) =>
          x.Request.RequestDtls.map((d) => d.Price).reduce((a, b) => a + b)
        )
        .reduce((a, b) => a + b);

      setReceivable(totalRec);
      setPayable(totalPay);
    });
  }, [id]);

  const columns = [
    {
      dataField: "DisplayType",
      text: t("CashDocument.Type"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("CashDocument.Price"),
      formatter: MoneyColumnFormatter,
      sort: false,
    },
    {
      dataField: "Code",
      text: t("CashDocument.Code"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        edit: setPart,
        remove: setRemove,
        t: t,
      },
      classes: "text-right pr-1",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const [cashs, setCashs] = useState([]);
  useEffect(() => {
    if (cashs.length == 0)
      getAll().then(({ data }) =>
        setCashs((cashs) => [
          { CashId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [cashs.length]);

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const btnRef = useRef();
  const saveLineClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  function saveCashDocument(params) {
    !!id == false &&
      create(params).then((x) => {
        backToList();
      });

    !!id &&
      update(id, params).then((x) => {
        backToList();
      });
  }

  const backToList = () => {
    history.push(`/cash/cashDocuments`);
  };

  const rowClasses = (row, rowIndex) => {
    return "row-status row-status-" + row["TransactionTypeId"];
  };
  
  return (
    <>
      {(!!id && cashDocument.CashDocumentId == id) || !!id == false ? (
        <Card>
          <DeleteDialog
            show={!!remove}
            onHide={() => setRemove(null)}
            deleteObj={remove}
            transactions={transactions}
            setTransactions={setTransactions}
          />
          <CardHeader>
            <CardHeaderTitle className="w-50">
              <div className="d-flex mt-1">
                <InputGroup
                  className="mt-3 w-50"
                  style={{ border: "1px solid red", borderRadius: ".42rem" }}
                >
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      id="basic-addon1"
                      style={{
                        color: "red",
                        backgroundColor: "#ffbad1",
                        textShadow: " 0 0 black",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="fa fa-arrow-up text-danger mr-2"></i> پرداخت
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <label
                    className="form-control"
                    style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {numberWithCommas(cashStatus.Payment)} ریال
                  </label>
                </InputGroup>
                <InputGroup
                  className="mt-3 w-50 ml-3"
                  style={{ border: "1px solid green", borderRadius: ".42rem" }}
                >
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      id="basic-addon1"
                      style={{
                        color: "green",
                        backgroundColor: "rgb(168 255 172)",
                        textShadow: " 0 0 black",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="fa fa-arrow-down text-success mr-2"></i>{" "}
                      دریافت
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <label
                    className="form-control"
                    style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {numberWithCommas(cashStatus.Reciept)} ریال
                  </label>
                </InputGroup>
              </div>
            </CardHeaderTitle>
            <CardHeaderToolbar>
              <Button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveLineClick}
                disabled={!!receivable && (receivable - cashStatus.Reciept !== 0)}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </Button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody className="pt-2">
            {!!receivable && (receivable - cashStatus.Reciept !== 0) && (
              <Alerty variant="danger" title={t("Common.Pay")} description={t("err.RecieveDeferenceByRequest")} className="" dismis={false}/>
            )}
            {receivable != null && (
              <Row className="pb-3">
                <InputGroup
                  className="mt-3 w-50 ml-3"
                  style={{ border: "1px solid green", borderRadius: ".42rem" }}
                >
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      id="basic-addon1"
                      style={{
                        color: "green",
                        backgroundColor: "rgb(168 255 172)",
                        textShadow: " 0 0 black",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="fa fa-arrow-down text-success mr-2"></i>{" "}
                      مبلغ قابل دریافت
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <label
                    className="form-control"
                    style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {numberWithCommas(receivable)} ریال
                  </label>
                </InputGroup>
              </Row>
            )}
            <Row>
              <Col>
                <>
                  <Formik
                    enableReinitialize={true}
                    initialValues={cashDocument}
                    validationSchema={CashDocumentEditSchema}
                    onSubmit={(values) => {
                      console.log("values < ", values);
                      console.log("CashTools.Clean(values, transactions) < ", CashTools.Clean(values, transactions));
                      saveCashDocument(CashTools.Clean(values, transactions));
                    }}
                  >
                    {({ handleSubmit, setFieldValue, values }) => (
                      <>
                        <Form className="form form-label-right">
                          <Row>
                            <Col md={2}>
                              <Field
                                name="DocumentNo"
                                type="number"
                                component={Input}
                                isLtr={true}
                                customFeedbackLabel=""
                                label={t("CashDocument.DocumentNo")}
                              />
                            </Col>
                            <Col>
                              <Select
                                name="CashId"
                                label={t("CashDocument.Cash")}
                                customFeedbackLabel=""
                                onChange={(val) => {
                                  setFieldValue("CashId", val.target.value);
                                }}
                              >
                                {cashs.map((cash) => (
                                  <option key={cash.CashId} value={cash.CashId}>
                                    {cash.Title}
                                  </option>
                                ))}
                              </Select>
                            </Col>
                            <Col>
                              <DatePickerField
                                name="DocumentDateObj"
                                customFeedbackLabel=""
                                label={t("CashDocument.DocumentDate")}
                                value={cashDocument.DocumentDateObj}
                              />
                            </Col>
                            <Col>
                              <SuggestionField
                                name="PersonId"
                                labelKey="FullNameFa"
                                customFeedbackLabel=""
                                label={t("CashDocument.Person")}
                                placeholder={t("msg.SelectBySuggestion")}
                                handleSearch={handleSuggestionPerson}
                                defaultValue={
                                  cashDocument && cashDocument.Person
                                    ? [cashDocument.Person]
                                    : []
                                }
                                renderMenuItemChildren={(option, props) => (
                                  <div>
                                    <h6>{option.FullNameFa}</h6>
                                    {/* <div>
                                  {t("CompanyType.Entity")}:{" "}
                                  {option.CompanyType.Title}
                                </div>
                                <div>
                                  {t("Company.OwnerName")}: {option.OwnerName}
                                </div> */}
                                  </div>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <Field
                                name="ContractNumber"
                                component={Input}
                                isLtr={true}
                                customFeedbackLabel=""
                                label={t("CashDocument.ContractNumber")}
                              />
                            </Col>
                            <Col>
                              <Field
                                name="Added"
                                type="number"
                                component={Input}
                                isLtr={true}
                                onChange={(val) => {
                                  setFieldValue("Added", val.target.value);
                                  setExtra({
                                    ...extra,
                                    Added: val.target.value,
                                  });
                                }}
                                customFeedbackLabel=""
                                label={t("CashDocument.Added")}
                              />
                            </Col>
                            <Col>
                              <Field
                                name="Deficit"
                                type="number"
                                component={Input}
                                isLtr={true}
                                onChange={(val) => {
                                  setFieldValue("Deficit", val.target.value);
                                  setExtra({
                                    ...extra,
                                    Deficit: val.target.value,
                                  });
                                }}
                                customFeedbackLabel=""
                                label={t("CashDocument.Deficit")}
                              />
                            </Col>
                            <Col lg={6}>
                              <Field
                                name="Description"
                                component={Input}
                                customFeedbackLabel=""
                                label={t("CashDocument.Description")}
                              />
                            </Col>
                          </Row>
                          <button
                            id="BtnReserveSend"
                            type="submit"
                            style={{ display: "none" }}
                            ref={btnRef}
                            onSubmit={() => handleSubmit()}
                          ></button>
                        </Form>
                      </>
                    )}
                  </Formik>
                </>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5 col-auto">
                {part.name === null && (
                  <>
                    <div>
                      <div
                        className="flex-1 btn cash-box mr-2"
                        onClick={() => setPart({ name: "payment", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/cash.svg"} />
                        </div>
                        {t("CashDocument.Money")}
                      </div>
                      <div
                        className="flex-1 btn cash-box m-2"
                        onClick={() => setPart({ name: "pos", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/pos.svg"} />
                        </div>
                        {t("CashDocument.Pos")}
                      </div>
                      <div
                        className="flex-1 btn cash-box ml-2"
                        onClick={() =>
                          setPart({ name: "cardToCard", id: null })
                        }
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/cards.svg"} />
                        </div>
                        {t("CashDocument.CardToCard")}
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex-1 btn cash-box mr-2"
                        onClick={() => setPart({ name: "coupon", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/coupon.svg"} />
                        </div>
                        {t("CashDocument.Coupon")}
                      </div>
                      <div
                        className="flex-1 btn cash-box m-2"
                        onClick={() => setPart({ name: "credit", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/credit.svg"} />
                        </div>
                        {t("CashDocument.Credit")}
                      </div>
                      <div
                        className="flex-1 btn cash-box ml-2"
                        onClick={() => setPart({ name: "wallet", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/wallet.svg"} />
                        </div>
                        {t("CashDocument.Wallet")}
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex-1 btn cash-box mr-2"
                        onClick={() =>
                          setPart({ name: "betweenBanks", id: null })
                        }
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG
                            src={"/media/svg/icons/cash/betwwen-banks.svg"}
                          />
                        </div>
                        {t("CashDocument.BetweenBanks")}
                      </div>
                      <div
                        className="flex-1 btn cash-box m-2"
                        onClick={() => setPart({ name: "cheque", id: null })}
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG src={"/media/svg/icons/cash/cheque.svg"} />
                        </div>
                        {t("CashDocument.Cheque")}
                      </div>
                      <div
                        className="flex-1 btn cash-box ml-2"
                        onClick={() =>
                          setPart({ name: "promissoryNote", id: null })
                        }
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG
                            src={"/media/svg/icons/cash/promissory-note.svg"}
                          />
                        </div>
                        {t("CashDocument.PromissoryNote")}
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex-1 btn cash-box mt-2"
                        style={{width: "100%"}}
                        onClick={() =>
                          setPart({ name: "debt", id: null })
                        }
                      >
                        <div className="svg-icon svg-icon-md-5x svg-icon-primary m-0 mt-2 mb-3">
                          <SVG
                            src={"/media/svg/icons/cash/ledger.svg"}
                          />
                        </div>
                        {t("CashDocument.Debt")}
                      </div>
                    </div>
                  </>
                )}
                {part.name == "payment" && (
                  <Payment
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Payment>
                )}
                {part.name == "coupon" && (
                  <Coupon
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Coupon>
                )}
                {part.name == "pos" && (
                  <Pos
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Pos>
                )}
                {part.name == "cardToCard" && (
                  <CardToCard
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></CardToCard>
                )}
                {part.name == "betweenBanks" && (
                  <BetweenBanks
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></BetweenBanks>
                )}
                {part.name == "cheque" && (
                  <Cheque
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Cheque>
                )}
                {part.name == "promissoryNote" && (
                  <PromissoryNote
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></PromissoryNote>
                )}
                {part.name == "credit" && (
                  <Credit
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Credit>
                )}
                {part.name == "wallet" && (
                  <Wallet
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Wallet>
                )}
                {part.name == "debt" && (
                  <Debt
                    data={transactions}
                    setData={setTransactions}
                    receivable={(receivable || 0) - cashStatus.Reciept}
                    goBack={() => setPart({ name: null, id: null })}
                  ></Debt>
                )}
              </Col>
              <Col className="col-lg col-md-12">
                <BootstrapTable
                  wrapperClasses="table-responsive"
                  classes="table table-bordered table-head-custom table-vertical-center"
                  bootstrap4
                  bordered={false}
                  remote
                  keyField="TranId"
                  rowClasses={rowClasses}
                  data={transactions.Transactions}
                  columns={columns}
                >
                  <PleaseWaitMessage entities={transactions.Transactions} />
                  <NoRecordsFoundMessage entities={transactions.Transactions} />
                </BootstrapTable>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <CardLoading type="reciept" />
      )}
    </>
  );
}
