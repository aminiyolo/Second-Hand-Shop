import styled from "styled-components";

export const Header = styled.header`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma,
    Arial, sans-serif;
  font-weight: 700;
  color: whitesmoke;
  font-size: 3rem;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 0px;
  margin-bottom: 40px;
  cursor: pointer;
`;

export const Form = styled.form`
  margin: 30px auto 0;
  max-width: 400px;
  overflow-x: hidden;
  padding: 5px;

  @media screen and (max-width: 580px) {
    overflow-x: hidden;
    width: 80%;
    height: 70%;
  }
`;

export const Label = styled.label`
  margin-bottom: 16px;
  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 90%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    outline: none;
    border: #ff8a3d;
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(255, 138, 61, 0.8);
  }
`;

export const Button = styled.button`
  margin-bottom: 12px;
  width: 90%;
  max-width: 100%;
  color: #fff;
  background-color: #ff8a3d;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #ff6a3d;
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const Success = styled.div`
  color: #2eb67d;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const LinkContainer = styled.p`
  font-size: 13px;
  color: #616061;
  margin: 0 auto 8px;
  width: 25rem;
  max-width: 400px;
  padding-bottom: 20px;
  & a {
    color: #1264a3;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 580px) {
    text-align: center;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
  font-weight: 800;
`;

export const FormAndImage = styled.div`
  background-image: url("https://i.ibb.co/HtLKZg2/LoginBG.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding-top: 20rem;
    padding-bottom: 50rem;
    width: 100%;
  }

  @media screen and (max-width: 580px) {
    padding-bottom: 50rem;
    width: 105%;
  }

  @media screen and (max-width: 400px) {
    width: 105%;
  }
`;

export const Container = styled.div`
  margin: 160px 50px 40px 85px;

  @media screen and (max-width: 400px) {
    margin: 0;
  }
`;
