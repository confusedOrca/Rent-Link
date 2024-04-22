/* 
  Place User Authentication forms here
*/
import React from "react";
import Tab from "../components/Tab";
import TabElement from "../components/TabElement";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

const AuthTab = () => {
  return (
    <>
      <Tab className="text-2xl px-5">
        <TabElement title="login">
          <SignInForm />
        </TabElement>
        <TabElement title="signup">
          <SignUpForm />
        </TabElement>
      </Tab>
    </>
  );
};

export default AuthTab;
