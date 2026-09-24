export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body
style={{
background: "#08111f",
color: "white",
margin: 0
}}
>
{children}
</body>
</html>
);
}
