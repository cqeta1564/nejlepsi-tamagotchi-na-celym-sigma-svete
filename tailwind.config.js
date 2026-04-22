/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        primary: '#AAA9B4',
        background: '#EEF1F4',
        surface: '#F7F8FA',
        border: '#CFD5DD',
        text: {
          primary: '#000000',
          secondary: '#6D7582',
        },
        status: {
          loading: '#AAA9B4',
          error: '#C77E7E',
          success: '#4CD97B',
        },
        stats: {
          hunger: '#FFB347',
          health: '#4CD97B',
          energy: '#5AC8FA',
          happiness: '#FFD93D',
        },
      },
    },
  },
}

export default config
