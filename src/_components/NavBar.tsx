'use client'

import { useParams, usePathname } from "next/navigation";

import { SearchBox } from "./SearchBox"
import { useEffect } from "react";

export const NavBar = () => {
    const pathname = usePathname();
    const { title }: {title: string} = useParams();

    useEffect(() => {
        console.log();
        if (pathname === '/') {
            document.title = 'Home | Recipes';
        } else if (pathname === '/create') {
            document.title = 'Create Recipe'
        } else {
            document.title = 'Recipe | ' + title.replace('%20', ' ');
        }
    }, [pathname]);

    return (
        <nav>
            {
                pathname === "/"
                && <SearchBox />
            }
        </nav>
    )
}