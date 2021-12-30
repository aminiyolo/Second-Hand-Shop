import styled from "styled-components";

export const MessengerWrapper = styled.div`
  display: flex;
`;

export const MessengerList = styled.div`
  border-right: solid;
  border-color: lightgray;
  flex-direction: column;
  width: 20%;
  height: 100vh;

  & > .conversations {
    border: none;
    text-align: center;
    margin: 100px auto;
    width: 100%;
  }
`;

export const ConversationWrapper = styled.div`
  margin-left: 5px;
`;

export const MessageWrapper = styled.div`
  margin: auto;
  padding-top: 20px;
  margin-top: 20px;
  width: 70%;

  & > .message {
    margin-bottom: 0;
    margin-top: 45px;
  }

  & > .message_workspace {
    text-align: center;
    height: 380px;
    background-color: aliceblue;
    border-radius: 5px;
    overflow-y: auto;
  }

  & > .message_workspace::-webkit-scrollbar {
    width: 10px;
  }

  & > .message_workspace::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 0.5rem;
    height: 50px;
  }

  & > .message_workspace::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

export const Section = styled.section`
  margin-top: 25px;
  border-top: 1px solid #ddd;

  & > .stickyHeader {
    display: flex;
    justify-content: center;
    flex: 1;
    width: 100%;
    position: sticky;
    top: 20px;

    & > .date {
      font-weight: bold;
      font-size: 13px;
      height: 28px;
      line-height: 27px;
      padding: 0 16px;
      z-index: 2;
      --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
      box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
      border-radius: 24px;
      position: relative;
      top: -15px;
      background: white;
      border: none;
      outline: none;
    }
  }
`;

export const Info = styled.div`
  text-align: center;
  padding-top: 140px;
  font-size: 20px;
`;
