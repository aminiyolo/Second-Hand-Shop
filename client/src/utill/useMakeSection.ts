import dayjs from "dayjs";

export type Msg = {
  sender: string;
  text: string;
  createdAt: number;
  message?: string;
};

export default function MakeSection(messages: Msg[]) {
  const sections: any = {};
  messages.forEach((msg) => {
    const date = dayjs(msg.createdAt).format("YYYY-MM-DD");
    if (Array.isArray(sections[date])) {
      sections[date].push(msg);
    } else {
      sections[date] = [msg];
    }
  });
  return sections;
}
