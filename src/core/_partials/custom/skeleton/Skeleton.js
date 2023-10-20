import React from "react";
import ContentLoader from "react-content-loader";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  CardHeaderToolbar,
} from "src/core/_partials/controls";

export const CardLoading = ({ type }) => {
  const Body = () => (
    <ContentLoader
      width={1000}
      height={150}
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      rtl="true"
      speed="3.5"
    >
      <rect x="5" y="10" rx="5" ry="5" width="190" height="35" />
      <rect x="210" y="10" rx="5" ry="5" width="190" height="35" />
      <rect x="415" y="10" rx="5" ry="5" width="190" height="35" />
      <rect x="640" y="12" rx="5" ry="5" width="30" height="30" />
      <rect x="680" y="18" rx="5" ry="5" width="150" height="15" />
      <rect x="5" y="90" rx="5" ry="5" width="190" height="35" />
      <rect x="210" y="90" rx="5" ry="5" width="620" height="35" />
    </ContentLoader>
  );

  const HeaderTitle = () => (
    <ContentLoader
      width={150}
      height={60}
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      rtl="true"
      speed="3"
    >
      <rect x="5" y="10" rx="5" ry="5" width="120" height="40" />
    </ContentLoader>
  );

  const HeaderToolbar = () => (
    <ContentLoader
      width={650}
      height={60}
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      rtl="true"
      speed="2.5"
    >
      <rect x="41%" y="10" rx="5" ry="5" width="90" height="40" />
      <rect x="56%" y="10" rx="5" ry="5" width="90" height="40" />
      <rect x="71%" y="10" rx="5" ry="5" width="90" height="40" />
      <rect x="86%" y="10" rx="5" ry="5" width="90" height="40" />
    </ContentLoader>
  );

  const reciept = (
    <Card>
      <CardHeader>
        <CardHeaderTitle className="m-0 mt-2">{HeaderTitle()}</CardHeaderTitle>
        <CardHeaderToolbar>{HeaderToolbar()}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>{Body()}</CardBody>
    </Card>
  );

  return <div>{type === "reciept" ? reciept : null}</div>;
};
