import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/energy'>Energy</Link></li>
                <li><Link href='/water'>Water</Link></li>
                <li><Link href='/agriculture'>Agriculture</Link></li>
                <li><Link href='/resources'>Resources</Link></li>
            </ul>
        </nav>
    );
}
