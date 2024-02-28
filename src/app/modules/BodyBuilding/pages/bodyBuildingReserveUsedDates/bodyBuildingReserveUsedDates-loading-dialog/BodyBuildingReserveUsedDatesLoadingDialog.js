import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function BodyBuildingReserveUsedDatesLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bodyBuildingReserveUsedDates.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="در حال بارگذاری..." />;
}
