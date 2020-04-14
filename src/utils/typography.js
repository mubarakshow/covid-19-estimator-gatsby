import Typography from "typography";  

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  googleFonts: [
    {
      name: 'Rubik',
      styles: [
        '300',
        '400',
        '500',
        '700'
      ]
    }
  ],
  
  bodyFontFamily: ["Rubik", "Merriweather"],
});

export default typography;