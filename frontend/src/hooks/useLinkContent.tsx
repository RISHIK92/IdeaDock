import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useParams } from 'react-router-dom';

// interface LinkContent {
//     link: string;
//     username: string;
//     content: string[];

//   }

// export function useLinkContent() {
//     const { shareLink } = useParams();
//     const [linkcontents, setLinkContents] = useState<LinkContent[]>([]);

//     function refresh() {
//         if (shareLink) {
//             axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
//                 .then((response) => {
//                     setLinkContents(response.data.content);
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching data:", error);
//                 });
//         }
//     }

//     useEffect(() => {
//         refresh();
//         const interval = setInterval(() => {
//             refresh();
//         }, 10000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, [shareLink]);
//     return { linkcontents, refresh };
// }

export function useLinkContent() {
    const { shareLink } = useParams();
    const [linkcontents, setLinkContents] = useState([]);

    function refresh() {
        if (shareLink) {
            axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
                .then((response) => {
                    setLinkContents(response.data.content);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }

    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        },10000)

        return () => {
            clearInterval(interval)
        }
    },[])

    return { linkcontents,refresh };
}