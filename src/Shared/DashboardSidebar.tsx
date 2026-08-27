import { LogoutSvg } from "@/Components/Svg/SvgContainer";
import { useLogout } from "@/Hooks/api/auth_api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FiLogOut, FiLock } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";
import logo from "../Assets/logo.jpeg";

type SubMenu = {
  label: string;
  path: string;
  disabled?: boolean;
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
  const router = useRouter();
  const { mutate: handleLogout, isPending: isLoggingOut } = useLogout();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const initialOpenIds = dashboardNavLinks
    .filter(item => item?.subMenu?.some(sub => sub.path === pathname))
    .map(item => item.id);

  const [openSubMenuIds, setOpenSubMenuIds] = useState<Set<number>>(
    () => new Set(initialOpenIds),
  );

  const toggleSubMenu = useCallback((id: number) => {
    setOpenSubMenuIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const forceOpenSubMenu = useCallback((id: number) => {
    setOpenSubMenuIds(prev => new Set(prev).add(id));
  }, []);

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
            <Link
              href="/"
              className="flex items-center cursor-pointer"
            >
              <Image
                src={logo}
                alt="OSI logo"
                className="h-24 w-auto mb-4"
                priority
              />
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

            const isSubMenuOpen = openSubMenuIds.has(item.id);
            const isItemActive =
              isActive ||
              isActiveSubMenu ||
              isBusinessSubPage ||
              isBossBeginningSubPage;
            const itemClasses = `flex justify-between items-center px-3 py-2 rounded-md duration-300 transition-all ${
              isItemActive
                ? "bg-primary-blue text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`;

            if (!item?.subMenu) {
              return (
                <Link
                  key={item?.id}
                  href={item?.path}
                  onClick={() => setOpen(false)}
                  className="duration-500 transition-all"
                >
                  <span className={itemClasses}>
                    <span className="flex gap-2.5 items-center">
                      <span>{item?.icon}</span>
                      <span>{item.label}</span>
                    </span>
                  </span>
                </Link>
              );
            }

            // ── Item WITH submenu → button toggles (avoids nested <a>) ─
            return (
              <div key={item?.id} className="duration-500 transition-all">
                <button
                  type="button"
                  aria-expanded={isSubMenuOpen}
                  onClick={() => {
                    setOpen(false);
                    toggleSubMenu(item.id);
                    // Preserve the old behavior: the parent row also navigates
                    // to its own page when clicked.
                    if (item?.path) router.push(item.path);
                  }}
                  className={`${itemClasses} w-full cursor-pointer text-left`}
                >
                  <span className="flex gap-2.5 items-center">
                    <span>{item?.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <span
                    className={`duration-300 transition-transform ${isSubMenuOpen ? "rotate-0" : "rotate-180"}`}
                  >
                    <FaAngleDown className="text-sm" />
                  </span>
                </button>

                <div
                  onClick={e => {
                    e.stopPropagation();
                    forceOpenSubMenu(item.id);
                  }}
                  className={`w-fit ps-5 text-[15px] duration-300 transition-all space-y-1 pt-2 ${isSubMenuOpen ? "opacity-100 h-auto" : "opacity-0 h-0"}`}
                >
                  {item?.subMenu?.map(subItem =>
                    subItem?.disabled ? (
                      <span
                        key={subItem?.path}
                        title="Locked — this round hasn't opened yet"
                        className="flex items-center justify-between gap-2 text-gray-300 w-full cursor-not-allowed select-none"
                      >
                        <span>{subItem?.label}</span>
                        <FiLock className="text-xs" />
                      </span>
                    ) : (
                      <Link
                        key={subItem?.path}
                        href={subItem?.path}
                        onClick={() => setOpen(false)}
                        className={`${pathname === subItem?.path ? "text-gray-900" : "text-gray-500"} block w-full hover:text-gray-800`}
                      >
                        {subItem?.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
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
