import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType] = useState(ContentType.Youtube);

    async function addContent() {
        const text = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        try{
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                text,
                type
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            onClose()
        } catch(error) {
                alert("Incorrect details")
            }
        }

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-200 bg-opacity-60 fixed top-0 left-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CloseIcon />
                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Title"} reference={titleRef}/>
                            <Input placeholder={"Link"} reference={linkRef}/>
                        </div>
                        <div className="flex justify-center m-4">
                            <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube);
                            }} size="md"></Button>
                            <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter);
                            }} size="md"></Button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button variant="primary" text="Submit" size="md" onClick={addContent}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}