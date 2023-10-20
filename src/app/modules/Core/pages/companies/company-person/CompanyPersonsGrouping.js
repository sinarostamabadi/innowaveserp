import React, { useMemo } from "react";
import { useCompanyPersonsUIContext } from "./CompanyPersonsUIContext";

export function CompanyPersonsGrouping() {
  // Specs UI Context
  const specsUIContext = useCompanyPersonsUIContext();
  const specsUIProps = useMemo(() => {
    return {
      ids: specsUIContext.ids,
      openDeleteCompanyPersonsDialog:
        specsUIContext.openDeleteCompanyPersonsDialog,
      openFetchCompanyPersonsDialog:
        specsUIContext.openFetchCompanyPersonsDialog,
    };
  }, [specsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger mt-5">
                <span>Selected records count: {specsUIProps.ids.length}</span>
              </label>
            </div>
            <div className="form-group-inline">
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={specsUIProps.openDeleteCompanyPersonsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={specsUIProps.openFetchCompanyPersonsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
