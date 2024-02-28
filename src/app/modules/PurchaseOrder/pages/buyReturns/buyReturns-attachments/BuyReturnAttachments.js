/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import * as actions from "../../../_redux/buyReturns/buyReturnsActions";
import { useBuyReturnsUIContext } from "../BuyReturnsUIContext";
import { useTranslation } from "react-i18next";
import { Attachments } from "src/core/_partials/controls/attachment/Attachments";
import {
  EnToFaObjDate,
  FaObjToEnDateTime,
  ObjectToFormData,
} from "src/core/_helpers";

export function BuyReturnAttachments({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const buyReturnsUIContext = useBuyReturnsUIContext();
  const dispatch = useDispatch();
  const [buyReturnObj, setBuyReturnObj] = useState(null);
  const [entityAttachmentsObj, setEntityAttachmentsObj] = useState([]);

  const { isLoading, buyReturnForEdit } = useSelector(
    (state) => ({
      isLoading: state.buyReturns.actionsLoading,
      buyReturnForEdit: state.buyReturns.buyReturnForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      dispatch(actions.fetchBuyReturn(id));
    }
  }, [id]);

  useEffect(() => {
    setBuyReturnObj({
      ...buyReturnObj,
      EntityAttachments: entityAttachmentsObj,
    });
  }, [entityAttachmentsObj]);

  useEffect(() => {
    if (id && buyReturnForEdit && buyReturnForEdit.BuyReturnId == id) {
      setBuyReturnObj({
        ...buyReturnForEdit,
        BuyReturnDateObj: EnToFaObjDate(buyReturnForEdit.BuyReturnDate),
        FactorDateObj:
          buyReturnForEdit.FactorDate &&
          EnToFaObjDate(buyReturnForEdit.FactorDate),
      });
      setEntityAttachmentsObj(buyReturnForEdit.EntityAttachments);
    } else {
      setBuyReturnObj(null);
      setEntityAttachmentsObj([]);
    }
  }, [buyReturnForEdit, id]);

  function cleanFull(dirty) {
    let buyReturnObject = {
      BuyReturnId: dirty.BuyReturnId,
      BuyReturnNumber: 0,
      FactorNumber: dirty.FactorNumber,
      BuyReturnSettlementTypeId:
        dirty.BuyReturnSettlementTypeId && +dirty.BuyReturnSettlementTypeId,
      ProviderId:
        !!dirty.ProviderId && Array.isArray(dirty.ProviderId)
          ? +dirty.ProviderId[0].PersonId
          : dirty.ProviderId != ""
          ? dirty.ProviderId
          : null,
      InquiryId:
        !!dirty.InquiryId && Array.isArray(dirty.InquiryId)
          ? +dirty.InquiryId[0].PersonId
          : dirty.InquiryId != ""
          ? dirty.InquiryId
          : null,
      BuyReturnDate: FaObjToEnDateTime(dirty.BuyReturnDateObj),
      FactorDate: FaObjToEnDateTime(dirty.FactorDateObj),
      IsClosed: !!dirty.IsClosed,
      IsTemp: !!dirty.IsTemp,
      BuyReturnDetails: [],
      BuyReturnCosts: [],
      BuyReturnDiscounts: [],
      EntityAttachments: [],
    };

    buyReturnObject.BuyReturnDiscounts = dirty.BuyReturnDiscounts.map((d) => {
      let xx = {
        BuyReturnDiscountId:
          d.BuyReturnDiscountId.toString().indexOf("temp") > -1
            ? null
            : d.BuyReturnDiscountId,
        DiscountTypeId: d.DiscountTypeId,
        DiscountPercent: d.DiscountPercent,
        PricePercent: Math.ceil(+d.PricePercent),
        IsDeleted: d.IsDeleted,
      };

      return xx;
    });

    buyReturnObject.BuyReturnDetails = dirty.BuyReturnDetails.map((d) => {
      let xx = {
        BuyReturnDetailId:
          d.BuyReturnDetailId.toString().indexOf("temp") > -1
            ? null
            : d.BuyReturnDetailId,
        ProductId: d.ProductId,
        ProductUnitId: d.ProductUnitId,
        Amount: d.Amount && +d.Amount,
        Price: d.Price && +d.Price,
        DiscountPrice: d.DiscountPrice && +d.DiscountPrice,
        DiscountPercent: d.DiscountPercent && +d.DiscountPercent,
        CostPrice: d.CostPrice && +d.CostPrice,
        PayablePrice: d.PayablePrice && +d.PayablePrice,
        IsDeleted: d.IsDeleted,
        BuyReturnSerials: d.BuyReturnSerials.map((s) => {
          return { SerialNumber: s.SerialNumber };
        }),
        BuyReturnDetailRequestDetails: d.BuyReturnDetailRequestDetails,
      };

      return xx;
    });

    buyReturnObject.BuyReturnCosts = dirty.BuyReturnCosts.map((d) => {
      let xx = {
        BuyReturnCostId:
          d.BuyReturnCostId.toString().indexOf("temp") > -1
            ? null
            : d.BuyReturnCostId,
        CostTypeId: d.CostTypeId,
        Price: d.Price,
        CostPercent: d.CostPercent,
        Describtion: d.Describtion,
        IsDeleted: d.IsDeleted,
      };

      return xx;
    });

    buyReturnObject.EntityAttachments = dirty.EntityAttachments.map((x) => {
      return {
        EntityAttachmentId:
          x.EntityAttachmentId.toString().indexOf("temp_") > -1
            ? null
            : x.EntityAttachmentId,
        EntityId: x.EntityId,
        EntityPKId: x.EntityPKId,
        AttachmentId: x.AttachmentId,
        Title: x.Title,
        Description: x.Description,
        Reference1: x.Reference1,
        Reference2: x.Reference2,
        Reference3: x.Reference3,
        Reference4: x.Reference4,
        IsDeleted: x.IsDeleted || false,
        Attachment: x.Attachment.FormFile
          ? {
              FormFile: x.Attachment.FormFile,
            }
          : null,
      };
    });
    console.log("dirty     > ", dirty);
    console.log("buyReturnObject > ", buyReturnObject);
    return buyReturnObject;
  }

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const updateBuyReturn = () => {
    dispatch(
      actions.updateBuyReturn(
        id,
        ObjectToFormData(cleanFull(buyReturnObj)),
        () => {
          onHide(true);
        }
      )
    )
      .then(() => {
        // refresh list after deletion
        // closing delete modal
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal
      show={show}
      onHide={() => onHide(false)}
      aria-labelledby="example-modal-sizes-title-xl"
      size="xl"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-xl">
          {t("Common.Attachments")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && error != null && (
          <>
            <Alerty
              variant="danger"
              title={t("err.Error")}
              description={error.clientMessage}
            ></Alerty>
          </>
        )}
        <Attachments
          attachments={entityAttachmentsObj}
          action={setEntityAttachmentsObj}
        />
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={updateBuyReturn}
            className="btn btn-delete btn-success"
          >
            {t("Common.Save")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
