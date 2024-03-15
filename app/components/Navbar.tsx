import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar(){
    return(
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
        <Link href="/" className='font-bold text-3xl'>
            Getpro<span className="text-primary">Interior</span>
        </Link>
        <ModeToggle/>
    </nav>
    );
}
