import { useNavigate } from "react-router-dom";


export function navigateTo(link) {
    const nav = useNavigate();

    setTimeout(() => {
        nav(link);
    }, 1500);
};
