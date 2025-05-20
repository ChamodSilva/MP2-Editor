import { Typography } from '@mui/material';

function AppTitle({ isMobile = false })
{
    return (
        <Typography
            variant={isMobile ? "h5" : "h6"}
            noWrap
            component="a"
            sx={{
                mr: 2,
                userSelect: "none",
                display: { xs: isMobile ? "flex" : "none", md: isMobile ? "none" : "flex" },
                flexGrow: isMobile ? 1 : 0,
                fontFamily: "Lucida Sans",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",

                ...(!isMobile &&
                {
                    alignItems: "center",
                    justifyItems: "start",
                    height: "45px",
                    width: "300px",
                })
            }}
        >
            MP2-Editor
        </Typography>
    );
}

export default AppTitle;