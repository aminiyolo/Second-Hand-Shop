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
import axios from "axios";
import dayjs from "dayjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state);
  const [values, setValues] = useState({
    email: "",
    ID: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [authNum, onChangeAuthNum] = useInput("");
  const [auth, setAuth] = useState(getNum());
  const [authCheck, setAuthCheck] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [idInfo, setIdInfo] = useState(false);
  const [nicknameInfo, setNicknameIdInfo] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState(false);
  const [confirmPasswordInfo, setConfirmPasswordInfo] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState("");

  function getNum() {
    return Math.random();
  }

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!authCheck) return;

      const { password, confirmPassword } = values;

      if (password !== confirmPassword) {
        setConfirmPasswordInfo(true);
        return;
      } else setConfirmPasswordInfo(false);

      let data = {
        ...values,
        email: validatedEmail,
        image: `http://gravatar.com/avatar/${dayjs(
          new Date()
        ).unix()}?d=identicon`,
      };

      const getResult = async () => {
        try {
          const res = await axios.post("/api/users/register", data);
          if (res.data.success) {
            alert("회원가입이 성공했습니다.");
            history.push("/login");
          } else alert(res.data.msg);
        } catch (err) {
          console.log(err);
        }
      };
      getResult();
    },
    [values, authCheck, validatedEmail, history]
  );

  const getAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      const { email } = values;

      if (!email.trim()) {
        setEmailError(true);
        return;
      }
      setEmailError(false);

      let data = {
        email,
      };

      setSendMail(true);
      setValidatedEmail(email); // 인증번호를 받고 이메일 주소를 지우거나 다른 것으로 기입할 경우에 대비하여 인증번호를 발송한 이메일 주소를 state에 저장

      const authNumber = async () => {
        try {
          const res = await axios.post("/api/auth/mail", data);
          if (res.data.success) {
            setAuth(res.data.authNum);
          }
        } catch (err) {
          console.log(err);
        }
      };
      authNumber();
    },
    [values, setAuth]
  );

  const onClickCheckAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      if (!authNum.trim()) return;
      if (auth === authNum) {
        setAuthCheck(true);
      } else {
        toast.error("인증번호가 일치하지 않습니다", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setAuthCheck(false);
      }
    },
    [auth, authNum]
  );

  if (user) {
    history.push("/");
  }

  return (
    <Background>
      <Container>
        <H2>Sign Up</H2>
        <Form onSubmit={onSubmit}>
          <Label id="email-label">
            <span>이메일 주소</span>
            <InputContainer>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </InputContainer>
            {!sendMail && (
              <AuthButton onClick={getAuthNum}>인증번호 받기</AuthButton>
            )}
            {emailError && <Error color="red">이메일을 입력해주세요</Error>}
            {sendMail && <Success>인증번호를 전송했습니다.</Success>}
          </Label>
          <Label>
            <span>인증번호</span>
            <InputContainer>
              <input value={authNum} onChange={onChangeAuthNum} />
              {!authCheck && (
                <AuthButton onClick={onClickCheckAuthNum}>
                  인증번호 확인
                </AuthButton>
              )}
              {authCheck && <Success>인증이 되었습니다!</Success>}
              {authCheck === false && (
                <Error color="red">인증이 필요합니다.</Error>
              )}
            </InputContainer>
            <div></div>
          </Label>
          <Label id="nickname-label">
            <span>아이디</span>
            <InputContainer>
              <input
                type="text"
                name="ID"
                onChange={handleChange}
                pattern="^[A-Za-z0-9]{6,16}$"
                required
                onBlur={() => setIdInfo(false)}
                onFocus={() => setIdInfo(true)}
              />
              {idInfo && (
                <Error>
                  아이디는 6자 이상 16자 이하이어야 하며 특수 문자가 들어가면
                  안됩니다.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="nickname-label">
            <span>닉네임</span>
            <InputContainer>
              <input
                type="text"
                name="nickname"
                onChange={handleChange}
                pattern="^[A-Za-z0-9]{6,16}$"
                required
                onBlur={() => setNicknameIdInfo(false)}
                onFocus={() => setNicknameIdInfo(true)}
              />
              {nicknameInfo && (
                <Error>
                  닉네임은 6자 이상 16자 이하이어야 하며 특수 문자가 들어가면
                  안됩니다.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <InputContainer>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
                onBlur={() => setPasswordInfo(false)}
                onFocus={() => setPasswordInfo(true)}
              />
              {passwordInfo && (
                <Error>
                  비밀번호는 6글자 이상 20자 이하이어야 하며 최소 숫자, 문자,
                  특수문자 1자 이상 포함해야 합니다.
                </Error>
              )}
            </InputContainer>
          </Label>
          <Label id="password-check-label">
            <span>비밀번호 확인</span>
            <InputContainer>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
              />
              {confirmPasswordInfo && (
                <Error color="red">비밀번호가 일치하지 않습니다.</Error>
              )}
            </InputContainer>
          </Label>
          <Button type="submit" disabled={!authCheck}>
            회원가입
          </Button>
        </Form>
        <LinkContainer>
          이미 회원이신가요?&nbsp;
          <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
        <ToastContainer />
      </Container>
    </Background>
  );
};

export default SignUpPage;
