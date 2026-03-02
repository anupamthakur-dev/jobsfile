import type { jobRoute, SideNavMenu } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { isSideNavJobRouteArray, isSideNavMenuArray } from "@/utils/helper";
import { NavLink } from "react-router";
import Icon from "./Icon";

type CollapsibleInput = SideNavMenu | jobRoute;

export default function CollapsibleItems({ nav }: { nav: CollapsibleInput }) {
  return (
    <Collapsible>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {nav.type === "page-routes" ? (
            <NavLink to={nav.route}>
              {({ isActive }) => (
                <SidebarMenuButton
                  isActive={isActive}
                  className="font-semibold"
                >
                  <Icon iconName={nav.icon} />
                  <span>{nav.title}</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          ) : (
            <SidebarMenuButton className="font-semibold">
              <Icon iconName={nav.icon} />
              <span>{nav.title}</span>
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {nav.items ? (
          <CollapsibleContent>
            <SidebarMenuSub>
              {isSideNavJobRouteArray(nav.items) && nav.items.length === 0 && (
                <SidebarMenuSubItem className="text-xs italic text-gray-400">
                  no jobs yet
                </SidebarMenuSubItem>
              )}
              {isSideNavJobRouteArray(nav.items) &&
                nav.items.map((i: jobRoute) => (
                  <SidebarMenuSubItem key={i.id}>
                    <NavLink to={`${i.id}`}>
                      {({ isActive }) => (
                        <SidebarMenuSubButton isActive={isActive}>
                          <Icon iconName={i.icon} />
                          <span className="text-sm">{i.name}</span>
                        </SidebarMenuSubButton>
                      )}
                    </NavLink>
                  </SidebarMenuSubItem>
                ))}

              {isSideNavMenuArray(nav.items) &&
                nav.items.map((item: SideNavMenu) => (
                  <CollapsibleItems key={item.title} nav={item} />
                ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : (
          ""
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}
