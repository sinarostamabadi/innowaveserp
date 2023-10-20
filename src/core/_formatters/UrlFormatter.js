import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ShorterLink(cellContent) {
  let url = { hostname: "" };
  try {
      let strUrl = cellContent.indexOf("//") > -1 ? cellContent : "http://" + cellContent;
      var uri_encoded = strUrl.replace(/%([^\d].)/, "%25$1");
      
      let decode = decodeURIComponent(uri_encoded)
      url = new URL(decode);
  } catch (error) {
    url["hostname"] = "";
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="specs-edit-tooltip" className="dir-ltr text-right">
            {decodeURI(cellContent)}
          </Tooltip>
        }
      >
        <a
          href={cellContent}
          target="_blank"
          className="btn btn-link p-0 dir-ltr text-right"
          style={{
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "sans-serif,Tahoma",
          }}
        >
          {url.hostname}
        </a>
      </OverlayTrigger>
    </>
  );
}
