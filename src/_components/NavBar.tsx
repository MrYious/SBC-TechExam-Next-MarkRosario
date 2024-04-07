'use client'

import { useParams, usePathname } from "next/navigation";

import { SearchBox } from "./SearchBox"
import { useEffect } from "react";

export const NavBar = () => {
    const pathname = usePathname();
    const { title } = useParams();

    useEffect(() => {
        console.log();
        if (pathname === '/') {
            document.title = 'Home | Recipes';
        } else if (pathname === '/create') {
            document.title = 'Create Recipe'
        } else {
            document.title = 'Recipe | ' + title;
        }
    }, [pathname]);

    return (
        <nav>
            {
                location.pathname === "/"
                && <SearchBox />
            }
        </nav>
    )
}