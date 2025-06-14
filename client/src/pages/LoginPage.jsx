import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import styled from "styled-components";

const LoginPageContainer = ({ className }) => {
  return (
    <div className={className}>
      <LoginForm />
    </div>
  );
};

export const LoginPage = styled(LoginPageContainer)`
  padding: 20px;
  background-color: rgba(204, 99, 178, 0.1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
