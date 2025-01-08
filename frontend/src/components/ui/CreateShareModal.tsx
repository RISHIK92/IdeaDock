import axios from "axios";
import { CloseIcon } from "../../icons/CloseIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import { useState } from "react";

export function CreateShareModal({open, onClose}) {
    const [copyStatus,setCopyStatus] = useState("Copy")
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
                        <div className="flex m-6">
                            <Button variant="primary" text={copyStatus} endIcon={<CopyIcon />} size="md" onClick={async () => {
                                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                                    share: true
                                }, {
                                    headers: {
                                        "token": localStorage.getItem("token")
                                    }
                                });
                                setCopyStatus("Copied");
                                setTimeout(() => {
                                    setCopyStatus("Copy")
                                },2000)
                                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                                await navigator.clipboard.writeText(shareUrl);
                            }}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}