import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

export interface CardProps {
    text?: string;
    link: string;
    type?: "twitter" | "youtube";
    deleteContent?: () => void;
}

export function Card(props: CardProps) {
    return (
        <div>
            <div className="p-4 bg-white rounded-md border-gray-200 w-96 border h-96">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="text-gray-500 mr-2 rounded cursor-pointer hover:bg-gray-200 duration-500">
                            {props.type === "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
                        </div>
                        {props.text}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 mr-2 rounded cursor-pointer hover:bg-gray-200 duration-500">
                            <a href={props.link} target="_blank" rel="noopener noreferrer">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500 rounded cursor-pointer hover:bg-gray-200 duration-500" onClick={props.deleteContent}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    {props.type === "youtube" && (
                        <iframe
                            className="w-full rounded-lg h-64"
                            src={props.link.replace("watch", "embed").replace("?v=", "/")}
                            title="Youtube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {props.type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={props.link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
