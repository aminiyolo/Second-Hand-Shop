import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
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

const LoginPage = ({ history, DATA, revalidate }) => {
  const [ID, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [logInError, setLogInError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

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
            setLogInError(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

      login();
    },
    [ID, password, history, revalidate]
  );

  if (DATA?.token) {
    history.push("/");
  }

  if (DATA === undefined) {
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
            {logInError && (
              <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
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

export default withRouter(LoginPage);
