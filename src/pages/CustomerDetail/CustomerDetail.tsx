import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const CustomerDetail = (props: Props) => {
  const p = useParams();
  console.log(p);
  return <div>CustomerDetail</div>;
};

export default CustomerDetail;
