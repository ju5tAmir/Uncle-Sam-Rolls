import DropdownMenu from "./DropdownMenu.tsx";
import ShoppingCardIcon from "./ShoppingCardIcon.tsx";

const Navbar = () => {

    const menuItems = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Papers",
            path: "/papers"
        },
        {
            title: "Orders",
            path: "/orders"
        },
        {
            title: "Access",
            path: "/access"
        }
    ]

    return (
        <>
            <div className="flex justify-between m-10 place-items-center">
                {/* Logo */}
                <div className="text-gray-500 hover:text-gray-950">
                    <a href="/">
                        <span className="font-bold text-2xl text-slate-900">Uncle</span>
                        <span className="text-2xl text-slate-500">Sam</span>
                    </a>
                </div>

                {/* Middle items */}
                <div className="flex w-auto text-lg">
                    {
                        menuItems.map((item) => (
                            <>
                                <ul className="px-6 text-gray-500 hover:text-gray-950">
                                    <li>
                                        <a href={item.path}>{item.title}</a>
                                    </li>
                                </ul>
                            </>
                        ))
                    }
                </div>

                <div
                className="flex flex-row items-center h-8 gap-5">
                    <ShoppingCardIcon/>
                    <DropdownMenu/>
                </div>
                {/* Dropdown menu */}
            </div>
        </>
    )
}

export default Navbar;