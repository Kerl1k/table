import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  table-layout: auto;
  padding: 15px;
`;

export const TR = styled.tr`
  padding: 10px;
  min-height: 100px;
  width: 100%;
`;

export const THead = styled.thead`
  height: 100px;
  border: 1px solid black;
`;

export const TH = styled.th`
  font-size: 20px;
  text-align: center;
`;

export const TD = styled.td`
  padding: 10px;
  font-size: 20px;
  text-align: center;

  &:not(:last-child) {
    width: 200px;
  }
`;
