import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "./ui/collapsible";
import { NavLink } from "react-router";
import Icon from "./Icon";
import type { SideNavJobRoute, SideNavMenu } from "@/types";

type CollapsibleInput =
  | SideNavMenu["items"]
  | SideNavJobRoute["items"];

export function renderNavCollapsibleByType(nav: CollapsibleInput) {
  if (!Array.isArray(nav) || nav.length === 0) return null;

  const first = nav[0];
  if (
    typeof first !== "object" ||
    first === null ||
    !("items" in first)
  ) {
    return null;
  }

  const firstNested = first.items?.[0];

  if (
    firstNested &&
    typeof firstNested === "object" &&
    "title" in firstNested &&
    "route" in firstNested
  ) {
    return <SideNavMenuCollapsible nav={nav as SideNavMenu[]} />;
  }

  if (
    firstNested &&
    typeof firstNested === "object" &&
    "id" in firstNested &&
    "name" in firstNested
  ) {
    return (
      <SideNavJobRouteCollapsible nav={nav as SideNavJobRoute[]} />
    );
  }

  return null;
}

export default function CollapsibleNav({
  navs,
}: {
  navs: SideNavMenu[] | SideNavJobRoute[];
}) {
  return (
    <SidebarMenu>
      {navs.map((item) => (
        <Collapsible asChild key={item.title}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <NavLink to={item.route}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <Icon iconName={item.icon} />{" "}
                    <span className="font-semibold">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </CollapsibleTrigger>

            {renderNavCollapsibleByType(item.items)}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}

function SideNavMenuCollapsible({
  nav,
}: {
  nav: SideNavMenu[];
}) {
  if (!nav) return null;

  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {nav.map((sitem) => (<>
          <SidebarMenuSubItem key={sitem.title}>
            <NavLink to={sitem.route}>
              {({ isActive }) => (
                <SidebarMenuSubButton isActive={isActive}>
                  {sitem.title}
                </SidebarMenuSubButton>
              )}
            </NavLink>
          </SidebarMenuSubItem>
        
          </>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

function SideNavJobRouteCollapsible({
  nav,
}: {
  nav: SideNavJobRoute[];
}) {
  if (!nav) return null;

  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {nav.map((sitem) => (
            <>
          <SidebarMenuSubItem key={sitem.title}>
            <NavLink to={sitem.route}>
              {({ isActive }) => (
                <SidebarMenuSubButton isActive={isActive}>
                  {sitem.title}
                </SidebarMenuSubButton>
              )}
            </NavLink>
          </SidebarMenuSubItem>
          
          </>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}