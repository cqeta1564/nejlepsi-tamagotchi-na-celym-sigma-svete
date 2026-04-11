/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        primary: '#7A7F8C',
        background: '#F2F3F5',
        surface: '#E6E8EB',
        border: '#C9CDD3',
        text: {
          primary: '#000000',
          secondary: '#9E9BBB',
        },
        status: {
          loading: '#7EA9C7',
          error: '#C77E7E',
          success: '#7EBF9B',
        },
        stats: {
          hunger: '#C9A06A',
          health: '#7EBF9B',
          energy: '#7EA9C7',
          happiness: '#C9BE6A',
        },
      },
    },
  },
}

export default config
