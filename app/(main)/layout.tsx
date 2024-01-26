import NavSidebar from "@/components/navigation/nav-sidebar";

const MainLayout = async (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="h-full flex">
            <div className="hidden md:flex w-[75px] h-full">
                <NavSidebar/>
            </div>
            <div className="h-full flex-1">
                {children}
            </div>
        </div>
    )
}

export default MainLayout;