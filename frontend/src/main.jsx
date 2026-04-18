import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";
// const styles = {
//   global: (props) => ({
//     body: {
//       color: mode("gray.800", "whiteAlpha.900")(props),
//       bg: mode("gray.100", "#101010")(props),
//     },
//   }),
// };

// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: "true",
// };

// const colors = {
//   gray: {
//     light: "#616161",
//     dark: "#1e1e1e",
//   },
// };

// const theme = extendTheme({ config, styles, colors });


//Upgraded
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false, // fix: should be boolean not string
};

const styles = {
  global: {
    body: {
      bgGradient: "linear(to-br, #0f172a, #020617)",
      color: "white",
    },
  },
};

const colors = {
  brand: {
    400: "#22c55e",
    500: "#16a34a",
  },
};

const components = {
  Input: {
    baseStyle: {
      field: {
        bg: "gray.800",
        border: "none",
        color: "white",
        _focus: {
          border: "1px solid",
          borderColor: "brand.400",
          boxShadow: "0 0 0 1px #22c55e",
        },
      },
    },
  },

  Button: {
    variants: {
      primary: {
        bgGradient: "linear(to-r, brand.400, green.300)",
        color: "black",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(34,197,94,0.4)",
        },
      },
      secondary: {
        border: "1px solid",
        borderColor: "gray.500",
        color: "gray.300",
        _hover: {
          bg: "gray.700",
        },
      },
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,
  components,
});


ReactDOM.createRoot(document.getElementById("root")).render(
  // React.strict mode renders every react component twice  in development mode and renders once in production or normal mode.
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
