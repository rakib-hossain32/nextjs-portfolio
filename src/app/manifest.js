export default function manifest() {
  return {
    name: 'Rakib Hossain Portfolio',
    short_name: 'Rakib Portfolio',
    description: 'Personal portfolio of a MERN stack developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
