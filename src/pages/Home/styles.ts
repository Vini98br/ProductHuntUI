import styled from "styled-components";
import { BsInbox } from "react-icons/bs";

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.light_gray};
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  svg {
    color: ${(props) => props.theme.colors.light_gray};
  }
`;

export const Empty = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  flex-direction: column;
`;

export const EmptyIcon = styled(BsInbox)`
  color: ${props => props.theme.colors.gray};
`;

export const Warn = styled.h2`
  font-weight: 300;
  font-size: 15px;
  color: ${props => props.theme.colors.gray};
`;

export const Header = styled.header`
  display: flex;
  height: auto;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 4px 8px -6px rgba(0, 0, 0, 0.6);
`;

export const Menu = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  @media(max-width: 478px) {
    flex-direction: column;
    justify-content: space-around;
    height: 200px;

  }
  svg {
    color: ${(props) => props.theme.colors.gray};
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
`;

export const Filter = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.light_gray};
  color: ${(props) => props.theme.colors.dark_gray};
  height: auto;
  justify-content: center;
  text-align: center;
  width: 100px;
  padding: 5px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;