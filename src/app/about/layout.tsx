export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <div className="text-center justify-center">{children}</div>
    </section>
  );
}
