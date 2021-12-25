import styled from "styled-components";

export const Edit = styled.span`
  position: absolute;
  right: 2.5rem;
  font-size: 2rem;
  cursor: pointer;
  color: #ff8a3d;
  transition: all 300ms ease-out;
  &:hover {
    transform: rotate(15deg);
  }

  @media screen and (max-width: 770px) {
    font-size: 1.3rem;
    left: 22rem;
  }

  @media screen and (max-device-width: 768px) {
    font-size: 1.3rem;
    left: 35rem;
  }

  @media screen and (max-width: 680px) {
    font-size: 1.3rem;
    left: 22rem;
  }

  @media screen and (max-width: 650px) {
    font-size: 1.3rem;
    left: 17rem;
  }

  @media screen and (max-device-width: 640px) {
    left: 22rem;
    font-size: 1.3rem;
  }

  @media screen and (max-device-width: 415px) {
    left: 9rem;
    top: 0.5rem;
    font-size: 1rem;
  }
`;
