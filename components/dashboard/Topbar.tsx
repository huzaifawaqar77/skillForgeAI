import {User} from "lucide-react";

const Topbar = () => {
    return (
        <div className={"h-[80px] p-2 flex items-center justify-end"}>
            <div className="rounded-full border-3 border-zinc-900 p-2">
                <User className={"h-6 w-6"}/>
            </div>

        </div>
    )
}
export default Topbar
