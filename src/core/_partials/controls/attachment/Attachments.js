import React, { useState, useEffect } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getById } from "src/app/modules/Core/_redux/attachment/attachmentsCrud";
import { FormAttachment } from "./FormAttachment";

export function Attachments({ attachments, action }) {
  const { t } = useTranslation();
  function removeFile(id) {
    action(
      attachments.map((x) => {
        if (x.EntityAttachmentId != id) return x;
        else return { ...x, IsDeleted: true };
      })
    );
  }

  function addFile(attachmentObj) {
    console.log("attachments <> ", attachments);
    action((atts) => [...atts, attachmentObj]);
  }

  useEffect(() => {
    if (attachments.length == 0) return;

    setTimeout(() => {
      attachments.forEach((file, i) => {
        if (!!file.Attachment.FormFile && !!file.Attachment.FormFile.name) {
          readURL(file.Attachment.FormFile, i);
        } else {
          readService(file.AttachmentId, i);
        }
      });
    }, 200);
  }, [attachments.length]);

  function readURL(input, index) {
    if (input) {
      var reader = new FileReader();

      reader.onload = function(e) {
        action((files) =>
          files.map((x, i) => {
            let newObj = { ...x };
            if (i == index) {
              newObj.content = e.target.result;
              newObj.ImageFile = input;
              newObj.IsDeleted = newObj.IsDeleted;
            }

            return newObj;
          })
        );
      };

      reader.readAsDataURL(input);
    }
  }

  function readService(input, index) {
    if (input) {
      getById(input).then(({ data }) => {
        action((files) =>
          files.map((x, i) => {
            let newObj = { ...x };
            if (i == index) {
              console.log();
              newObj.content =
                `data:${data.FileExtension};base64,` + data.ContentText;
              newObj["FileSize"] = data.FileSize;
              newObj["FileExtension"] = data.FileExtension;
              newObj["FileName"] = data.FileName;
              newObj.ImageFile = null;
              newObj.IsDeleted = newObj.IsDeleted;
              // x.CompanyProductImageId= "temp_" + Math.floor(Math.random() * 1000)
            }
            return newObj;
          })
        );
      });
    }
  }

  function downloadFile(contentBase64, fileName) {
    const linkSource = `${contentBase64}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <>
      <Row className="py-3 pb-3 mb-5">
        <Col md={6}>
          <FormAttachment addFile={addFile} />
        </Col>
        <Col md={6}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <label htmlFor="Title" style={{ width: "100%" }}>
              List of documents
            </label>
            <div
              className="p-relative"
              style={{
                border: "1px solid rgb(209, 211, 224)",
                borderRadius: "0.42rem",
                height: "100%",
                flex: "1",
                padding: "1rem",
              }}
            >
              <div className="">
                <div className="files">
                  {attachments &&
                  attachments.length > 0 &&
                  attachments.filter((x) => x.IsDeleted == false).length > 0 ? (
                    attachments
                      .filter((x) => x.IsDeleted == false)
                      .map((x, i) => (
                        <div
                          key={x.EntityAttachmentId}
                          className="card card-border-dark mt-2"
                        >
                          <div className="card-body p-2 d-flex">
                            <div
                              style={{
                                flex: "0",
                                position: "relative",
                              }}
                              className="flex-1"
                            >
                              <input
                                type="file"
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  bottom: "0",
                                  right: "0",
                                  width: "100%",
                                  opacity: "0",
                                }}
                              />
                              <img
                                src={x.content}
                                style={{
                                  height: "78px",
                                  width: "78px",
                                  border: "2px solid #d1d3e0",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                flex: "2",
                                position: "relative",
                              }}
                              className="flex-1 pl-3"
                            >
                              <div className="py-2">
                                <b>Name: </b>{" "}
                                {!!x.Attachment &&
                                !!x.Attachment.FormFile &&
                                !!x.Attachment.FormFile.name
                                  ? x.Attachment.FormFile.name
                                  : !!x.Attachment
                                  ? x.Attachment.FileName
                                  : ""}
                              </div>
                              <div className="pb-2">
                                <b>Type: </b>{" "}
                                {!!x.Attachment &&
                                !!x.Attachment.FormFile &&
                                !!x.Attachment.FormFile.type
                                  ? x.Attachment.FormFile.type
                                  : !!x.Attachment
                                  ? x.Attachment.FileExtension
                                  : ""}
                              </div>
                              <div>
                                <b>Size: </b>{" "}
                                {Math.ceil(
                                  (!!x.Attachment &&
                                  !!x.Attachment.FormFile &&
                                  !!x.Attachment.FormFile.size
                                    ? x.Attachment.FormFile.size
                                    : !!x.Attachment
                                    ? x.Attachment.FileSize
                                    : 0) / 1024
                                )}{" "}
                                KB
                              </div>
                              <div className="position-absolute top-0 right-0">
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip-download">
                                      {t("Common.Download")}
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    onClick={() =>
                                      downloadFile(
                                        x.content,
                                        !!x.Attachment &&
                                          !!x.Attachment.FormFile &&
                                          !!x.Attachment.FormFile.name
                                          ? x.Attachment.FormFile.name
                                          : !!x.Attachment
                                          ? x.Attachment.FileName
                                          : ""
                                      )
                                    }
                                    className="btn p-0 m-0"
                                  >
                                    <i className="fa fa-arrow-to-bottom text-info p-0"></i>
                                  </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip-edit">
                                      {t("Common.Edit")}
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    // onClick={() =>editFile(x.EntityAttachmentId)}
                                    className="btn p-0 m-0 mx-1"
                                  >
                                    <i className="fa fa-edit text-primary p-0"></i>
                                  </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip-remove">
                                      {t("Common.Delete")}
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    onClick={() =>
                                      removeFile(x.EntityAttachmentId)
                                    }
                                    className="btn p-0 m-0"
                                  >
                                    <i className="fa fa-trash-alt text-danger p-0"></i>
                                  </button>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="p-5 text-center">No file has been selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
