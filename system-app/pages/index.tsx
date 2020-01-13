import Router from "next/router";

export default () => {
  return <span onClick={() => Router.push("/login")}>login</span>;
};
