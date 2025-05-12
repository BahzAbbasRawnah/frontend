
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Users,
  FileText,
  ShieldCheck,
  Newspaper,
  Building,
  Contact,
  Info,
  ChevronDown,
  CodeXml,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient'; // Client component, use client dictionary
import { useState } from 'react';

interface DashboardSidebarProps {
  lang: Locale;
  dictionary: Pick<Dictionary,
    'dashboardNavOverview' |
    'dashboardNavProjects' |
    'dashboardNavServices' |
    'dashboardNavUsers' |
    'dashboardNavTeam' |
    'dashboardNavCMS' |
    'dashboardNavCMSContact' |
    'dashboardNavCMSAbout' |
    'dashboardNavSettings' |
    'siteName'
  >;
}

export default function DashboardSidebar({ lang, dictionary }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { state, setOpen, isMobile } = useSidebar(); 
  const [cmsOpen, setCmsOpen] = useState(false);

  const localizedPath = (path: string) => `/${lang}${path}`;

  const navItems = [
    { href: '/dashboard', labelKey: 'dashboardNavOverview', icon: LayoutDashboard },
    { href: '/dashboard/projects', labelKey: 'dashboardNavProjects', icon: Briefcase },
    { href: '/dashboard/services', labelKey: 'dashboardNavServices', icon: ShieldCheck },
    { href: '/dashboard/users', labelKey: 'dashboardNavUsers', icon: Users },
    { href: '/dashboard/team', labelKey: 'dashboardNavTeam', icon: Building },
    {
      labelKey: 'dashboardNavCMS',
      icon: Newspaper,
      isGroup: true,
      subItems: [
        { href: '/dashboard/cms/contact', labelKey: 'dashboardNavCMSContact', icon: Contact },
        { href: '/dashboard/cms/about', labelKey: 'dashboardNavCMSAbout', icon: Info },
      ],
    },
    { href: '/dashboard/settings', labelKey: 'dashboardNavSettings', icon: Settings },
  ];

  const isLinkActive = (href: string) => {
    const localizedItemHref = localizedPath(href);
    return pathname === localizedItemHref || pathname.startsWith(`${localizedItemHref}/`);
  };
  

  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} side={lang === 'ar' ? 'right' : 'left'} className="border-border">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href={localizedPath('/')} className="flex items-center gap-2" onClick={() => isMobile && setOpen(false)}>
          <CodeXml className="h-7 w-7 text-primary" />
          {state === 'expanded' && <span className="text-xl font-bold text-primary">{dictionary.siteName}</span>}
        </Link>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) =>
              item.isGroup ? (
                <SidebarGroup key={item.labelKey}>
                  <SidebarMenuButton
                    onClick={() => setCmsOpen(!cmsOpen)}
                    className={cn("w-full justify-between", lang === 'ar' ? "text-right" : "text-left")}
                    isActive={item.subItems?.some(sub => isLinkActive(sub.href))}
                    tooltip={state === 'collapsed' ? dictionary[item.labelKey as keyof typeof dictionary] : undefined}
                  >
                    <div className={cn("flex items-center gap-2", lang === 'ar' && "flex-row-reverse")}>
                      <item.icon className="h-5 w-5" />
                      {state === 'expanded' && dictionary[item.labelKey as keyof typeof dictionary]}
                    </div>
                    {state === 'expanded' && <ChevronDown className={cn("h-4 w-4 transition-transform", cmsOpen && "rotate-180")} />}
                  </SidebarMenuButton>
                  {cmsOpen && state === 'expanded' && (
                    <SidebarMenuSub>
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuItem key={subItem.href} >
                          <SidebarMenuSubButton
                            asChild
                            isActive={isLinkActive(subItem.href)}
                            onClick={() => isMobile && setOpen(false)}
                            className={cn(lang === 'ar' ? "text-right" : "text-left")}
                          >
                            <Link href={localizedPath(subItem.href)} className={cn("flex items-center w-full gap-2", lang === 'ar' ? "flex-row-reverse" : "")}>
                              <subItem.icon className="h-4 w-4" />
                              {dictionary[subItem.labelKey as keyof typeof dictionary]}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarGroup>
              ) : (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isLinkActive(item.href!)}
                    tooltip={state === 'collapsed' ? dictionary[item.labelKey as keyof typeof dictionary] : undefined}
                    onClick={() => isMobile && setOpen(false)}
                    className={cn(lang === 'ar' ? "text-right" : "text-left")}
                  >
                    <Link href={localizedPath(item.href!)} className={cn("flex items-center w-full gap-2", lang === 'ar' ? "flex-row-reverse" : "")}>
                      <item.icon className="h-5 w-5" />
                      {state === 'expanded' && dictionary[item.labelKey as keyof typeof dictionary]}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
