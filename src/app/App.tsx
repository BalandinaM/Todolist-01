import { useMemo } from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {getTheme} from "../common/theme/theme";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectThemeMode } from "./app-selectors";
import { Header } from "@/common/components/Header/Header";
import { Main } from "./Main";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);
  
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  );
};
