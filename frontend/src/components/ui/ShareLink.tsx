import { useLinkContent } from "../../hooks/useLinkContent";
import { Card } from "./Card";

export const ShareLink = () => {
    const { linkcontents } = useLinkContent();


    return (
        <div className='pl-2 pt-8 flex justify-around flex-wrap'>
            {linkcontents.length === 0 ? (<p>No Content Available</p>) :
            (linkcontents.map(({type, link, text}) => <Card 
                text={text}
                link={link}
                type={type || 'youtube'}
            />))}
        </div>
    );
}
