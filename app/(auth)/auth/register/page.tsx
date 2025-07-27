import Image from "next/image"
import {AuthImage, AuthNature, AuthRegister, AuthSideImage, FoxIcon} from "@/app/static/static";
import RegisterForm from "@/app/(auth)/auth/register/RegisterForm";

const Register = () => {
    return (
        <section className={"auth-page overflow-hidden"}>
            {/*Left Side*/}
            <div className={"flex-1 rounded-tl-2xl rounded-bl-2xl hidden md:flex items-center justify-center"}>
                <Image
                    src={AuthRegister}
                    alt={"Auth Side Image"}
                    className={"h-full w-full object-cover rounded-tl-2xl rounded-bl-2xl"}
                />
            </div>

            {/*Right Side*/}
            <div
                className={"flex-1 rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center gap-8 bg-[#fffbeb]"}>
                <h2 className="text-4xl font-bold !important fancy">
                    Registration Form
                </h2>

                <div className={"absolute top-[5%] right-[5%] flex items-center gap-2"}>
                    <Image src={FoxIcon} alt={"Fox Icon"} className={"h-16 w-16 "}/>
                    <span
                        className={"fancy text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"}>
                        SB
                    </span>
                </div>

                <RegisterForm/>
            </div>
        </section>
    )
}
export default Register
