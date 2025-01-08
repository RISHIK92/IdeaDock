import { ReactElement } from "react";

export function SideBarItem({text, icon,onClick}: {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded duration-500" onClick={onClick}>
        <div className="p-2">
            {icon}
        </div> 
        <div className="p-2">
            {text}
        </div>
    </div>
}