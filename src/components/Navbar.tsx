import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#8B0000' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>MDB Watchdog</Typography>
                <Button color="inherit" component={Link} href="/">Home</Button>
                <Button color="inherit" component={Link} href="/about">About</Button>
                <Button color="inherit" component={Link} href="/energy">Energy</Button>
                <Button color="inherit" component={Link} href="/water">Water</Button>
                <Button color="inherit" component={Link} href="/agriculture">Agriculture</Button>
                <Button color="inherit" component={Link} href="/resources">Resources</Button>
            </Toolbar>
        </AppBar>
    );
}
