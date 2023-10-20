/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import * as actions from "../../../_redux/buys/buysActions";
import { useBuysUIContext } from "../BuysUIContext";
import { useTranslation } from "react-i18next";
import { Attachments } from "src/core/_partials/controls/attachment/Attachments";
import { EnToFaObjDate, FaObjToEnDateTime, ObjectToFormData } from "src/core/_helpers";

export function BuyAttachments({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const buysUIContext = useBuysUIContext();
  const dispatch = useDispatch();
  const [buyObj, setBuyObj] = useState(null);
  const [entityAttachmentsObj, setEntityAttachmentsObj] = useState([]);

  const { isLoading, buyForEdit } = useSelector(
    (state) => ({
      isLoading: state.buys.actionsLoading,
      buyForEdit: state.buys.buyForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      dispatch(actions.fetchBuy(id));
    }
  }, [id]);

  useEffect(() => {
    setBuyObj({...buyObj, EntityAttachments: entityAttachmentsObj});
  }, [entityAttachmentsObj]);

  useEffect(() => {
    if (id && buyForEdit && buyForEdit.BuyId == id) {
      setBuyObj({
        ...buyForEdit,
        BuyDateObj: EnToFaObjDate(buyForEdit.BuyDate),
        FactorDateObj:
          buyForEdit.FactorDate && EnToFaObjDate(buyForEdit.FactorDate),
      });
      setEntityAttachmentsObj(buyForEdit.EntityAttachments);
    }else {
      setBuyObj(null);
      setEntityAttachmentsObj([]);
    }
  }, [buyForEdit, id]);

  function cleanFull(dirty) {
    let buyObject = {
      BuyId: dirty.BuyId,
      BuyNumber: 0,
      FactorNumber: dirty.FactorNumber,
      BuySettlementTypeId:
        dirty.BuySettlementTypeId && +dirty.BuySettlementTypeId,
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
      BuyDate: FaObjToEnDateTime(dirty.BuyDateObj),
      FactorDate: FaObjToEnDateTime(dirty.FactorDateObj),
      IsClosed: !!dirty.IsClosed,
      IsTemp: !!dirty.IsTemp,
      BuyDetails: [],
      BuyCosts: [],
      BuyDiscounts: [],
      EntityAttachments: [],
    };

    buyObject.BuyDiscounts = dirty.BuyDiscounts.map((d) => {
      let xx = {
        BuyDiscountId:
          d.BuyDiscountId.toString().indexOf("temp") > -1
            ? null
            : d.BuyDiscountId,
        DiscountTypeId: d.DiscountTypeId,
        DiscountPercent: d.DiscountPercent,
        PricePercent: Math.ceil(+d.PricePercent),
        IsDeleted: d.IsDeleted,
      };

      return xx;
    });

    buyObject.BuyDetails = dirty.BuyDetails.map((d) => {
      let xx = {
        BuyDetailId:
          d.BuyDetailId.toString().indexOf("temp") > -1 ? null : d.BuyDetailId,
        ProductId: d.ProductId,
        ProductUnitId: d.ProductUnitId,
        Amount: d.Amount && +d.Amount,
        Price: d.Price && +d.Price,
        DiscountPrice: d.DiscountPrice && +d.DiscountPrice,
        DiscountPercent: d.DiscountPercent && +d.DiscountPercent,
        CostPrice: d.CostPrice && +d.CostPrice,
        PayablePrice: d.PayablePrice && +d.PayablePrice,
        IsDeleted: d.IsDeleted,
        BuySerials: d.BuySerials.map((s) => {
          return { SerialNumber: s.SerialNumber };
        }),
        BuyDetailRequestDetails: d.BuyDetailRequestDetails,
      };

      return xx;
    });

    buyObject.BuyCosts = dirty.BuyCosts.map((d) => {
      let xx = {
        BuyCostId:
          d.BuyCostId.toString().indexOf("temp") > -1 ? null : d.BuyCostId,
        CostTypeId: d.CostTypeId,
        Price: d.Price,
        CostPercent: d.CostPercent,
        Describtion: d.Describtion,
        IsDeleted: d.IsDeleted,
      };

      return xx;
    });

    buyObject.EntityAttachments = dirty.EntityAttachments.map((x) => {
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
    console.log("buyObject > ", buyObject);
    return buyObject;
  }

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const updateBuy = () => {
    dispatch(
      actions.updateBuy(id, ObjectToFormData(cleanFull(buyObj)), () => {
        onHide(true);
      })
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
            onClick={updateBuy}
            className="btn btn-delete btn-success"
          >
            {t("Common.Save")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
