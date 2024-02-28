import React, { useState, useEffect, useCallback, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal, Accordion, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useDetailsUIContext } from "../DetailsUIContext";
import { suggestAccount } from "../../../../_redux/accounts/accountsCrud";
import { suggestAccountFloating } from "../../../../_redux/accountFloating/accountFloatingCrud";
import { getAllCostCenters } from "../../../../_redux/costCenters/costCentersCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";
import {
  FaObjToEnDateTime,
  numberFaToEn,
} from "../../../../../../../core/_helpers";
import "./DetailEditForm.css";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const [resetingForm, setResetingForm] = useState(false);
  const DetailEditSchema = Yup.object().shape({
    AccountId: Yup.array()
      .nullable()
      .min(1, t("err.IsRequired", { 0: t("DocumentDtl.Account") })),
  });

  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedId: detailsUIContext.selectedId,
      initDetail: detailsUIContext.initDetail,
      findDetail: detailsUIContext.findDetail,
      addDetail: detailsUIContext.addDetail,
      updateDetail: detailsUIContext.updateDetail,
    };
  }, [detailsUIContext]);

  const [editDetail, setEditDetail] = useState(detailsUIProps.initDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!!detailsUIProps.id)
      setEditDetail(detailsUIProps.findDetail(detailsUIProps.id));
  }, [detailsUIProps.id, dispatch]);

  const handleSuggestionAccount = useCallback((query, fnCallback) => {
    suggestAccount(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionAccountFloating = useCallback((query, fnCallback) => {
    suggestAccountFloating(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [accountSelected, setAccountSelected] = useState(null);
  const [costCenters, setCostCenters] = useState([]);
  useEffect(() => {
    getAllCostCenters().then(({ data }) => {
      setCostCenters((costCenters) => [
        { CostCenterId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, [costCenters.length]);

  useEffect(() => {
    if (!!detailsUIProps.selectedId && !!detail.DocumentDtlId) {
      setAccountSelected(detail.Account);
    }
  }, [detail]);

  function cleanDetail(dirtyData) {
    return {
      DocumentDtlId: !!dirtyData.DocumentDtlId
        ? +dirtyData.DocumentDtlId
        : null,
      DocumentId: !!detailsUIProps.initDetail.DocumentId
        ? +detailsUIProps.initDetail.DocumentId
        : null,
      AccountId:
        !!dirtyData.AccountId && dirtyData.AccountId.length == 1
          ? +dirtyData.AccountId[0].AccountId
          : !!dirtyData.AccountId
          ? dirtyData.AccountId
          : null,
      AccountFloatingId:
        !!dirtyData.AccountFloatingId && dirtyData.AccountFloatingId.length == 1
          ? +dirtyData.AccountFloatingId[0].AccountFloatingId
          : !!dirtyData.AccountFloatingId
          ? dirtyData.AccountFloatingId
          : null,
      AccountFloatingId2:
        !!dirtyData.AccountFloatingId2 &&
        dirtyData.AccountFloatingId2.length == 1
          ? +dirtyData.AccountFloatingId2[0].AccountFloatingId
          : !!dirtyData.AccountFloatingId2
          ? dirtyData.AccountFloatingId2
          : null,
      AccountFloatingId3:
        !!dirtyData.AccountFloatingId3 &&
        dirtyData.AccountFloatingId3.length == 1
          ? +dirtyData.AccountFloatingId3[0].AccountFloatingId
          : !!dirtyData.AccountFloatingId3
          ? dirtyData.AccountFloatingId3
          : null,
      CostCenterId: +dirtyData.ProductUnitId,
      No: +dirtyData.No,
      Bed: +dirtyData.Bed,
      Bes: +dirtyData.Bes,
      CurrencyRate: null,
      CurrencyId: null,
      CurrencyBed: null,
      CurrencyBes: null,
      Des: dirtyData.Des,
      ReferenceNo: null,
      ReferenceDes: null,
      SysReference: null,
      SysReferenceKey: null,
      SysReferenceId_1_TableName: null,
      SysReferenceId_1: null,
      SysReferenceId_2_TableName: null,
      SysReferenceId_2: null,
      ReferenceDate: null,
      MatchRefrence: null,
      ContractNumber: null,
      Atf1: null,
      Atf2: null,
      Atf3: null,
      Atf4: null,
      IsDeleted: false,
    };
  }
  function resetFormHard() {
    setResetingForm(true);
    setTimeout(() => {
      setResetingForm(false);
    }, 100);
  }
  return (
    <>
      {!resetingForm && (
        <Formik
          key="RealPersonDetail"
          enableReinitialize={true}
          initialValues={editDetail}
          validationSchema={DetailEditSchema}
          onSubmit={(
            values,
            { setSubmitting, setErrors, setStatus, resetForm }
          ) => {
            detailsUIProps.addDetail(cleanDetail(values));
            resetForm();
            resetFormHard();
          }}
        >
          {({ handleSubmit, resetForm }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <SuggestionField
                      name="AccountId"
                      labelKey="FullTitle"
                      customFeedbackLabel=""
                      label={t("DocumentDtl.Account")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionAccount}
                      handleOnChange={(val, obj) => {
                        setAccountSelected(obj);
                      }}
                      defaultValue={
                        detail && !!detail.Account ? [detail.Account] : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.FullTitle}</h6>
                          <span>کدکامل: {option.FullCode}</span>
                        </div>
                      )}
                    />
                  </div>
                  {accountSelected != null &&
                    accountSelected.HasAccountFloating && (
                      <div className="col-lg-4">
                        <SuggestionField
                          name="AccountFloatingId"
                          labelKey="Title"
                          customFeedbackLabel=""
                          label={t("DocumentDtl.AccountFloating")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionAccountFloating}
                          defaultValue={
                            detail && !!detail.AccountFloating
                              ? [detail.AccountFloating]
                              : []
                          }
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Title}</h6>
                              <span>کدکامل: {option.Code}</span>
                            </div>
                          )}
                        />
                      </div>
                    )}
                  <div className="col-lg-4">
                    <Field
                      name="Bed"
                      type="number"
                      component={Input}
                      label={t("DocumentDtl.Bed")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Bes"
                      type="number"
                      component={Input}
                      label={t("DocumentDtl.Bes")}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name="Des"
                      type="text"
                      component={Input}
                      label={t("DocumentDtl.Des")}
                    />
                  </div>
                </div>
                <Accordion className="detail-according" defaultActiveKey="0">
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <i className="fa fa-chevron-circle-down"></i>
                  </Accordion.Toggle>
                  <Accordion.Collapse className="hide" eventKey="1">
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <Select
                          name="CostCenterId"
                          label={t("DocumentDtl.CostCenter")}
                        >
                          {costCenters.map((costCenter) => (
                            <option
                              key={costCenter.CostCenterId}
                              value={costCenter.CostCenterId}
                            >
                              {!!costCenter ? costCenter.Title : ""}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="col-lg-6">
                        <Field
                          name="Atf1"
                          component={Input}
                          label={t("DocumentDtl.Atf1")}
                        />
                      </div>
                      {accountSelected != null &&
                        accountSelected.HasAccountFloating && (
                          <>
                            <div className="col-lg-6">
                              <SuggestionField
                                name="AccountFloatingId2"
                                fieldKey="AccountFloatingId"
                                labelKey="Title"
                                customFeedbackLabel=""
                                label={t("DocumentDtl.AccountFloating2")}
                                placeHolder={t("msg.SelectBySuggestion")}
                                handleSearch={handleSuggestionAccountFloating}
                                defaultValue={
                                  detail && !!detail.AccountFloating2
                                    ? [detail.AccountFloating2]
                                    : []
                                }
                                renderMenuItemChildren={(option, props) => (
                                  <div>
                                    <h6>{option.Title}</h6>
                                    <span>کدکامل: {option.Code}</span>
                                  </div>
                                )}
                              />
                            </div>
                            <div className="col-lg-6">
                              <SuggestionField
                                name="AccountFloatingId3"
                                fieldKey="AccountFloatingId"
                                labelKey="Title"
                                customFeedbackLabel=""
                                label={t("DocumentDtl.AccountFloating3")}
                                placeHolder={t("msg.SelectBySuggestion")}
                                handleSearch={handleSuggestionAccountFloating}
                                defaultValue={
                                  detail && !!detail.AccountFloating3
                                    ? [detail.AccountFloating3]
                                    : []
                                }
                                renderMenuItemChildren={(option, props) => (
                                  <div>
                                    <h6>{option.Title}</h6>
                                    <span>کدکامل: {option.Code}</span>
                                  </div>
                                )}
                              />
                            </div>
                          </>
                        )}
                    </div>
                  </Accordion.Collapse>
                </Accordion>
                <button
                  type="button"
                  onClick={() => resetFormHard()}
                  className="btn btn-light btn-elevate"
                >
                  {t("Common.Cancel")}
                </button>
                <> </>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  {t("Common.Save")}
                </button>
              </Form>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
