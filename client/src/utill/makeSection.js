import dayjs from "dayjs";

export default function MakeSection(messages) {
  const sections = {};
  messages.forEach((msg) => {
    const month = dayjs(msg.createdAt).format("YYYY-MM-DD");
    if (Array.isArray(sections[month])) {
      sections[month].push(msg);
    } else {
      sections[month] = [msg];
    }
  });
  return sections;
}
