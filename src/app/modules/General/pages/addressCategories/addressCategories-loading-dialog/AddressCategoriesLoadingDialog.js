import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function AddressCategoriesLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.addressCategories.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="?? ??? ????????..." />;
}
