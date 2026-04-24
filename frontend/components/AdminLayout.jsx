import {
  BarChart3,
  Bell,
  Box,
  CircleHelp,
  Grid2X2,
  LayoutDashboard,
  Paintbrush,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  Zap,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  ANALYTICS_ROUTE,
  BUILDER_ROUTE,
  DASHBOARD_ROUTE,
  HELP_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  SETTINGS_ROUTE,
} from "../routes";

const navItems = [
  { label: "Dashboard", to: DASHBOARD_ROUTE, icon: LayoutDashboard },
  { label: "Website Builder", to: BUILDER_ROUTE, icon: Paintbrush },
  { label: "Products", to: PRODUCTS_ROUTE, icon: Box },
  { label: "Orders", to: ORDERS_ROUTE, icon: ShoppingBag },
  { label: "Analytics", to: ANALYTICS_ROUTE, icon: BarChart3 },
  { label: "Settings", to: SETTINGS_ROUTE, icon: Settings },
];

export function AdminTopbar({ title = "ShopGenie", search = false, action = null }) {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-[#dfe5eb] bg-white px-4 sm:px-6">
      <Link className="shrink-0 text-base font-extrabold tracking-[-0.04em] text-[#0f6f66]" to={DASHBOARD_ROUTE}>
        {title}
      </Link>
      {search ? (
        <div className="hidden h-10 min-w-0 max-w-sm flex-1 items-center rounded-full bg-[#eef2f5] px-4 text-sm text-[#7a838d] md:flex">
          Search orders, products...
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        {action}
        <button className="hidden h-9 w-9 items-center justify-center rounded-full text-[#0f6f66] hover:bg-[#eef7f5] sm:flex" type="button">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-9 w-9 rounded-full bg-[#e3f7f3] text-[#0f6f66]" type="button">
          <CircleHelp className="mx-auto h-4 w-4" />
        </button>
        <div className="h-9 w-9 rounded-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80')] bg-cover bg-center ring-2 ring-[#93eadb]" />
      </div>
    </header>
  );
}

export function AdminLayout({ children, title = "ShopGenie", search = false, action = null }) {
  return (
    <main className="min-h-[100dvh] bg-[#f4f7f9] text-[#2e333b]">
      <div className="flex min-h-[100dvh] w-full">
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-[#dbe2e8] bg-[#edf2f6] px-4 py-5 lg:flex">
          <Link className="flex items-center gap-3" to={DASHBOARD_ROUTE}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f756b] text-white">
              <Store className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-[#0f6f66]">My Local Shop</span>
              <span className="text-xs font-semibold text-[#6f7984]">Premium Plan</span>
            </span>
          </Link>

          <nav className="mt-9 space-y-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
                    isActive ? "bg-white text-[#0f6f66] shadow-sm" : "text-[#33404a] hover:bg-white/70"
                  }`
                }
                key={item.to}
                to={item.to}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0f756b] px-3 py-3 text-sm font-extrabold text-white shadow-md" type="button">
              <Zap className="h-4 w-4" />
              Upgrade Store
            </button>
            <Link className="flex items-center gap-2 px-2 text-sm font-bold text-[#4f5b66]" to={HELP_ROUTE}>
              <CircleHelp className="h-4 w-4" />
              Help Center
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar action={action} search={search} title={title} />
          <nav className="flex gap-2 overflow-x-auto border-b border-[#dfe5eb] bg-[#edf2f6] px-3 py-2 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-bold ${
                    isActive ? "bg-white text-[#0f6f66]" : "text-[#33404a]"
                  }`
                }
                key={item.to}
                to={item.to}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function StatCard({ icon: Icon = Grid2X2, label, value, delta, tone = "mint" }) {
  const tones = {
    mint: "bg-[#baf3e9] text-[#0f756b]",
    blue: "bg-[#c8f0ff] text-[#159ed1]",
    coral: "bg-[#ffe0df] text-[#e45151]",
  };

  return (
    <article className="rounded-md bg-white p-5 shadow-[0_12px_35px_rgba(30,41,59,0.05)]">
      <div className={`flex h-9 w-9 items-center justify-center rounded-md ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase text-[#69737e]">{label}</p>
      <div className="mt-1 flex items-end gap-2">
        <p className="text-3xl font-extrabold tracking-[-0.05em] text-[#2e333b]">{value}</p>
        {delta ? <span className="pb-1 text-xs font-extrabold text-[#0f756b]">{delta}</span> : null}
      </div>
    </article>
  );
}

export function TipBox({ title = "Pro Tip", children, className = "" }) {
  return (
    <div className={`rounded-md bg-[#25bdf2] p-5 text-[#06485f] shadow-[0_16px_35px_rgba(37,189,242,0.18)] ${className}`}>
      <div className="flex gap-3">
        <ShoppingCart className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-extrabold">{title}</p>
          <div className="mt-2 text-sm font-semibold leading-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
