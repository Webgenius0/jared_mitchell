import { LogoutSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SubMenu = {
  label: string;
  path: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
};

type NavLinsProps = {
  id: number;
  label: string;
  path: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  subMenus?: SubMenu[];
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

  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      } fixed top-0 left-0 z-[999] 2xl:static max-2xl:h-screen w-[275px] duration-500 transition-transform shadow bg-white px-5 py-7 shrink-0 overflow-y-auto`}
    >
      {/* Logo */}
      <p onClick={() => router.push("/")} className="text-2xl font-medium mb-7">
        OSI
      </p>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        {dashboardNavLinks?.map(item => {
          const isActive = pathname === item?.path;

          return (
            <Link
              key={item?.id}
              href={item?.path}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md flex gap-2.5 items-center duration-300 transition-all ${
                isActive
                  ? "bg-primary-blue text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span>{item?.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          className={`px-3 py-2 rounded-md flex gap-2.5 items-center hover:bg-gray-100 text-gray-700`}
        >
          <LogoutSvg />
          <span>Log Out</span>
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
