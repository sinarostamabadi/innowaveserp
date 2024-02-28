import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "jalali-moment";

export function DateFaColumnFormatter(cellContent, row, rowIndex) {
  console.log("row ", row);

  let dateFa = moment.from(row.PersonSpecialDayDate, "en", "YYYY/MM/DD");
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{cellContent}</Tooltip>}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          {dateFa.local(process.env.REACT_APP_DATE).format("YYYY/MM/DD")}
        </span>
      </OverlayTrigger>
    </>
  );
}
