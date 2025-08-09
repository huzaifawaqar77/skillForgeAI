import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <main className={"h-screen w-full grid grid-cols-12"}>
            <div className={"col-span-2"}>
                <Sidebar/>
            </div>
            <div className="col-span-10 flex flex-col">
                <Topbar/>
                <section className={"p-5"}>
                    {children}
                </section>
            </div>
        </main>
        </body>
        </html>
    );
}
