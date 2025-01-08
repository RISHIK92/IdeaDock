// import { HomeIcon } from "../../icons/HomeIcon";
// import { TwitterIcon } from "../../icons/TwitterIcon";
// import { YoutubeIcon } from "../../icons/YoutubeIcon";
// import { SideBarItem } from "./SideBarItem";

// export function Sidebar() {
//     return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
//         <div className="flex text-2xl pt-4">
//             Brainly
//         </div>
//         <div className="pt-8">
//             <SideBarItem text="All" icon={<HomeIcon />}/>
//             <SideBarItem text="Tweets" icon={<TwitterIcon />}/>
//             <SideBarItem text="Videos" icon={<YoutubeIcon />}/>
//         </div>
//     </div>
// }
import { useState } from "react";
import { HomeIcon } from "../../icons/HomeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function Sidebar({ setFilter }: { setFilter: (filter: string) => void }) {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-4">Brainly</div>
            <div className="pt-8">
                <SideBarItem text="All" icon={<HomeIcon />} onClick={() => setFilter("all")} />
                <SideBarItem text="Tweets" icon={<TwitterIcon />} onClick={() => setFilter("tweets")} />
                <SideBarItem text="Videos" icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
            </div>
        </div>
    );
}
