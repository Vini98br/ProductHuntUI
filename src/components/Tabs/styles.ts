import styled from "styled-components";

export const Tabs = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
`;

export const Tab = styled.div<{ active?: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.gray_2};
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.active ? `3px solid ${props.theme.colors.primary}` : "unset"};
`;