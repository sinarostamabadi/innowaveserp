/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

export const DetailAmountColumnFormatter = (cellContent, row, rowIndex, { t, selectedId, updateDetail }) => {
  return (
    <>
    {selectedId == row.SellDocumentDetailId? (
        <div style={{width: "90px"}} class="input-group input-group-sm m-0">
        <div class="input-group-prepend">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
            onClick={()=> updateDetail({...row, Amount: row.Amount - 1})}
          >
            -
          </button>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          style={{width: "38px",textAlign: "center", padding: "0"}}
          value={cellContent}
          onChange={val => {
            updateDetail({...row, Amount: val.target.value});
          }}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
            onClick={()=> updateDetail({...row, Amount: row.Amount + 1})}
          >
            +
          </button>
        </div>
      </div>
    ):(
      cellContent
    )}

    </>
  );
}
