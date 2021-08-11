import React, { useCallback, useState } from "react";
import {
  Success,
  Form,
  Label,
  Input,
  LinkContainer,
  Button,
  Loading,
} from "../Login/style";
import { AuthButton, Container, Background, Error, H2 } from "./style";
import { Link, withRouter } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";
import dayjs from "dayjs";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const SignUpPage = ({ history }) => {
  function getNum() {
    return Math.random();
  }

  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  const [authNum, onChangeAuthNum] = useInput("");
  const [auth, setAuth] = useState(getNum());
  const [authCheck, setAuthCheck] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyID, setEmptyID] = useState(false);
  const [shortID, setShortID] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [validatedEmail, setValidatedEmail] = useState("");
  const [nickname, onChangeNickname] = useInput("");
  const [ID, onChangeID] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password]
  );

  function ValidationCheck(state, setState) {
    if (!state.trim()) {
      setState(true);
      return;
    } else {
      setState(false);
    }
  }

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      ValidationCheck(nickname, setNickNameCheck);
      ValidationCheck(password, setEmptyPassword);
      ValidationCheck(ID, setEmptyID);

      if (ID.length < 6) setShortID(true);
      else setShortID(false);

      if (!passwordCheck.trim() || !authCheck) return;

      if (!mismatchError) {
        setSignUpSuccess(false);
        setSignUpError("");

        let data = {
          email: validatedEmail,
          ID,
          nickname,
          password,
          image: `http://gravatar.com/avatar/${dayjs(
            new Date()
          ).unix()}?d=identicon`,
        };

        axios
          .post("/api/users/register", data)
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((e) => {
            console.log(e.response);
            setSignUpError(e.response.data);
          });
      }
    },
    [email, nickname, password, mismatchError, authCheck, passwordCheck, ID]
  );

  const getAuthNum = useCallback(
    (e) => {
      e.preventDefault();

      if (!email.trim()) {
        setEmailError(true);
        return;
      }
      setEmailError(false);

      let data = {
        email,
      };

      setSendMail(true);
      setValidatedEmail(email);
      axios.post("/api/auth/mail", data).then((response) => {
        if (response.data.success) {
          revalidate();
          setAuth(response.data.authNum);
        }
      });
    },
    [email, setAuth, revalidate]
  );

  const onClickCheckAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      if (auth === authNum) {
        setAuthCheck(true);
      } else {
        setAuthCheck(false);
      }
    },
    [auth, authNum]
  );

  if (data?.token) {
    history.push("/");
  }

  if (data === undefined) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Background>
      <Container>
        <H2>Sign Up</H2>
        <Form>
          <Label id="email-label">
            <span>이메일 주소</span>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              {!sendMail && (
                <AuthButton onClick={getAuthNum}>인증번호 받기</AuthButton>
              )}
              {emailError && <Error>이메일을 입력해주세요</Error>}
              {sendMail && <Success>인증번호를 전송했습니다.</Success>}
            </div>
          </Label>
          <Label>
            <span>인증번호</span>
            <div>
              <Input value={authNum} onChange={onChangeAuthNum} />
              {!authCheck && (
                <AuthButton onClick={onClickCheckAuthNum}>
                  인증번호 확인
                </AuthButton>
              )}
              {authCheck && <Success>인증이 되었습니다!</Success>}
              {authCheck === false && <Error>인증이 필요합니다.</Error>}
            </div>
            <div></div>
          </Label>
          <Label id="nickname-label">
            <span>아이디</span>
            <div>
              <Input
                type="text"
                id="ID"
                name="ID"
                value={ID}
                onChange={onChangeID}
              />
            </div>
          </Label>
          <Label id="nickname-label">
            <span>닉네임</span>
            <div>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </Label>
          <Label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <Input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>
            {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
            {emptyID && <Error>아이디를 입력해주세요.</Error>}
            {shortID && <Error>아이디는 여섯글자 이상이어야 합니다.</Error>}
            {!nickname && nickNameCheck && (
              <Error>닉네임을 입력해주세요.</Error>
            )}
            {!password && emptyPassword && (
              <Error>비밀번호를 입력해주세요.</Error>
            )}
            {signUpError && <Error>{signUpError}</Error>}
            {signUpSuccess && (
              <Success>회원가입되었습니다! 로그인해주세요.</Success>
            )}
          </Label>
          <Button onClick={onSubmit}>회원가입</Button>
        </Form>
        <LinkContainer>
          이미 회원이신가요?&nbsp;
          <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
      </Container>
    </Background>
  );
};

export default withRouter(SignUpPage);
