import { LogoutSvg } from "@/Components/Svg/SvgContainer";
import { DownArrowSvg } from "@/Components/Svg/SvgContainer2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type SubMenu = {
  label: string;
  path: string;
};

type NavLinsProps = {
  id: number;
  label: string;
  path: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  subMenu?: SubMenu[];
};

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardNavLinks: NavLinsProps[];
};

const DashboardSidebar = ({
  open,
  setOpen,
  dashboardNavLinks,
}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      } fixed top-0 left-0 z-[999] 2xl:static max-2xl:h-screen w-[275px] duration-500 transition-transform shadow bg-white px-5 py-7 shrink-0 overflow-y-auto`}
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-medium mb-7 block">
        OSI
      </Link>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        {dashboardNavLinks?.map(item => {
          const isActive = pathname === item?.path;
          const isActiveSubMenu =
            item?.id === 7 &&
            pathname?.startsWith("/dashboard/artist_business/setting/");
          const isBusinessSubPage =
            item?.id === 21 &&
            (pathname === "/dashboard/boss_beginning/create-business" ||
              pathname?.startsWith("/dashboard/boss_beginning/business/"));

          return (
            <Link
              key={item?.id}
              href={item?.path}
              onClick={() => {
                setOpen(false);
                item?.subMenu && setOpenSubMenu(!openSubMenu);
              }}
              className="duration-500 transition-all"
            >
              <p
                className={`flex justify-between items-center px-3 py-2 rounded-md duration-300 transition-all ${
                  isActive || isActiveSubMenu || isBusinessSubPage
                    ? "bg-primary-blue text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="flex gap-2.5 items-center">
                  <span>{item?.icon}</span>
                  <span>{item.label}</span>
                </p>
                {item?.subMenu && (
                  <p
                    className={`duration-300 transition-transform ${openSubMenu ? "rotate-0" : "rotate-180"}`}
                  >
                    <DownArrowSvg />
                  </p>
                )}
              </p>

              {item?.subMenu && (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    setOpenSubMenu(true);
                  }}
                  className={`w-fit mx-auto text-[15px] duration-300 transition-all space-y-1 pt-2 ${openSubMenu ? "opacity-100 h-auto" : "opacity-0 h-0"}`}
                >
                  {item?.subMenu?.map(subItem => (
                    <Link
                      key={subItem?.path}
                      href={subItem?.path}
                      className={`${pathname === subItem?.path ? "text-gray-900" : "text-gray-500"} block w-full hover:text-gray-800`}
                    >
                      {subItem?.label}
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          );
        })}

        {/* <button
          className={`px-3 py-2 rounded-md flex gap-2.5 items-center hover:bg-gray-100 text-gray-700`}
        >
          <LogoutSvg />
          <span>Log Out</span>
        </button> */}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
