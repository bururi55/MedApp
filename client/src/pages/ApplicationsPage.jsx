import React from "react";
import { ApplicationsTable } from "../components/ApplicationsTable/ApplicationsTable";
import styled from "styled-components";

const ApplicationsPageContainer = ({ className }) => {
  return (
    <div className={className}>
      <ApplicationsTable />
    </div>
  );
};

export const ApplicationsPage = styled(ApplicationsPageContainer)`
  padding: 20px;
  background-color: rgba(204, 99, 178, 0.1);
  min-height: 100vh;
`;
