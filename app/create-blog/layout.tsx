import { ClerkProvider } from "@clerk/nextjs";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const {getToken} = await useAuth();
  // const token = await getToken();
  // console.log("token: ",token);

  return (
    <ClerkProvider>
      <div>{children}</div>
    </ClerkProvider>
  );
}
