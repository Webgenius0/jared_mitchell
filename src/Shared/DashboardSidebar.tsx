import { LogoutSvg } from "@/Components/Svg/SvgContainer";
import { DownArrowSvg } from "@/Components/Svg/SvgContainer2";
import { useLogout } from "@/Hooks/api/auth_api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FiLogOut } from "react-icons/fi";

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
  const pathname = usePathname();
  const { mutate: handleLogout, isPending: isLoggingOut } = useLogout();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Auto-expand submenu if current path is a submenu of any nav link
  const hasActiveSubMenu = dashboardNavLinks.some(item =>
    item?.subMenu?.some(sub => sub.path === pathname)
  );
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(hasActiveSubMenu);

  const handleLogoutClick = useCallback(() => {
    setOpen(false);
    setShowConfirmModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    handleLogout();
    setShowConfirmModal(false);
  }, [handleLogout]);

  const cancelLogout = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  return (
    <>
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } fixed top-0 left-0 z-[999] 2xl:static max-2xl:h-screen w-[275px] duration-500 transition-transform shadow bg-white px-5 py-7 shrink-0 overflow-y-auto flex flex-col`}
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-medium mb-7 block">
          OSI
        </Link>

        {/* Nav Links */}
        <nav className="flex flex-col gap-4 flex-1">
          {dashboardNavLinks?.map(item => {
            const isActive = pathname === item?.path;
            const isActiveSubMenu =
              item?.id === 7 &&
              pathname?.startsWith("/dashboard/artist_business/setting/");
            const isBusinessSubPage =
              item?.id === 21 &&
              (pathname === "/dashboard/boss_beginning/create-business" ||
                pathname?.startsWith("/dashboard/boss_beginning/business/"));
            const isBossBeginningSubPage =
              item?.id === 25 &&
              pathname?.startsWith("/dashboard/boss_beginning/boss-beginning/");

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
                    isActive || isActiveSubMenu || isBusinessSubPage || isBossBeginningSubPage
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
        </nav>

        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogoutClick}
          className="px-3 py-2.5 rounded-md flex gap-2.5 items-center hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 cursor-pointer mt-auto"
        >
          <LogoutSvg />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Logout Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={cancelLogout}></div>
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            {/* Icon */}
            <div className="mx-auto size-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <FiLogOut className="text-2xl text-red-500" />
            </div>

            <h3 className="text-lg font-semibold text-center text-[#1D1D1F] mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to log out? You will need to sign in again
              to access your dashboard.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Logging out...
                  </>
                ) : (
                  "Log Out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
