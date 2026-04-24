import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Box,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Filter,
  Grid2X2,
  Image,
  Layers3,
  MessageSquare,
  MoreHorizontal,
  PackagePlus,
  Paintbrush,
  Plus,
  Search,
  Settings,
  Shirt,
  ShoppingBag,
  Store,
  UploadCloud,
  Utensils,
  WandSparkles,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout, AdminTopbar, StatCard, TipBox } from "../components/AdminLayout";
import {
  ANALYTICS_ROUTE,
  BUILDER_ROUTE,
  DASHBOARD_ROUTE,
  NEW_PRODUCT_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PUBLISH_ROUTE,
  SETTINGS_ROUTE,
  STORE_SETUP_ROUTE,
  THEME_ROUTE,
} from "../routes";

const categories = [
  { title: "Grocery", copy: "Manage inventory, fresh produce, and daily staples with ease.", icon: ShoppingBag, wide: true, tone: "bg-[#a7eadf]" },
  { title: "Clothing", copy: "Showcase your latest collections with beautiful size guides.", icon: Shirt, wide: true, tone: "bg-[#29d5d6]" },
  { title: "Electronics", copy: "Detailed specs, warranties, and tech comparisons for your gadgets.", icon: Box, tone: "bg-[#22bdf2]" },
  { title: "Restaurant", copy: "Interactive menus, table bookings, and takeaway ordering systems.", icon: Utensils, tone: "bg-[#a7eadf]" },
  { title: "Other", copy: "Something unique? We will build a flexible foundation for your vision.", icon: MoreHorizontal, tone: "bg-[#e0e5ea]" },
];

const orders = [
  ["Classic White Timepiece", "$125.00", "paid"],
  ["Hand-painted Ceramic Mug", "$34.00", "paid"],
  ["Pro Studio Headphones", "$299.00", "pending"],
];

export function CategoryPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-[100dvh] bg-[#f4f7f9] text-[#2e333b]">
      <AdminTopbar title="ShopGenie" />
      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col px-4 py-10 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="text-[2.45rem] font-extrabold leading-tight tracking-[-0.055em] sm:text-[3.1rem]">
            What kind of store are we building?
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#626c76]">
            Select the category that best describes your business. This helps us tailor your
            dashboard, storefront, and setup recommendations.
          </p>
        </div>

        <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              className={`rounded-md bg-white p-7 text-left shadow-[0_18px_50px_rgba(30,41,59,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(30,41,59,0.1)] ${category.wide ? "lg:col-span-3" : "lg:col-span-2"}`}
              key={category.title}
              onClick={() => navigate(STORE_SETUP_ROUTE)}
              type="button"
            >
              <span className={`flex h-16 w-16 items-center justify-center rounded-md text-[#0f6f66] ${category.tone}`}>
                <category.icon className="h-7 w-7" />
              </span>
              <span className="mt-7 block text-2xl font-extrabold tracking-[-0.04em]">{category.title}</span>
              <span className="mt-2 block text-sm font-semibold leading-6 text-[#626c76]">{category.copy}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-14 text-base font-extrabold text-white shadow-[0_16px_35px_rgba(15,117,107,0.22)]"
            onClick={() => navigate(STORE_SETUP_ROUTE)}
            type="button"
          >
            Next Step
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm font-medium text-[#76808a]">You can change this category later in your shop settings.</p>
        </div>
      </section>
    </main>
  );
}

export function StoreSetupPage() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section>
          <h1 className="text-[2.45rem] font-extrabold leading-tight tracking-[-0.055em] sm:text-[3.2rem]">
            Let&apos;s build your storefront.
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-[#626c76]">
            First, we&apos;ll need a name and a face for your business. You can always update these
            details later.
          </p>

          <label className="mt-10 block max-w-2xl">
            <span className="mb-3 block text-sm font-extrabold">Store Name</span>
            <input className="h-16 w-full rounded-md bg-[#dbe1e7] px-5 text-base font-semibold outline-none focus:bg-white" placeholder="e.g., The Artisan Corner" />
            <span className="mt-3 block text-sm font-semibold text-[#7a838d]">Choose a name that reflects your shop&apos;s unique personality.</span>
          </label>

          <div className="mt-8 max-w-2xl">
            <p className="mb-3 text-sm font-extrabold">Upload Logo</p>
            <div className="flex min-h-64 flex-col items-center justify-center rounded-md border-2 border-dashed border-[#c8d1da] bg-[#f8fafb] p-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#a6eadf] text-[#0f756b]">
                <UploadCloud className="h-7 w-7" />
              </span>
              <p className="mt-7 text-lg font-extrabold">Drag and drop your logo here</p>
              <p className="mt-1 text-sm font-semibold text-[#69737e]">or <span className="text-[#0f756b]">browse files</span> to upload</p>
              <p className="mt-6 text-xs font-bold uppercase text-[#87919c]">Supports: PNG, JPG, SVG (max 5MB)</p>
            </div>
          </div>

          <button
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-10 text-base font-extrabold text-white shadow-[0_16px_35px_rgba(15,117,107,0.2)]"
            onClick={() => navigate(THEME_ROUTE)}
            type="button"
          >
            Continue Setup
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-4 text-sm font-medium text-[#7a838d]">Clicking continue will save your current progress.</p>
        </section>

        <aside className="space-y-5">
          <div className="rounded-md bg-[#e2e7ed] p-6">
            <p className="font-extrabold text-[#0f6f66]">Logo Tips</p>
            <ul className="mt-5 space-y-4 text-sm font-semibold leading-6 text-[#626c76]">
              <li>Use a square or round icon for the best fit across social profiles.</li>
              <li>Keep it simple. Avoid thin lines that might disappear on small screens.</li>
              <li>Contrast is key. Ensure your colors stand out against a white background.</li>
            </ul>
          </div>
          <TipBox title="Need a Logo?">Try our AI Brand Kit generator after finishing this step to get professional designs in seconds.</TipBox>
          <div className="min-h-56 rounded-md bg-[linear-gradient(135deg,#0f756b,#082f2d)] p-7 text-white">
            <div className="mt-10 text-7xl font-black opacity-75">LS</div>
            <p className="mt-8 text-xl font-extrabold">Inspiration Corner</p>
            <p className="text-sm font-semibold opacity-85">Explore minimalist designs for inspiration.</p>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}

export function ThemeSelectionPage() {
  const navigate = useNavigate();
  const themes = [
    ["Modern", "Clean lines, high contrast, and dynamic grids for lifestyle brands.", "bg-[linear-gradient(135deg,#0a7772,#3ac4c6_48%,#073b39)]"],
    ["Classic", "Elegant serif typography and earthy tones for traditional shops.", "bg-[#aaa58e]"],
    ["Bright", "Vibrant colors and bold headers for energetic retail concepts.", "bg-[radial-gradient(circle,#19c8c8_0,#058896_24%,#f8fafb_25%,#f8fafb_65%,#eef2f5)]"],
    ["Minimal", "Focus purely on products with essentialism and light-flooded layouts.", "bg-[linear-gradient(135deg,#020713,#13222b,#07111a)]"],
  ];
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-[2.3rem] font-extrabold leading-tight tracking-[-0.055em] sm:text-[3rem]">Select your store&apos;s personality.</h1>
        <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-[#626c76]">
          Choose a theme that best represents your brand. All templates are fully customizable and mobile-ready from the start.
        </p>
        <div className="mt-5 inline-flex rounded-md bg-[#d7f5ff] px-4 py-2 text-xs font-extrabold text-[#07576c]">
          You can switch your theme anytime after publishing.
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {themes.map(([name, copy, bg], index) => (
            <button className="text-left" key={name} onClick={() => navigate(DASHBOARD_ROUTE)} type="button">
              <div className={`relative aspect-[1.15] overflow-hidden rounded-xl ${bg} shadow-[0_18px_45px_rgba(30,41,59,0.08)]`}>
                {index === 0 ? <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#0f6f66]">Selected</span> : null}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-extrabold">{name}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#626c76]">{copy}</p>
                </div>
                <span className="flex gap-2 pt-1"><i className="h-4 w-4 rounded-full bg-[#0f756b]" /><i className="h-4 w-4 rounded-full bg-[#2e333b]" /></span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 rounded-xl bg-[#edf2f6] p-7 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0f6f66]">Adaptive Design</p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.05em]">One theme, every screen.</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#626c76]">Your theme automatically reconfigures itself to provide the best shopping experience on phones, tablets, and desktop monitors.</p>
          </div>
          <div className="flex min-h-56 items-end justify-center gap-4">
            <div className="h-32 w-52 rounded-md bg-white shadow-xl" />
            <div className="h-52 w-28 rounded-3xl border-[10px] border-[#2d333a] bg-[linear-gradient(135deg,#0b7a87,#071923)] shadow-xl" />
          </div>
        </div>
        <div className="sticky bottom-4 mt-6 flex justify-end">
          <button className="inline-flex h-14 items-center gap-3 rounded-md bg-[#0f756b] px-9 font-extrabold text-white shadow-xl" onClick={() => navigate(DASHBOARD_ROUTE)} type="button">
            Select & Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export function DashboardPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-2xl font-extrabold text-[#0f6f66]">Dashboard Overview</h1>
        <p className="text-sm font-semibold text-[#626c76]">Welcome back, Sarah. Here&apos;s what&apos;s happening today.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Products" value="1,248" delta="+12%" />
          <StatCard icon={ShoppingBag} label="Orders" value="854" delta="+5.4%" tone="blue" />
          <StatCard icon={BarChart3} label="Store Views" value="14.2k" delta="+28%" />
          <StatCard icon={Zap} label="Conversion Traffic" value="3.2%" delta="-0.4%" tone="coral" />
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="rounded-md bg-[linear-gradient(90deg,#0f756b,#0f756b_55%,rgba(15,117,107,0.55))] p-8 text-white">
            <h2 className="max-w-md text-3xl font-extrabold tracking-[-0.05em]">Your shop is growing 20% faster than last month!</h2>
            <p className="mt-3 max-w-lg text-sm font-semibold leading-6 opacity-85">It&apos;s a great time to update your storefront and highlight your best-selling items for the upcoming season.</p>
            <Link className="mt-7 inline-flex rounded-md bg-[#2bd6d6] px-6 py-3 font-extrabold text-[#06485f]" to={BUILDER_ROUTE}>Launch Site Editor</Link>
          </section>
          <section>
            <h2 className="mb-3 font-extrabold">Quick Actions</h2>
            {[["Add Product", NEW_PRODUCT_ROUTE], ["Edit Site", BUILDER_ROUTE], ["Create Promo", SETTINGS_ROUTE]].map(([label, to]) => (
              <Link className="mb-3 flex items-center justify-between rounded-md bg-white p-4 font-bold shadow-sm" key={label} to={to}>
                {label}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}
          </section>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-5 flex justify-between"><h2 className="font-extrabold">Recent Orders</h2><Link className="text-sm font-extrabold text-[#0f6f66]" to={ORDERS_ROUTE}>View All</Link></div>
            {orders.map(([item, price, status]) => (
              <div className="flex items-center justify-between border-t border-[#eef2f5] py-4" key={item}>
                <div className="flex items-center gap-4"><div className="h-11 w-11 rounded-md bg-[#dfe7ed]" /><div><p className="font-extrabold">{item}</p><p className="text-xs font-semibold text-[#7a838d]">Order placed recently</p></div></div>
                <div className="text-right"><p className="font-extrabold">{price}</p><span className="rounded-full bg-[#d7f5e8] px-2 py-1 text-xs font-bold text-[#0f756b]">{status}</span></div>
              </div>
            ))}
          </section>
          <TipBox title="Pro Tip: Local Delivery">Users in your neighborhood prefer same day delivery. You can set this up in shipping settings.</TipBox>
        </div>
      </div>
    </AdminLayout>
  );
}

export function ProductsPage() {
  const rows = ["Artisan Ceramic Watch", "Studio Wireless Headphones", "Organic Cotton Home Set"];
  return (
    <AdminLayout action={<Link className="hidden rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white sm:inline-flex" to={NEW_PRODUCT_ROUTE}>Add New Product</Link>} search>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div><h1 className="text-4xl font-extrabold tracking-[-0.055em]">Product Catalog</h1><p className="mt-1 font-semibold text-[#626c76]">Manage your storefront items and stock levels.</p></div>
          <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-5 font-extrabold text-white sm:hidden" to={NEW_PRODUCT_ROUTE}><Plus className="h-4 w-4" />Add New Product</Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3"><StatCard label="Total Products" value="124" /><StatCard icon={Zap} label="Active Listings" value="118" tone="blue" /><StatCard icon={BadgeCheck} label="Low Stock Alert" value="5" /></div>
        <section className="mt-7 overflow-hidden rounded-md bg-white shadow-sm">
          <div className="flex flex-wrap justify-between gap-3 bg-[#edf2f6] p-4"><button className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-bold"><Filter className="h-4 w-4" />Filters</button><span className="rounded bg-[#d7f5ff] px-4 py-2 text-sm font-bold text-[#07576c]">Selected: 0 items</span></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase text-[#7a838d]"><tr><th className="p-4">Product</th><th>Status</th><th>Inventory</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr className="border-t border-[#edf2f6]" key={row}><td className="p-4 font-extrabold">{row}</td><td><span className={`rounded-full px-3 py-1 text-xs font-bold ${index === 2 ? "bg-[#ffd9db] text-[#d43238]" : "bg-[#d7f5e8] text-[#0f756b]"}`}>{index === 2 ? "Out of Stock" : "Active"}</span></td><td className="font-bold">{index === 2 ? "0 in stock" : `${42 - index * 30} in stock`}</td><td className="font-extrabold text-[#0f6f66]">${index === 0 ? "124.00" : index === 1 ? "299.00" : "45.00"}</td><td><MoreHorizontal className="h-5 w-5" /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <TipBox className="mx-auto mt-8 max-w-xl" title="Growth Tip: Product Bundles">Shop owners who bundle items see an average of 24% increase in order value.</TipBox>
      </div>
    </AdminLayout>
  );
}

export function NewProductPage() {
  return (
    <AdminLayout search>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold tracking-[-0.055em]">New Product</h1>
        <p className="mt-1 font-semibold text-[#626c76]">Create a beautiful listing for your storefront in seconds.</p>
        <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-md border-2 border-dashed border-[#bbc7d2] bg-white p-8 text-center"><Camera className="h-12 w-12 rounded-full bg-[#a6eadf] p-3 text-[#0f756b]" /><p className="mt-6 text-lg font-extrabold">Drop your product photo here</p><p className="text-sm font-semibold text-[#69737e]">High resolution images work best. Max 10MB.</p><span className="mt-5 rounded-full bg-[#22bdf2] px-5 py-2 text-xs font-extrabold text-[#06485f]">Pro tip: Use natural lighting for a premium look.</span></div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_270px]">
          <section className="grid gap-6 md:grid-cols-2">
            <label className="rounded-md bg-[#e4e9ef] p-5 md:col-span-2"><span className="text-xs font-extrabold uppercase">Product Name</span><input className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none" placeholder="e.g. Handmade Ceramic Vase" /></label>
            <label className="rounded-md bg-[#e4e9ef] p-5"><span className="text-xs font-extrabold uppercase">Price ($)</span><input className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none" placeholder="$ 0.00" /></label>
            <label className="rounded-md bg-[#e4e9ef] p-5"><span className="text-xs font-extrabold uppercase">Category</span><select className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none"><option>Select Category</option></select></label>
            <label className="rounded-md bg-[#e4e9ef] p-5 md:col-span-2"><span className="text-xs font-extrabold uppercase">Description</span><textarea className="mt-3 min-h-40 w-full rounded-md bg-[#d2d9e0] p-4 font-semibold outline-none" placeholder="Tell the story of your product..." /></label>
          </section>
          <aside className="space-y-5"><div className="rounded-md bg-white p-6 shadow-sm"><p className="font-extrabold text-[#0f6f66]">Publishing</p><div className="mt-5 space-y-3 text-sm font-bold"><div className="flex justify-between rounded bg-[#eef2f5] p-3"><span>Status</span><span>Draft</span></div><div className="flex justify-between rounded bg-[#eef2f5] p-3"><span>Visibility</span><span>Public Store</span></div></div><button className="mt-6 w-full rounded-md bg-[#0f756b] py-3 font-extrabold text-white">Save Product</button></div><div className="rounded-md bg-white p-6 shadow-sm"><p className="font-extrabold">Need some help?</p><p className="mt-2 text-sm font-semibold leading-6 text-[#626c76]">Our concierge team is available to help set up your first collection.</p></div></aside>
        </div>
      </div>
    </AdminLayout>
  );
}

export function BuilderPage() {
  return (
    <main className="min-h-[100dvh] bg-[#edf2f6] text-[#2e333b]">
      <AdminTopbar action={<Link className="rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white" to={PUBLISH_ROUTE}>Publish</Link>} title="ShopGenie" />
      <div className="grid min-h-[calc(100dvh-4rem)] w-full gap-4 p-4 lg:grid-cols-[230px_minmax(0,1fr)_300px]">
        <aside className="rounded-md bg-white p-4 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Add Components</h2>{[["Text", "Headlines, paragraphs, and descriptions."], ["Image", "Showcase your products or storefront."], ["Product Grid", "A dynamic display of your top items."], ["Contact Form", "Let customers reach out directly."]].map(([a,b])=><div className="mt-4 rounded-md bg-[#f3f7fa] p-4" key={a}><p className="font-extrabold">{a}</p><p className="mt-1 text-xs font-semibold text-[#69737e]">{b}</p></div>)}</aside>
        <section className="mx-auto w-full max-w-3xl rounded-md bg-white p-8 shadow-sm"><nav className="flex justify-between text-sm font-semibold"><strong className="text-xl text-[#0f6f66]">Handmade Haven</strong><span>Shop</span><span>Our Story</span><span>Contact</span></nav><div className="mt-16 grid items-center gap-8 md:grid-cols-2"><div><h1 className="text-5xl font-extrabold leading-tight tracking-[-0.06em]">Crafted with <span className="text-[#0f6f66]">Soul.</span></h1><p className="mt-6 font-semibold leading-7 text-[#626c76]">Bespoke ceramics and textiles created locally. Every piece tells a unique story.</p><button className="mt-8 rounded-md bg-[#0f756b] px-6 py-3 font-extrabold text-white">Explore Collection</button></div><div className="aspect-square rounded-xl bg-[url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" /></div><h2 className="mt-20 text-2xl font-extrabold">New Arrivals</h2></section>
        <aside className="rounded-md bg-white p-4 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Component Settings</h2><div className="mt-5 aspect-video rounded-md bg-[url('https://images.unsplash.com/photo-1595433409683-943ded8cfb1c?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center" /><p className="mt-5 text-sm font-extrabold">Visual Style</p><div className="mt-3 grid grid-cols-2 gap-3"><button className="rounded-md border-2 border-[#0f756b] py-3 text-xs font-extrabold">Portrait</button><button className="rounded-md bg-[#eef2f5] py-3 text-xs font-extrabold">Landscape</button></div><TipBox className="mt-5" title="AI Tip">High-quality images with rounded corners make your store feel premium.</TipBox><button className="mt-8 w-full rounded-md bg-[#ffe4e4] py-3 font-extrabold text-[#d43238]">Remove Component</button></aside>
      </div>
    </main>
  );
}

export function OrdersPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl"><h1 className="text-3xl font-extrabold text-[#0f6f66]">Orders & Inquiries</h1><p className="font-semibold text-[#626c76]">Manage your customer requests and sales in one place.</p><div className="mt-7 grid gap-5 md:grid-cols-3"><StatCard label="Total Orders" value="124" delta="+12%" /><StatCard label="Active Inquiries" value="08" delta="2 awaiting response" /><StatCard label="Completion Rate" value="96%" delta="Excellent achieved" /></div><div className="mt-7 overflow-hidden rounded-md bg-white shadow-sm"><div className="flex flex-wrap justify-between gap-3 bg-[#edf2f6] p-4"><div className="flex h-10 min-w-64 items-center gap-2 rounded bg-white px-3 text-sm font-semibold text-[#7a838d]"><Search className="h-4 w-4" />Search customer, order ID, or keyword...</div><button className="rounded bg-[#0f756b] px-4 py-2 text-sm font-extrabold text-white">New Order</button></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><tbody>{["Jane Doe","Marcus Bennett","Sarah Lewis","Alex Kim"].map((name, index)=><tr className="border-t border-[#edf2f6]" key={name}><td className="p-4 font-extrabold">{name}<p className="text-xs text-[#7a838d]">customer@email.com</p></td><td>Oct {12-index}, 2023</td><td>&quot;Message preview for this customer...&quot;</td><td><span className={`rounded-full px-3 py-1 text-xs font-bold ${index===2 ? "bg-[#d7f5e8] text-[#0f756b]" : "bg-[#ffd9db] text-[#d43238]"}`}>{index===2 ? "Completed" : "Pending"}</span></td><td><button className="rounded bg-[#0f756b] px-4 py-2 text-xs font-bold text-white">View Details</button></td></tr>)}</tbody></table></div></div><TipBox className="mt-7" title="Did you know?">Responding to inquiries within 2 hours increases conversion rates by nearly 45%.</TipBox></div>
    </AdminLayout>
  );
}

export function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl"><h1 className="text-3xl font-extrabold text-[#0f6f66]">Shop Performance</h1><p className="font-semibold text-[#626c76]">See how your business is growing this month.</p><div className="mt-7 grid gap-5 md:grid-cols-3"><StatCard icon={BarChart3} label="Total Visitors" value="2,840" delta="+12%" /><StatCard icon={Grid2X2} label="Product Views" value="14,209" delta="+5%" /><TipBox title="Pro Tip">You have 20% more traffic on Fridays. Try offering a weekend kickoff coupon.</TipBox></div><div className="mt-7 grid gap-6 lg:grid-cols-2"><ChartCard title="Store Visitors" type="line" /><ChartCard title="Product Views" type="bar" /></div><section className="mt-8 rounded-md bg-white p-8 text-center shadow-sm"><h2 className="text-2xl font-extrabold">Ready to grow even more?</h2><p className="mx-auto mt-3 max-w-xl font-semibold text-[#626c76]">Our deep-dive reports can show exactly where your customers are coming from.</p><button className="mt-6 rounded-md bg-[#0f756b] px-7 py-3 font-extrabold text-white">Download PDF Report</button></section></div>
    </AdminLayout>
  );
}

function ChartCard({ title, type }) {
  return <section className="rounded-md bg-[#e4e9ef] p-6"><h2 className="font-extrabold">{title}</h2><div className="mt-5 flex h-64 items-end justify-around rounded-md bg-white p-7">{type === "line" ? <div className="h-28 w-full rounded-[50%] border-t-8 border-[#0f756b]" /> : [80,130,95,160,105,92].map((h,i)=><span className={`w-8 rounded-t ${i===2 ? "bg-[#22d5d6]" : "bg-[#0f756b]"}`} style={{height:h}} key={i} />)}</div></section>;
}

export function SettingsPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl"><h1 className="text-5xl font-extrabold tracking-[-0.06em]">Settings</h1><p className="mt-1 font-semibold text-[#626c76]">Manage your shop&apos;s identity, digital address, and communication channels.</p><section className="mt-8 rounded-md bg-white p-7 shadow-sm"><h2 className="text-xl font-extrabold text-[#0f6f66]">Store Details</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><label><span className="text-xs font-extrabold uppercase">Store Name</span><input className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold" defaultValue="The Local Artisan Bakery" /></label><label><span className="text-xs font-extrabold uppercase">Brand Logo</span><div className="mt-2 flex items-center gap-3"><span className="rounded bg-[#ffdb80] px-4 py-3 font-bold">Bakery</span><button className="rounded border border-[#0f756b] px-4 py-3 font-bold text-[#0f756b]">Change Logo</button></div></label></div><label className="mt-6 block"><span className="text-xs font-extrabold uppercase">Physical Address</span><input className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold" defaultValue="123 Flour Street, Breadville, BV 5678" /></label></section><div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]"><section className="rounded-md bg-white p-7 shadow-sm"><h2 className="text-xl font-extrabold text-[#0f6f66]">Domain Management</h2><TipBox className="mt-4" title="Pro Tip">Using a custom domain like .com increases customer trust by 45%.</TipBox><div className="mt-6 rounded bg-[#dbe1e7] p-4 text-center font-extrabold">artisan-bakery.shopgenie.store</div><button className="mt-4 w-full rounded border border-dashed border-[#87919c] py-3 font-bold">Connect a custom domain</button></section><section className="rounded-md bg-[#e4e9ef] p-7 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Site Visibility</h2>{["Online Now","Search Engines"].map(x=><div className="mt-5 flex justify-between font-bold" key={x}><span>{x}</span><span className="h-6 w-11 rounded-full bg-[#0f756b]" /></div>)}</section></div><section className="mt-7 rounded-md bg-white p-7 shadow-sm"><h2 className="text-xl font-extrabold text-[#0f6f66]">WhatsApp Integration</h2><p className="mt-2 max-w-xl font-semibold leading-7 text-[#626c76]">Receive orders and chat with customers directly through WhatsApp.</p><input className="mt-5 h-12 w-full max-w-md rounded bg-[#dbe1e7] px-4 font-semibold" defaultValue="+1 555-0123" /></section></div>
    </AdminLayout>
  );
}

export function PublishPage() {
  return (
    <main className="min-h-[100dvh] bg-[#111] text-[#2e333b]">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-7xl overflow-hidden bg-[#eef2f5]">
        <AdminTopbar action={<Link className="rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white" to={DASHBOARD_ROUTE}>Looks Great, Publish Now!</Link>} title="ShopGenie" />
        <div className="absolute inset-0 top-16 bg-[url('https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-35 blur-[1px]" />
        <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center p-4">
          <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_30px_90px_rgba(15,23,42,0.25)]"><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#a6eadf] text-[#0f756b]"><Check className="h-9 w-9" /></span><h1 className="mt-6 text-3xl font-extrabold">Congratulations!</h1><p className="mt-3 font-semibold leading-7 text-[#626c76]">Your store is now live and ready to welcome customers from all over the world.</p><div className="mt-6 rounded-md bg-[#edf2f6] p-4 text-left"><p className="text-xs font-extrabold uppercase text-[#7a838d]">Your Live URL</p><p className="font-extrabold">www.my-shopgenie-store.com</p></div><button className="mt-5 w-full rounded-md bg-[#2e333b] py-3 font-extrabold text-white">Share Site</button><Link className="mt-3 block rounded-md bg-[#a6eadf] py-3 font-extrabold text-[#0f6f66]" to={DASHBOARD_ROUTE}>Go to Dashboard</Link><TipBox className="mt-5" title="Need to change something?">You can always unpublish or edit your site in the settings panel.</TipBox></section>
        </div>
      </div>
    </main>
  );
}

export function HelpPage() {
  const faqs = ["How do I connect my custom domain?", "Can I change my shop&apos;s theme later?", "What payment gateways are supported?", "Is there a mobile app for owners?"];
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl"><div className="text-center"><h1 className="text-[2.7rem] font-extrabold tracking-[-0.055em] text-[#0f6f66]">How can we help you today?</h1><p className="mx-auto mt-2 max-w-2xl font-semibold text-[#626c76]">Our digital concierge team is here to ensure your shop runs smoothly.</p></div><div className="mt-10 grid gap-7 lg:grid-cols-[1fr_320px]"><section><h2 className="mb-4 text-xl font-extrabold">Frequently Asked Questions</h2>{faqs.map((faq, i)=><details className="mb-4 rounded-md bg-white p-5 shadow-sm" key={faq} open={i===0}><summary className="cursor-pointer font-extrabold">{faq}</summary><p className="mt-4 text-sm font-semibold leading-7 text-[#626c76]">Navigate to Settings and follow the step-by-step connection wizard. We support all major providers including GoDaddy, Namecheap, and Google Domains.</p></details>)}<TipBox title="Pro Tip: Search the Docs">Our documentation library has over 500 articles with video tutorials for every feature.</TipBox></section><aside className="space-y-5"><div className="rounded-md bg-[#0f756b] p-8 text-white"><CircleHelp className="h-12 w-12" /><h2 className="mt-8 text-3xl font-extrabold">Contact Our Support Team</h2><p className="mt-4 font-semibold leading-7 opacity-85">Our empathetic support experts are ready to help you overcome any hurdle.</p><button className="mt-7 w-full rounded-md bg-[#25d366] py-3 font-extrabold text-[#063c2b]">Direct WhatsApp Chat</button></div><div className="grid grid-cols-2 gap-4"><div className="rounded-md bg-white p-5 shadow-sm"><MessageSquare className="h-5 w-5" /><p className="mt-4 font-extrabold">Email Support</p></div><div className="rounded-md bg-white p-5 shadow-sm"><WandSparkles className="h-5 w-5" /><p className="mt-4 font-extrabold">Onboarding Call</p></div></div></aside></div></div>
    </AdminLayout>
  );
}
