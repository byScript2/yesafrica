import Body from "./body";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ message: string; status: string }>;
}) {
  const { status, message } = await searchParams;

  return <Body status={status} message={message} />;
}
