import LawyerNav from "@/components/LawyerNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <LawyerNav />
      {children}
    </div>
  );
}
