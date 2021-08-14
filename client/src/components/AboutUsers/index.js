import React from "react";
import dayjs from "dayjs";

const AboutUsers = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>회원 정보</h2>
      <div>총 회원 수: {users.length}명</div>
      <br />
      <div>
        <table>
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
              <tr>
                <th>{user.role ? `${user.ID} (관리자)` : user.ID}</th>
                <th style={{ width: "40%" }}>{user.email}</th>
                <th>{user.nickname}</th>
                <th>{dayjs(user.createdAt).format("YYYY-MM-DD")}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutUsers;
