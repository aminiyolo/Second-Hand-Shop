import React, { useCallback, useState } from "react";
import { Success, Label } from "../Login/style";
import {
  AuthButton,
  Container,
  Background,
  Error,
  H2,
  Form,
  LinkContainer,
  Button,
  InputContainer,
} from "./style";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { axiosInstance } from "../../config";
import dayjs from "dayjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SignUpPage = () => {
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state);
  const [values, setValues] = useState({
    email: "",
    ID: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback(
    (e: any) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    [values],
  );

  const [authNum, onChangeAuthNum] = useInput("");
  const [auth, setAuth] = useState<number>(getNum());
  const [authCheck, setAuthCheck] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [idInfo, setIdInfo] = useState(false);
  const [nicknameInfo, setNicknameIdInfo] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState(false);
  const [confirmPasswordInfo, setConfirmPasswordInfo] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  function getNum() {
    return Math.random();
  }

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!authCheck) return;

      const { password, confirmPassword } = values;

      if (password !== confirmPassword) {
        return setConfirmPasswordInfo(true);
      } else setConfirmPasswordInfo(false);

      const data = {
        ...values,
        email: validatedEmail,
        image: `http://gravatar.com/avatar/${dayjs(
          new Date(),
        ).unix()}?d=identicon`,
      };

      const getResult = async () => {
        setIsFetching(true);
        try {
          const res = await axiosInstance.post("/api/users/register", data);
          setIsFetching(false);
          if (res.data.success) {
            alert("??????????????? ??????????????????.");
            history.push("/login");
          } else alert(res.data.msg);
        } catch (err) {
          setIsFetching(false);
          console.log(err);
        }
      };

      getResult();
    },
    [values, authCheck, validatedEmail, history],
  );

  const getAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      const { email } = values;

      if (!email.trim()) {
        return setEmailError(true);
      }

      setEmailError(false);
      setSendMail(true);
      setValidatedEmail(email); // ??????????????? ?????? ????????? ????????? ???????????? ?????? ????????? ????????? ????????? ???????????? ??????????????? ????????? ????????? ????????? state??? ??????

      const authNumber = async () => {
        try {
          const res = await axiosInstance.post("/api/auth/mail", { email });
          res.data.success && setAuth(res.data.authNum);
        } catch (err) {
          console.log(err);
        }
      };

      authNumber();
    },
    [values, setAuth],
  );

  const onClickCheckAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      if (!authNum.trim()) return;
      if (auth === authNum) setAuthCheck(true);
      else {
        toast.error("??????????????? ???????????? ????????????", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setAuthCheck(false);
      }
    },
    [auth, authNum],
  );

  user && history.push("/");

  return (
    <Background>
      <Container>
        <H2>Sign Up</H2>
        <Form onSubmit={onSubmit}>
          <Label id="email-label">
            <span>????????? ??????</span>
            <InputContainer>
              <input
                type="email"
                name="email"
                autoComplete="off"
                required
                onChange={handleChange}
              />
            </InputContainer>
            {!sendMail && (
              <AuthButton onClick={getAuthNum}>???????????? ??????</AuthButton>
            )}
            {emailError && <Error color="red">???????????? ??????????????????</Error>}
            {sendMail && <Success>??????????????? ??????????????????.</Success>}
          </Label>
          <Label>
            <span>????????????</span>
            <InputContainer>
              <input value={authNum} onChange={onChangeAuthNum} />
              {!authCheck && (
                <AuthButton onClick={onClickCheckAuthNum}>
                  ???????????? ??????
                </AuthButton>
              )}
              {authCheck && <Success>????????? ???????????????!</Success>}
              {authCheck === false && (
                <Error color="red">????????? ???????????????.</Error>
              )}
            </InputContainer>
            <div></div>
          </Label>
          <Label id="nickname-label">
            <span>?????????</span>
            <InputContainer>
              <input
                type="text"
                name="ID"
                onChange={handleChange}
                autoComplete="off"
                pattern="^[A-Za-z0-9]{6,16}$"
                required
                onBlur={() => setIdInfo(false)}
                onFocus={() => setIdInfo(true)}
              />
              {idInfo && (
                <Error>
                  ???????????? 6??? ?????? 16??? ??????????????? ?????? ?????? ????????? ????????????
                  ????????????.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="nickname-label">
            <span>?????????</span>
            <InputContainer>
              <input
                type="text"
                name="nickname"
                onChange={handleChange}
                autoComplete="off"
                pattern="^[A-Za-z0-9]{6,16}$"
                required
                onBlur={() => setNicknameIdInfo(false)}
                onFocus={() => setNicknameIdInfo(true)}
              />
              {nicknameInfo && (
                <Error>
                  ???????????? 6??? ?????? 16??? ??????????????? ?????? ?????? ????????? ????????????
                  ????????????.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="password-label">
            <span>????????????</span>
            <InputContainer>
              <input
                type="password"
                name="password"
                autoComplete="off"
                onChange={handleChange}
                required
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
                onBlur={() => setPasswordInfo(false)}
                onFocus={() => setPasswordInfo(true)}
              />
              {passwordInfo && (
                <Error>
                  ??????????????? 6?????? ?????? 20??? ??????????????? ?????? ?????? ??????, ??????,
                  ???????????? 1??? ?????? ???????????? ?????????.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="password-check-label">
            <span>???????????? ??????</span>
            <InputContainer>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              {confirmPasswordInfo && (
                <Error color="red">??????????????? ???????????? ????????????.</Error>
              )}
            </InputContainer>
          </Label>
          <Button type="submit" disabled={!authCheck || isFetching}>
            ????????????
          </Button>
        </Form>
        <LinkContainer>
          ?????? ???????????????????&nbsp;
          <Link to="/login">????????? ????????????</Link>
        </LinkContainer>
        <ToastContainer />
      </Container>
    </Background>
  );
};

export default SignUpPage;
