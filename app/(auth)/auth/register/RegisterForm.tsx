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

import {GoogleIcon, GithubIcon} from "@/app/static/static";
import Link from "next/link";

const formSchema = z.object({
    username: z.string().min(8, "Username is required"),
    firstname: z.string().min(3, "First name is required"),
    lastname: z.string().min(3, "Last name is required"),
    email: z.string().email("Email address is required"),
    password: z.string().min(6, "Password must be atleast 8 characters"),
})

const RegisterForm = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        alert(
            JSON.stringify(values)
        )
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Your unique username
                            </FormDescription>
                            <FormMessage className={"text-red-500"}/>
                        </FormItem>
                    )}
                />

                <div className={"grid grid-cols-2 gap-2"}>
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Your first name
                                </FormDescription>
                                <FormMessage className={"text-red-500"}/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Your last name
                                </FormDescription>
                                <FormMessage className={"text-red-500"}/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="John@example.com" {...field}/>
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
                            variant={"outline"}>Register</Button>
                    <Button type="submit" className={"w-full flex items-center justify-center gap-2 cursor-pointer "}
                            variant={"outline"}>
                        <Image src={GoogleIcon} alt={"google Icon"} height={20} width={20}/>
                        <span>Register With Google</span>
                    </Button>
                    <Button type="submit" className={"w-full flex items-center justify-center gap-2 cursor-pointer "}
                            variant={"outline"}>
                        <Image src={GithubIcon} alt={"github Icon"} height={20} width={20}/>
                        <span>Register With Github</span>
                    </Button>
                    <span>
                        Already have an account? <Link className={"text-emerald-500"} href="/auth/login">Login</Link>
                    </span>
                </div>

            </form>
        </Form>
    )
}
export default RegisterForm
