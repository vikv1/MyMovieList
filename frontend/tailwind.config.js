module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure it matches your file paths
    ".src/assets/Components/**/*.{html,js,tsx}",
    ".src/assets/UI_Files/**/*.{jpg,jpeg,png}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#0F0F0F',
        'navbar-button-select-color' : '#1A1A1A',
        'search-container-color' : '#3B3B3B',
        'search-bar-color' : '#252525',
      }
    },
  },
  plugins: [],
};

