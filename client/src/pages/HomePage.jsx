import React from "react";
import { Form } from "../components/Form/Form";
import styled from "styled-components";

const HomePageContainer = ({ className }) => {
  return (
    <div className={className}>
      <Form />
    </div>
  );
};

export const HomePage = styled(HomePageContainer)`
  padding: 20px;
  background-color: rgba(204, 99, 178, 0.1);
  min-height: 100vh;
`;
