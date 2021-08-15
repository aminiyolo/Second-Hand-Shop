import React from "react";
import dayjs from "dayjs";
import { H2, Table, Tr } from "./style";

const AboutUsers = ({ users }) => {
  return (
    <div>
      <H2>회원 정보</H2>
      <div>총 회원 수: {users.length}명</div>
      <br />
      <div>
        <Table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                {/* 관리자의 role은 1, 회원들의 role은 0이므로 값이 true일 경우에만 관리자 호칭 붙이기 */}
                <th>{user.role ? `${user.ID} (관리자)` : user.ID}</th>
                <th className="email">{user.email}</th>
                <th>{user.nickname}</th>
                <th>{dayjs(user.createdAt).format("YYYY-MM-DD")}</th>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AboutUsers;
