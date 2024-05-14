export const metadata = {
  title: 'HinataMerch',
  description: 'Hinatazaka46 Merchandise',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
