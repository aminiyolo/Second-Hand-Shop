import styled from "styled-components";

export const MessageWrapper = styled.div`
  padding: 5px 10px;
  height: 80px;

  & > .sender {
    text-align: right;
    margin-left: 7px;
    margin-bottom: 10px;
    height: 70px;
  }

  & > .message {
    text-align: left;
    margin-bottom: 30px;
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
      font-size: 11px;
      margin-left: 2px;
    }

    & > div {
      & > .couterpart {
        margin-bottom: 0;
      }

      & > .text {
        margin-left: 5px;
        margin-bottom: 0;
      }
    }
  }
`;
