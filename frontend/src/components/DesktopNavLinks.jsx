import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function DesktopNavLinks({ pages })
{
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyItems: "center",
                height: "45px",
                width: "300px",
                justifyContent: "center",
                userSelect: "none",
                display: { xs: "none", md: "flex" }
            }}
        >
            {pages.map((page) => (
                <Box
                    key={page.label}
                    sx={{
                        height: "25px",
                        width: "90px",
                        margin: "5px",
                        borderRadius: "20px",
                        border: "black 2px solid"
                    }}
                >
                    <NavLink to={page.link}>
                        {page.label}
                    </NavLink>
                </Box>
            ))}
        </Box>
    );
}

export default DesktopNavLinks;