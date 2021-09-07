import dayjs from "dayjs";

export default function MakeSection(messages) {
  const sections = {};
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
