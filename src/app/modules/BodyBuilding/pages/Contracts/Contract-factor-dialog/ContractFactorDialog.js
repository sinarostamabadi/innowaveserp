import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import * as actions from "../../../_redux/Contracts/ContractsActions";
import { useContractsUIContext } from "../ContractsUIContext";
import { useTranslation } from "react-i18next";
import { getContractById } from "../../../_redux/Contracts/ContractsCrud";
import moment from "jalali-moment";

export function ContractFactorDialog({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const uiContext = useContractsUIContext();
  const uiProps = useMemo(() => {
    return {
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  const bloodGroups = {
    1: "A+",
    2: "A-",
    3: "B+",
    4: "B-",
    5: "AB+",
    6: "AB-",
    7: "O+",
    8: "O-",
  };
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.contracts.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) onHide();
    else {
      getContractById(id).then(({ data }) => setData(data));
    }
  }, [id]);

  const dispatch = useDispatch();
  const deleteContract = () => {
    dispatch(actions.deleteContract(id))
      .then(() => {
        dispatch(actions.fetchContracts(uiProps.queryParams));
        uiProps.setIds([]);
        onHide();
      })
      .catch((err) => {
        setError(err);
      });
  };
  console.log("data > ", data);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      closeButton={true}
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Show") + " " + t("BodyBuildingContract.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && error != null && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={error.clientMessage}
          ></Alerty>
        )}
        {isLoading && <span>{t("Common.Loading")}</span>}
        <div className="row">
          <div className="col-6 mb-2">
            <strong>{t("BodyBuildingContract.Person")}:</strong>{" "}
            {!!data && data.Person.FullNameFa}
          </div>
          <div className="col-6 mb-2">
            <strong>{t("BodyBuildingContract.SensorInfo")}:</strong>{" "}
            {!!data && data.SensorInfo}
          </div>
          <div className="col-3 mb-2">
            <strong>{t("BodyBuildingContract.FromDate")}:</strong>{" "}
            {!!data && moment(data.FromDate).locale("fa").format("YYYY/MM/DD")}
          </div>
          <div className="col-3 mb-2">
            <strong>{t("BodyBuildingContract.ToDate")}:</strong>{" "}
            {!!data && moment(data.ToDate).locale("fa").format("YYYY/MM/DD")}
          </div>
          <div className="col-2 mb-2">
            <strong>{t("BodyBuildingContract.Height")}:</strong>{" "}
            {!!data && data.Height}
          </div>
          <div className="col-2 mb-2">
            <strong>{t("BodyBuildingContract.Weight")}:</strong>{" "}
            {!!data && data.Weight}
          </div>
          <div className="col-2 mb-2">
            <strong>{t("BodyBuildingContract.BloodGroup")}:</strong>{" "}
            {!!data && bloodGroups[data.BloodGroup]}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>پک</th>
                  <th>سرویس</th>
                  <th>مبلغ</th>
                  <th>مبلغ تخفیف</th>
                  <th>تعداد باقی‌مانده</th>
                  <th>تعداد سرویس</th>
                  <th>جمع کل</th>
                </tr>
              </thead>
              <tbody>
                {!!data &&
                  data.BodyBuildingContractDetails.map((x) => (
                    <tr key={x.BodyBuildingContractDetailId}>
                      <td>
                        {!!x.BodyBuildingPackId && x.BodyBuildingPack.Title}
                      </td>
                      <td>
                        {!!x.BodyBuildingServiceId &&
                          x.BodyBuildingService.Title}
                      </td>
                      <td>{x.Price}</td>
                      <td>{x.DiscountPrice}</td>
                      <td>{x.RemaineCount}</td>
                      <td>{x.ServiceCount}</td>
                      <td>{x.PayablePrice}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-success"
        >
          {t("Common.Close")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
