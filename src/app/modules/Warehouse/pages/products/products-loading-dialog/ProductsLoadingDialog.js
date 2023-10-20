import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function ProductsLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.products.listLoading }),
    shallowEqual  
  );
useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="در حال بارگذاری..." />;
}
