import React from "react";
import { TextareaWrapper } from "./style";

interface IProps {
  handleSubmit: (e: any) => void;
  newMessages: string;
  setNewMessages: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea: React.VFC<IProps> = ({
  handleSubmit,
  newMessages,
  setNewMessages,
}) => {
  return (
    <TextareaWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="textarea"
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
        />
        <div className="submit">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </TextareaWrapper>
  );
};

export default React.memo(Textarea);
