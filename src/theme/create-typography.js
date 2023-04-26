import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
export const createTypography = () => {
  return {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: "-0.24px",
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: "-0.24px",
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: "-0.06px",
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: "-0.06px",
    },
    h5: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: "-0.05px",
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: "-0.05px",
    },
  };
};
