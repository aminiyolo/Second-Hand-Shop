import styled from "styled-components";

export const MessageWrapper = styled.div`
  padding: 5px 10px;
  height: 80px;

  & > .sender {
    text-align: right;
    margin-left: 7px;
    margin-bottom: 10px;
    height: 70px;
    font-size: 0.9rem;
  }

  & > .message {
    text-align: left;
    margin-bottom: 30px;
    font-size: 0.9rem;
    height: 70px;
  }

  & > div {
    & > .recieve {
      display: flex;
    }

    & > .send {
      border: none;
    }

    & > .createdAt {
      font-size: 0.7rem;
      margin-left: 2px;
    }

    & > div {
      & > .couterpart {
        font-size: 0.9rem;
        margin-bottom: 0;
      }

      & > .text {
        font-size: 0.9rem;
        margin-left: 5px;
        margin-bottom: 0;
      }
    }
  }
`;
