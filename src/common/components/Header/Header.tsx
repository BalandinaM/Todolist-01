import Button from '@mui/material/Button'
import { SwitchCustom } from "@/SwitchCustom";
import { AppBar, Toolbar, Container, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import { changeThemeModeAC } from '@/app/app-reducer';
import { selectThemeMode } from '@/app/app-selectors';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';

export const Header = () => {
const themeMode = useAppSelector(selectThemeMode)
const dispatch = useAppDispatch()
const changeMode = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }

  
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth={"lg"}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Sign in</Button>
        </Container>
        <SwitchCustom onChange={changeMode} color={"default"} />
      </Toolbar>
    </AppBar>
  );
};
