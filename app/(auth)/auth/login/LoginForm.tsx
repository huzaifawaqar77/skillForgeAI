"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod';

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import Image from "next/image";
import Link from "next/link";

// Import the Cookie so that we can set a cookie when we LOGIN successfully
import Cookies from 'js-cookie';
import api from "../../../../services/api";

import {useRouter} from "next/navigation"

import {GoogleIcon, GithubIcon} from "@/app/static/static";

const formSchema = z.object({
    email: z.string().email("Email address is required"),
    password: z.string().min(6, "Password must be atleast 8 characters"),
})

const LoginForm = () => {

    const navigate = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const response = await api.post("/auth/login", {
            email: values.email,
            password: values.password,
        })

        // Store the jwt Token in the Cookies for the middleware to function correctly
        Cookies.set("token", response.data.token);

        // navigate the user to the dashboard page
        navigate.push("/dashboard");
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="John@example.com" {...field} className={"min-w-[400px]"}/>
                            </FormControl>
                            <FormDescription>
                                Your email address goes here.
                            </FormDescription>
                            <FormMessage className={"text-red-500"}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your password here.
                            </FormDescription>
                            <FormMessage className={"text-red-500"}/>
                        </FormItem>
                    )}
                />
                <div className={"flex flex-col items-center w-full gap-2"}>
                    <Button type="submit"
                            className={"w-full text-white cursor-pointer bg-[#ff715e] hover:bg-orange-700 transition-all"}
                            variant={"outline"}>Login</Button>
                    <Button type="submit" className={"w-full flex items-center justify-center gap-2 cursor-pointer "}
                            variant={"outline"}>
                        <Image src={GoogleIcon} alt={"google Icon"} height={20} width={20}/>
                        <span>Login With Google</span>
                    </Button>
                    <Button type="submit" className={"w-full flex items-center justify-center gap-2 cursor-pointer "}
                            variant={"outline"}>
                        <Image src={GithubIcon} alt={"github Icon"} height={20} width={20}/>
                        <span>Login With Github</span>
                    </Button>
                    <span>
                        New User? <Link href="/auth/register" className={"text-emerald-500"}>Create an account</Link>
                    </span>
                </div>

            </form>
        </Form>
    )
}
export default LoginForm
