import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Error,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
  Loading,
  FormAndImage,
  Container,
} from "./style";
import useInput from "../../hooks/useInput";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const LoginPage = () => {
  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  const history = useHistory();
  const [ID, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [logInError, setLogInError] = useState("");
  const [emptyCheck, setEmptyCheck] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError("");

      if (!ID.trim() || !password.trim()) {
        return setEmptyCheck(true);
      }

      setEmptyCheck(false);

      let data = {
        ID,
        password,
      };

      const login = async () => {
        try {
          const res = await axios.post("/api/users/login", data);
          if (res.data.success) {
            revalidate();
            history.push("/");
          } else {
            setLogInError(res.data.msg);
          }
        } catch (err) {
          console.log(err);
        }
      };

      login();
    },
    [ID, password, history, revalidate]
  );

  if (data?.token) {
    history.push("/");
  }

  if (data === undefined) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <FormAndImage>
      <Container>
        <Header>Login</Header>
        <Form onSubmit={onSubmit}>
          <Label id="email-label">
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
            {logInError && <Error>{logInError}</Error>}
            {emptyCheck && (
              <Error>아이디와 비밀번호를 모두 작성해주세요.</Error>
            )}
          </Label>
          <Button type="submit">로그인</Button>
        </Form>
        <LinkContainer>
          아직 회원이 아니신가요?&nbsp;
          <Link to="/signup">회원가입 하러가기</Link>
        </LinkContainer>
      </Container>
    </FormAndImage>
  );
};

export default LoginPage;
