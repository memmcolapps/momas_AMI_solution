"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./ui/sidebar";
import { Activity, ChevronDown, CircleGauge, Cylinder, UsersRound, LayoutDashboard,Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
// import { useAuth } from "@/context/auth-context"; 

interface NavItemProps {
    title: string;
    href: string;
    icon: LucideIcon;
    isActive?: boolean;
    hasSubmenu?: boolean;
    submenuItems?: SubMenuItemProps[];
}

interface SubMenuItemProps {
    title: string;
    href: string;
    hasSubmenu?: boolean;
    submenuItems?: { title: string; href: string }[];
}

const navItems: NavItemProps[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        hasSubmenu: false,
    },
      {
        title: "Organization Hierarchy",
        href: "/organization-hierarchy",
        icon: Building2,
        hasSubmenu: false,
    },
    {
        title: "Meter Management",
        href: "/meter-management",
        icon: CircleGauge,
        hasSubmenu: false,
    },
    {
        title: "Hes",
        href: "/hes",
        icon: Cylinder,
        hasSubmenu: true,
        submenuItems: [
            { title: "Profile and Events", href: "/hes/profile-events" },
            { title: "Communication Report", href: "/hes/communication-report" },
            {
                title: "Realtime Data",
                href: "/hes/realtime-data",
            },
            {
                title: "Controls and Configuration",
                href: "/hes/controls-configuration",
                hasSubmenu: true,
                submenuItems: [
                    {
                        title: "Data Collection Scheduler",
                        href: "/hes/data-collection-scheduler",
                    },
                    {
                        title: "Meter Remote Configuration",
                        href: "/hes/meter-remote-config",
                    },
                ],
            },
        ],
    },
    { title: "Admin Management", href: "/admin-management", icon: UsersRound, hasSubmenu: false },
    { title: "Audit Log", href: "/audit-log", icon: Activity, hasSubmenu: false },
];

const hardcodedUser = {
    groups: {
        groupTitle: "Admin",
        modules: [
            {
                name: "Dashboard",
                access: true,
                subModules: [],
            },
            {
                name: "Organization Hierarchy",
                access: true,
                subModules: [],
            },
            { name: "Meter Management", access: true, subModules: [] },
            {
                name: "HES",
                access: true,
                subModules: [
                    { name: "Profile and Events", access: true },
                    { name: "Communication Report", access: true },
                    { name: "Controls and Configuration", access: true },
                ],
            },
      { name: "HES", access: true, subModules: [] },
            { name: "Admin Management", access: true, subModules: [] },
            { name: "Audit Log", access: true, subModules: [] },
        ],
    },
};

export function SidebarNav() {
    const pathname = usePathname();
    // const { user } = useAuth(); 
    const user = hardcodedUser;

    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const normalizeModuleName = (name: string): string => {
        return name.toLowerCase().replace(/\s+/g, "");
    };

    const isItemActive = (href: string, subItems?: SubMenuItemProps[]) => {
        if (pathname === href) return true;
        if (subItems) {
            return subItems.some(
                (subItem) =>
                    pathname === subItem.href ||
                    subItem.submenuItems?.some((nestedItem) => pathname === nestedItem.href)
            );
        }
        return false;
    };

    const toggleExpanded = (title: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const filteredNavItems = useMemo(() => {
        if (!user) return [];

        if (user.groups?.groupTitle?.toLowerCase() === "super admin") {
            return navItems;
        }

        const hasModuleAccess = (moduleName: string): boolean => {
            if (!user?.groups?.modules) return false;
            const normalizedModuleName = normalizeModuleName(moduleName);
            if (normalizedModuleName === "auditlog") return true;

            return user.groups.modules.some((module) => {
                const normalizedApiModuleName = normalizeModuleName(module.name);
                return normalizedApiModuleName === normalizedModuleName && module.access;
            });
        };

        const hasSubModuleAccess = (parentModuleName: string, subModuleName: string): boolean => {
            if (!user?.groups?.modules) return false;

            const normalizedParentModuleName = normalizeModuleName(parentModuleName);
            const normalizedSubModuleName = normalizeModuleName(subModuleName);

            const parentModule = user.groups.modules.find(
                (module) =>
                    normalizeModuleName(module.name) === normalizedParentModuleName && module.access
            );

            if (!parentModule) return false;

            return parentModule.subModules.some(
                (subModule) =>
                    normalizeModuleName(subModule.name) === normalizedSubModuleName && subModule.access
            );
        };

        return navItems
            .filter((item) => {
                if (item.title === "Audit Log") return true;
                return hasModuleAccess(item.title);
            })
            .map((item) => {
                // For Data Management, filter submenu items based on submodule access
                if (item.title === "Data Management" && item.submenuItems) {
                    return {
                        ...item,
                        submenuItems: item.submenuItems.filter((subItem) => {
                            return hasSubModuleAccess("Data Management", subItem.title);
                        }),
                    };
                }
                return item;
            });
    }, [user]);

    return (
        <Sidebar className="fixed top-0 left-0 z-40 hidden h-screen w-80 overflow-y-auto border-r border-gray-200 md:block">
            <SidebarHeader className="flex items-center justify-center py-4">
                <Link href="/" className="flex items-center">
                    <div className="flex flex-col items-center justify-center leading-3">
                        <span className="text-[#161CCA] font-medium text-4xl tracking-[6px]">AMI</span>
                        <span className="text-[#EBA13E] font-normal">Solution</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent className="flex h-full flex-col">
                <SidebarMenu className="px-4 py-5">
                    {filteredNavItems
                        .filter((item) => !["Change Log", "About Us"].includes(item.title))
                        .map((item) => {
                            const isActive = isItemActive(item.href, item.submenuItems);
                            const isExpanded = expandedItems[item.title] ?? isActive;

                            if (!item.hasSubmenu) {
                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className={cn(
                                            "px-2.5 py-5 text-xl",
                                            isActive
                                                ? "rounded-md bg-[#161CCA] text-white"
                                                : "rounded-md hover:bg-gray-100",
                                        )}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 text-lg leading-tight"
                                        >
                                            <item.icon
                                                size={12}
                                                className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                                            />
                                            <span className="wrap-break-word">{item.title}</span>
                                        </Link>
                                    </SidebarMenuItem>
                                );
                            }

                            return (
                                <Collapsible
                                    key={item.title}
                                    open={isExpanded}
                                    onOpenChange={() => toggleExpanded(item.title)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                className={cn(
                                                    "flex min-h-fit w-full items-center justify-between py-6 text-base leading-tight sm:text-lg",
                                                    isActive && "bg-gray-100",
                                                )}
                                            >
                                                <div className="flex items-center gap-3 text-lg leading-tight">
                                                    <item.icon
                                                        size={14}
                                                        className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                                                    />
                                                    <span className="wrap-break-word">{item.title}</span>
                                                </div>
                                                {item.hasSubmenu && (
                                                    <ChevronDown
                                                        className={cn(
                                                            "h-4 w-4 transition-transform duration-200",
                                                            isExpanded ? "rotate-0" : "-rotate-90",
                                                        )}
                                                        size={12}
                                                    />
                                                )}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        {item.hasSubmenu && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub className="mt-1 space-y-1">
                                                    {item.submenuItems?.map((subItem) => {
                                                        const isSubActive = isItemActive(
                                                            subItem.href,
                                                            subItem.submenuItems,
                                                        );
                                                        const isSubExpanded =
                                                            expandedItems[subItem.title] ?? isSubActive;

                                                        return (
                                                            <div key={subItem.title} className="pl-4 sm:pl-6">
                                                                {subItem.hasSubmenu ? (
                                                                    <Collapsible
                                                                        open={isSubExpanded}
                                                                        onOpenChange={() =>
                                                                            toggleExpanded(subItem.title)
                                                                        }
                                                                    >
                                                                        <SidebarMenuItem>
                                                                            <CollapsibleTrigger asChild>
                                                                                <SidebarMenuButton
                                                                                    className={cn(
                                                                                        "flex min-h-fit w-full items-center justify-between px-2.5 py-6 text-lg leading-tight sm:text-base",
                                                                                        isSubActive &&
                                                                                        "bg-gray-100 font-medium",
                                                                                    )}
                                                                                >
                                                                                    <span className="wrap-break-word">
                                                                                        {subItem.title}
                                                                                    </span>
                                                                                    <ChevronDown
                                                                                        className={cn(
                                                                                            "h-4 w-4 transition-transform duration-200",
                                                                                            isSubExpanded
                                                                                                ? "rotate-0"
                                                                                                : "-rotate-90",
                                                                                        )}
                                                                                        size={12}
                                                                                    />
                                                                                </SidebarMenuButton>
                                                                            </CollapsibleTrigger>
                                                                            <CollapsibleContent>
                                                                                <SidebarMenuSub className="mt-1 px-1">
                                                                                    {subItem.submenuItems?.map(
                                                                                        (nestedItem) => (
                                                                                            <SidebarMenuItem
                                                                                                key={nestedItem.title}
                                                                                                className={cn(
                                                                                                    "p-2.5 text-lg leading-tight sm:text-base",
                                                                                                    pathname === nestedItem.href
                                                                                                        ? "rounded-md bg-[#161CCA] text-white"
                                                                                                        : "rounded-md hover:bg-gray-100",
                                                                                                )}
                                                                                            >
                                                                                                <Link
                                                                                                    href={nestedItem.href}
                                                                                                    className="flex w-full items-center"
                                                                                                >
                                                                                                    <span className="wrap-break-word">
                                                                                                        {nestedItem.title}
                                                                                                    </span>
                                                                                                </Link>
                                                                                            </SidebarMenuItem>
                                                                                        ),
                                                                                    )}
                                                                                </SidebarMenuSub>
                                                                            </CollapsibleContent>
                                                                        </SidebarMenuItem>
                                                                    </Collapsible>
                                                                ) : (
                                                                    <SidebarMenuItem
                                                                        className={cn(
                                                                            "p-2.5 text-lg leading-tight sm:text-base",
                                                                            pathname === subItem.href
                                                                                ? "rounded-md bg-[#161CCA] text-white"
                                                                                : "rounded-md hover:bg-gray-100",
                                                                        )}
                                                                    >
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className="flex w-full items-center"
                                                                        >
                                                                            <span className="wrap-break-word">
                                                                                {subItem.title}
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuItem>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        })}
                </SidebarMenu>

                <div className="mt-auto px-6 py-5">
                    <SidebarMenu>
                        {filteredNavItems
                            .filter((item) => ["Change Log", "About Us"].includes(item.title))
                            .map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className={cn(
                                        "p-2.5 text-lg leading-tight",
                                        pathname === item.href
                                            ? "rounded-md bg-[#161CCA] text-white"
                                            : "rounded-md hover:bg-gray-100",
                                    )}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 text-lg leading-tight"
                                    >
                                        <item.icon
                                            size={12}
                                            className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                                        />
                                        <span className="wrap-break-word">{item.title}</span>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}