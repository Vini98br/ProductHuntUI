import styled from 'styled-components';

export const Container = styled.div``;

export const List = styled.div<{ length: number }>`
  padding: 0 15px;
  height: ${props => props?.length < 15 ? '100%' : 'calc(100% - 140px)'};
`;

export const Post = styled.div`
  position: relative;
  display: flex;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  box-shadow: 0 0 12px -8px rgb(0 0 0 / 60%);
  > img {
    margin-right: 10px;
  }
`;

export const Logo = styled.img`
  border-radius: 10px;
  width: 50px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const Title = styled.h3`
 font-size: 18px;
  @media (max-width: 520px) {
    font-size: 15px;
  }
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  word-wrap: break-word;
  width: 90%;
  font-size: 15px;
  @media (max-width: 520px) {
    font-size: 12px;
  }
`;

export const Fav = styled.div`
  margin: auto;
  position: absolute;
  right: 10px;
  bottom: 0;
  top: 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
