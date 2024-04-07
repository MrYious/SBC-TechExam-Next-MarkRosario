import { useLocation, useParams } from "react-router-dom"

import { SearchBox } from "./SearchBox"
import { useEffect } from "react";

export const NavBar = () => {
    const location = useLocation();
    const { title } = useParams();

    useEffect(() => {
        console.log();
        if (location.pathname === '/') {
            document.title = 'Home | Recipes';
        } else if (location.pathname === '/create') {
            document.title = 'Create Recipe'
        } else {
            document.title = 'Recipe | ' + title;
        }
    }, [location]);

    return (
        <nav>
            {
                location.pathname === "/"
                && <SearchBox />
            }
        </nav>
    )
}