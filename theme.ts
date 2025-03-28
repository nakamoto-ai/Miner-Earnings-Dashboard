import {
  createTheme,
  MantineColorsTuple,
  MantineTheme,
  SegmentedControl,
} from "@mantine/core";
import { Lexend_Mega } from "next/font/google";

const neoRed: MantineColorsTuple = [
  "#FDE7D1",
  "#f8d6b3",
  "#FCBB97",
  "#ffa07a",
  "#FF8D6B",
  "#ff7a5c",
  "#FF7364",
  "#ff6b6b",
  "#ff4911",
  "#CC2B00",
];

const neoOrange: MantineColorsTuple = [
  "#fff7e3",
  "#fceed0",
  "#f6dba4",
  "#f0c773",
  "#ebb64a",
  "#e9ab30",
  "#e7a621",
  "#ce9113",
  "#b78009",
  "#9f6e00",
];

const neoGold: MantineColorsTuple = [
  "#FEFECE",
  "#fdfd96",
  "#FEEC77",
  "#ffdb58",
  "#FAD948",
  "#f4d738",
  "#ECBC28",
  "#e3a018",
  "#CE9113",
  "#B78009",
];

const neoGreen: MantineColorsTuple = [
  "#C4DCBE",
  "#b5d2ad",
  "#B8E7A8",
  "#bafca2",
  "#A5F599",
  "#90ee90",
  "#88D58E",
  "#7fbc8c",
  "#2FFF2F",
  "#317342",
];

const neoBlue: MantineColorsTuple = [
  "#efe9ff",
  "#d9cfff",
  "#af9bff",
  "#8364ff",
  "#5e36fe",
  "#4719fe",
  "#3a09ff",
  "#2c00e4",
  "#3300FF",
  "#1a00b4",
];

const neoLightBlue: MantineColorsTuple = [
  "#E9FCF9",
  "#daf5f0",
  "#C1E8E4",
  "#a7dbd8",
  "#97D5E2",
  "#87ceeb",
  "#78D0E9",
  "#69d2e7",
  "#7df9ff",
  "#15A9C5",
];

const neoPurple: MantineColorsTuple = [
  "#F3F0FE",
  "#e3dff2",
  "#D4C0F9",
  "#C4a1ff",
  "#B495F7",
  "#a388ee",
  "#9D56DC",
  "#9723c9",
  "#821CAD",
  "#711398",
];

const neoPink: MantineColorsTuple = [
  "#FFEBFF",
  "#fcdfff",
  "#FED0E5",
  "#ffc0cb",
  "#FFB9DD",
  "#ffb2ef",
  "#FF8ED2",
  "#ff69b4",
  "#ff00f5",
  "#CB00C3",
];

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const theme = createTheme({
  colors: {
    neoRed,
    neoOrange,
    neoGold,
    neoGreen,
    neoBlue,
    neoLightBlue,
    neoPurple,
    neoPink,
  },

  radius: {
    xs: "2px",
    sm: "3px",
    md: "4px",
    lg: "6px",
    xl: "8px",
  },

  shadows: {
    xs: "2px 2px 0px rgba(0, 0, 0, 0.9)",
    sm: "4px 4px 0px rgba(0, 0, 0, 0.9)",
    md: "6px 6px 0px rgba(0, 0, 0, 0.9)",
    lg: "8px 8px 0px rgba(0, 0, 0, 0.9)",
    xl: "10px 10px 0px rgba(0, 0, 0, 0.9)",
  },

  fontFamily: `${lexendMega.style.fontFamily}, Space Grotesk, Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
  fontFamilyMonospace: "Space Mono, Monaco, Courier, monospace",
  headings: {
    fontFamily: `${lexendMega.style.fontFamily}, Space Grotesk, Poppins, sans-serif`,
    fontWeight: "700",
  },

  components: {
    AppShell: {
      styles: (theme: MantineTheme) => ({
        root: {
          position: "relative",
          zIndex: 0,
          backgroundColor: theme.colors.neoRed[1],
        },
      }),
    },
    SegmentedControl: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: "rgba(255,255,255,.6)",

          border: "3px solid #000",
          borderRadius: "4px",
          boxShadow: "4px 4px 0 #000",
          "--sc-radius": "0px",
          position: "relative",
        },

        control: {
          borderRadius: 0,
          border: "none",
          padding: "3px",
          position: "relative",
        },

        indicator: {
          border: "2px solid #000",
          borderRadius: "3px",
          zIndex: 1,
        },

        innerLabel: {
          fontWeight: 700,
        },
      }),
    },
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.neoBlue[5],
          border: "3px solid #000",
          borderRadius: "4px",
          boxShadow: "4px 4px 0 #000",
          fontWeight: 700,
          transition: "transform 0.2s, box-shadow 0.2s",
          textTransform: "uppercase",
          letterSpacing: "0.5px",

          "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0 #000",
            backgroundColor: theme.colors.neoBlue[6],
          },

          "&:active": {
            transform: "translate(2px, 2px)",
            boxShadow: "2px 2px 0 #000",
          },
        },
      }),
    },

    Paper: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: "rgba(255,255,255,.6)",
          border: "3px solid #000",
          borderRadius: "4px",
          boxShadow: "5px 5px 0 #000",
        },
      }),
    },

    Title: {
      styles: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
    },

    Card: {
      styles: (theme: MantineTheme) => ({
        root: {
          border: "3px solid #000",
          borderRadius: "4px",
          boxShadow: "5px 5px 0 #000",
        },
      }),
    },

    Badge: {
      styles: (theme: MantineTheme) => ({
        root: {
          border: "2px solid #000",
          textTransform: "uppercase",
          fontWeight: 700,
        },
      }),
    },

    Table: {
      styles: (theme: MantineTheme) => ({
        table: {
          boxShadow: "3px 3px 0 #000",
          border: "1px solid black",
          borderRadius: "4px",
        },
        root: {
          borderRadius: "4px",
        },
      }),
    },

    Avatar: {
      styles: (theme: MantineTheme) => ({
        root: {
          border: "1px solid",
        },
      }),
    },

    Input: {
      styles: () => ({
                          input: { 
                            border: '2px solid #000',
                            fontWeight: 500,
                          },
                          label: { 
                            fontSize: 16, 
                            fontWeight: 700,
                            marginBottom: 5,
                          },
      })
    }
  },
});
