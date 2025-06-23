import { cn } from "~/lib/utils";
import {JSX} from "solid-js"

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  validate?: string
  noErrorEmit?: boolean
  errorClass?: string
}
const Input = (props:InputProps) => {

  const ec = props.errorClass ? {'data-errorclass': props.errorClass} : {}
  const v = props.validate ? {'data-validate': props.validate} : {}

  return (
    <>
      <input {...props} {...ec} {...v} class={cn("p-2 w-full border-1 border-zinc-300 rounded-md bg-transparent min-h-10 " + props.class)}/>
      {props.validate && !props.noErrorEmit && <div class="validation-error text-red-500 text-sm pr-2 mt-1"></div>}
    </>
  );
};

export default Input;

