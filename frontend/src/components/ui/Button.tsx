import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 px-2 rounded-sm",
    "md": "py-2 px-4 rounded-md",
    "lg": "py-4 px-6 rounded-lg"
}

// const defaultStyles = "rounded-md"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full flex justify-center items-center": null} disabled=${props.loading} font-light`}> <div className="flex"> {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon ? <div className="pl-2">{props.endIcon}</div>: null} </div></button>
}

{/* <Button variant="primary" size="md" onClick={() => {}} text="" startIcon={""}/> */}