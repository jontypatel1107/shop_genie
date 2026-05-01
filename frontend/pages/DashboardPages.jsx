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
  Image as ImageIcon,
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
  Loader2,
  X,
  GripVertical,
  Trash2,
  Type,
  Image as ImageIconLucide,
  LayoutGrid,
  Mail,
  Download,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/apiFetch";
import { AdminLayout, AdminTopbar, StatCard, TipBox } from "../components/AdminLayout";
import {
  ANALYTICS_ROUTE,
  BUILDER_ROUTE,
  CATEGORY_ROUTE,
  CREATE_ACCOUNT_ROUTE,
  DASHBOARD_ROUTE,
  HELP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NEW_PRODUCT_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PUBLISH_ROUTE,
  SETTINGS_ROUTE,
  STORE_SETUP_ROUTE,
  THEME_ROUTE,
} from "../routes";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const categories = [
  { title: "Grocery", value: "grocery", copy: "Manage inventory, fresh produce, and daily staples with ease.", icon: ShoppingBag, wide: true, tone: "bg-[#a7eadf]" },
  { title: "Clothing", value: "clothing", copy: "Showcase your latest collections with beautiful size guides.", icon: Shirt, wide: true, tone: "bg-[#29d5d6]" },
  { title: "Electronics", value: "electronics", copy: "Detailed specs, warranties, and tech comparisons for your gadgets.", icon: Box, tone: "bg-[#22bdf2]" },
  { title: "Restaurant", value: "restaurant", copy: "Interactive menus, table bookings, and takeaway ordering systems.", icon: Utensils, tone: "bg-[#a7eadf]" },
  { title: "Other", value: "other", copy: "Something unique? We will build a flexible foundation for your vision.", icon: MoreHorizontal, tone: "bg-[#e0e5ea]" },
];

export function CategoryPage() {
  const navigate = useNavigate();
  
  const handleCategorySelect = (category) => {
    localStorage.setItem("pending_store_category", category);
    navigate(STORE_SETUP_ROUTE);
  };

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
              onClick={() => handleCategorySelect(category.value)}
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
          <p className="text-sm font-medium text-[#76808a]">You can change this category later in your shop settings.</p>
        </div>
      </section>
    </main>
  );
}

export function StoreSetupPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [existingStore, setExistingStore] = useState(null);

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const { data } = await apiFetch("/api/stores/my");
        if (data?.success) {
          setExistingStore(data.data.store);
          setStoreName(data.data.store.name);
          setDescription(data.data.store.description || "");
        }
      } catch (err) {
        console.log("No store found, starting fresh.");
      } finally {
        setFetching(false);
      }
    };
    fetchExisting();
  }, []);

  const handleContinue = async () => {
    if (!storeName.trim()) {
      setError("Please enter a store name");
      return;
    }

    setLoading(true);
    setError("");

    const category = localStorage.getItem("pending_store_category") || "other";

    try {
      const url = existingStore ? "/api/stores" : "/api/stores";
      const method = existingStore ? "PUT" : "POST";

      const { data } = await apiFetch(url, {
        method: method,
        body: JSON.stringify({
          name: storeName,
          category: category,
          description: description
        }),
      });

      updateUser({ ...user, businessName: storeName });
      navigate(THEME_ROUTE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <AdminLayout><div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#0f756b]" /></div></AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section>
          <h1 className="text-[2.45rem] font-extrabold leading-tight tracking-[-0.055em] sm:text-[3.2rem]">
            {existingStore ? "Update your storefront." : "Let's build your storefront."}
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-[#626c76]">
            First, we&apos;ll need a name and a face for your business. You can always update these
            details later.
          </p>

          <label className="mt-10 block max-w-2xl">
            <span className="mb-3 block text-sm font-extrabold">Store Name</span>
            <input
              className="h-16 w-full rounded-md bg-[#dbe1e7] px-5 text-base font-semibold outline-none focus:bg-white"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g., The Artisan Corner"
            />
            {error && <p className="mt-2 text-sm font-bold text-red-500">{error}</p>}
          </label>

          <label className="mt-6 block max-w-2xl">
            <span className="mb-3 block text-sm font-extrabold">Short Description</span>
            <textarea
              className="w-full min-h-32 rounded-md bg-[#dbe1e7] p-5 text-base font-semibold outline-none focus:bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell customers what makes your shop special..."
            />
          </label>

          <div className="mt-8 max-w-2xl">
            <p className="mb-3 text-sm font-extrabold">Upload Logo</p>
            <div className="flex min-h-48 flex-col items-center justify-center rounded-md border-2 border-dashed border-[#c8d1da] bg-[#f8fafb] p-8 text-center cursor-pointer hover:bg-slate-50 transition">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a6eadf] text-[#0f756b]">
                <UploadCloud className="h-6 w-6" />
              </span>
              <p className="mt-4 text-sm font-extrabold text-[#69737e]">Click to upload logo</p>
            </div>
          </div>

          <button
            className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-10 text-base font-extrabold text-white shadow-[0_16px_35px_rgba(15,117,107,0.2)] disabled:opacity-70"
            onClick={handleContinue}
            disabled={loading}
            type="button"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save & Continue"}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </section>

        <aside className="space-y-5">
          <div className="rounded-md bg-[#e2e7ed] p-6">
            <p className="font-extrabold text-[#0f6f66]">Setup Tips</p>
            <ul className="mt-5 space-y-4 text-sm font-semibold leading-6 text-[#626c76]">
              <li>Use a clean, high-resolution logo.</li>
              <li>A good description helps you show up in search engines.</li>
              <li>You can change your theme in the next step.</li>
            </ul>
          </div>
          <TipBox title="Live Preview">Once you click continue, you'll be able to see how these details look on your real website.</TipBox>
          <div className="min-h-56 rounded-md bg-[linear-gradient(135deg,#0f756b,#082f2d)] p-7 text-white">
            <div className="mt-10 text-7xl font-black opacity-75">
              {storeName ? storeName.slice(0, 2).toUpperCase() : "LS"}
            </div>
            <p className="mt-8 text-xl font-extrabold">Preview Identity</p>
            <p className="text-sm font-semibold opacity-85">This is how your brand initials will appear to customers.</p>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}

export function ThemeSelectionPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleThemeSelect = async (theme) => {
    setLoading(true);
    try {
      await apiFetch("/api/stores", {
        method: "PUT",
        body: JSON.stringify({ theme }),
      });
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      console.error("Theme selection failed", err);
    } finally {
      setLoading(false);
    }
  };

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
            <button 
              className="text-left group" 
              key={name} 
              onClick={() => handleThemeSelect(name.toLowerCase())} 
              disabled={loading}
              type="button"
            >
              <div className={`relative aspect-[1.15] overflow-hidden rounded-xl ${bg} shadow-[0_18px_45px_rgba(30,41,59,0.08)] transition group-hover:scale-[1.02]`}>
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
      </div>
    </AdminLayout>
  );
}

const themes = [
  ["Modern", "Clean lines, high contrast, and dynamic grids for lifestyle brands.", "bg-[linear-gradient(135deg,#0a7772,#3ac4c6_48%,#073b39)]"],
  ["Classic", "Elegant serif typography and earthy tones for traditional shops.", "bg-[#aaa58e]"],
  ["Bright", "Vibrant colors and bold headers for energetic retail concepts.", "bg-[radial-gradient(circle,#19c8c8_0,#058896_24%,#f8fafb_25%,#f8fafb_65%,#eef2f5)]"],
  ["Minimal", "Focus purely on products with essentialism and light-flooded layouts.", "bg-[linear-gradient(135deg,#020713,#13222b,#07111a)]"],
];

export function DashboardPage() {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: storeData } = await apiFetch("/api/stores/my");
        if (storeData?.success) {
          setStore(storeData.data.store);
          
          try {
            const { data: productData } = await apiFetch("/api/products/my");
            if (productData?.success) {
              setProducts(productData.data.products);
            }
          } catch {}
        }
      } catch (err) {
        if (err.message.includes("404")) {
          navigate(CATEGORY_ROUTE);
        } else {
          console.error("Failed to fetch dashboard data", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return (
    <AdminLayout>
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f756b]" />
      </div>
    </AdminLayout>
  );

  const firstName = user?.name ? user.name.split(" ")[0] : "there";

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-2xl font-extrabold text-[#0f6f66]">Dashboard Overview</h1>
        <p className="text-sm font-semibold text-[#626c76]">Welcome back, {firstName}. Here&apos;s what&apos;s happening today.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Products" value={products.length} delta="+0%" />
          <StatCard icon={ShoppingBag} label="Orders" value="0" delta="+0%" tone="blue" />
          <StatCard icon={BarChart3} label="Store Views" value={store?.visitorCount || 0} delta="+0%" />
          <StatCard icon={Zap} label="Conversion Traffic" value="0%" delta="+0%" tone="coral" />
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="rounded-md bg-[linear-gradient(90deg,#0f756b,#0f756b_55%,rgba(15,117,107,0.55))] p-8 text-white">
            <h2 className="max-w-md text-3xl font-extrabold tracking-[-0.05em]">Welcome to your new store, {store?.name || firstName}!</h2>
            <p className="mt-3 max-w-lg text-sm font-semibold leading-6 opacity-85">Start by adding your first product and customizing your storefront to match your brand.</p>
            <Link className="mt-7 inline-flex rounded-md bg-[#2bd6d6] px-6 py-3 font-extrabold text-[#06485f]" to={BUILDER_ROUTE}>Launch Site Editor</Link>
          </section>
          <section>
            <h2 className="mb-3 font-extrabold">Quick Actions</h2>
            {[["Add Product", NEW_PRODUCT_ROUTE], ["Edit Site", BUILDER_ROUTE], ["Visit Site", `/store/${store?.slug}`]].map(([label, to]) => (
              <Link className="mb-3 flex items-center justify-between rounded-md bg-white p-4 font-bold shadow-sm hover:shadow-md transition" key={label} to={to} target={label === "Visit Site" ? "_blank" : "_self"}>
                {label}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}
          </section>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-5 flex justify-between"><h2 className="font-extrabold">Recent Orders</h2><Link className="text-sm font-extrabold text-[#0f6f66]" to={ORDERS_ROUTE}>View All</Link></div>
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#c8d1da]" />
              <p className="mt-4 font-extrabold text-[#626c76]">No orders yet</p>
              <p className="mt-1 text-sm font-semibold text-[#7a838d]">Orders will appear here once you start selling.</p>
            </div>
          </section>
          <TipBox title="Pro Tip: Success">Shops with at least 5 products see 3x more visitors than those with only one product.</TipBox>
        </div>
      </div>
    </AdminLayout>
  );
}

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiFetch("/api/products/my");
        if (data?.success) {
          setProducts(data.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <AdminLayout action={<Link className="hidden rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white sm:inline-flex" to={NEW_PRODUCT_ROUTE}>Add New Product</Link>} search>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div><h1 className="text-4xl font-extrabold tracking-[-0.055em]">Product Catalog</h1><p className="mt-1 font-semibold text-[#626c76]">Manage your storefront items and stock levels.</p></div>
          <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-5 font-extrabold text-white sm:hidden" to={NEW_PRODUCT_ROUTE}><Plus className="h-4 w-4" />Add New Product</Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <StatCard label="Total Products" value={products.length} />
          <StatCard icon={Zap} label="Active Listings" value={products.filter(p => p.status === "active").length} tone="blue" />
          <StatCard icon={BadgeCheck} label="Low Stock Alert" value="0" />
        </div>
        
        <section className="mt-7 overflow-hidden rounded-md bg-white shadow-sm">
          <div className="flex flex-wrap justify-between gap-3 bg-[#edf2f6] p-4">
            <button className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-bold"><Filter className="h-4 w-4" />Filters</button>
            <span className="rounded bg-[#d7f5ff] px-4 py-2 text-sm font-bold text-[#07576c]">Selected: 0 items</span>
          </div>

          {loading ? (
             <div className="py-12 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0f756b]" /></div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#edf2f6] text-xs font-extrabold uppercase text-[#7a838d]">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr className="border-b border-[#edf2f6] hover:bg-[#f8fafb]" key={product._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-[#eef2f5] flex items-center justify-center overflow-hidden">
                            {product.images?.[0]?.url ? <img src={product.images[0].url} className="h-full w-full object-cover" /> : <Box className="h-5 w-5 text-[#c8d1da]" />}
                          </div>
                          <span className="font-bold text-[#2e333b]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#626c76]">{product.category}</td>
                      <td className="px-6 py-4 font-bold text-[#0f756b]">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase ${product.status === 'active' ? 'bg-[#e3f7f3] text-[#0f756b]' : 'bg-[#fff1f1] text-[#d43238]'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4"><button className="text-[#7a838d] hover:text-[#0f756b]"><MoreHorizontal className="h-5 w-5" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <PackagePlus className="mx-auto h-16 w-16 text-[#c8d1da]" />
              <p className="mt-4 text-lg font-extrabold text-[#626c76]">No products yet</p>
              <p className="mt-1 text-sm font-semibold text-[#7a838d]">Add your first product to get started.</p>
              <Link className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#0f756b] px-5 py-2.5 font-extrabold text-white" to={NEW_PRODUCT_ROUTE}>
                <Plus className="h-4 w-4" />Add Product
              </Link>
            </div>
          )}
        </section>
        <TipBox className="mx-auto mt-8 max-w-xl" title="Growth Tip: Product Bundles">Shop owners who bundle items see an average of 24% increase in order value.</TipBox>
      </div>
    </AdminLayout>
  );
}

export function NewProductPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: ""
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      setError("Name and price are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      
      images.forEach((file) => {
        data.append("images", file);
      });

      await apiFetch("/api/products", {
        method: "POST",
        body: data,
      });

      navigate(PRODUCTS_ROUTE);
    } catch (err) {
      setError(err.message || "Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout search>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold tracking-[-0.055em]">New Product</h1>
        <p className="mt-1 font-semibold text-[#626c76]">Create a beautiful listing for your storefront in seconds.</p>
        
        {error && <div className="mt-4 rounded-md bg-red-50 p-4 text-sm font-bold text-red-500">{error}</div>}

        <div 
          className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-md border-2 border-dashed border-[#bbc7d2] bg-white p-8 text-center cursor-pointer hover:bg-slate-50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
          
          {previews.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {previews.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                  <img src={url} className="h-full w-full object-cover" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                    className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                <Plus className="h-6 w-6" />
              </div>
            </div>
          ) : (
            <>
              <Camera className="h-12 w-12 rounded-full bg-[#a6eadf] p-3 text-[#0f756b]" />
              <p className="mt-6 text-lg font-extrabold">Click to upload product photos</p>
              <p className="text-sm font-semibold text-[#69737e]">Upload up to 5 high resolution images. Max 5MB each.</p>
            </>
          )}
        </div>
        
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_270px]">
          <section className="grid gap-6 md:grid-cols-2">
            <label className="rounded-md bg-[#e4e9ef] p-5 md:col-span-2">
              <span className="text-xs font-extrabold uppercase">Product Name</span>
              <input 
                className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none focus:bg-white" 
                placeholder="e.g. Handmade Ceramic Vase"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </label>
            <label className="rounded-md bg-[#e4e9ef] p-5">
              <span className="text-xs font-extrabold uppercase">Price ($)</span>
              <input 
                className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none focus:bg-white" 
                placeholder="0.00" 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </label>
            <label className="rounded-md bg-[#e4e9ef] p-5">
              <span className="text-xs font-extrabold uppercase">Category</span>
              <select 
                className="mt-3 h-14 w-full rounded-md bg-[#d2d9e0] px-4 font-semibold outline-none focus:bg-white"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="grocery">Grocery</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="rounded-md bg-[#e4e9ef] p-5 md:col-span-2">
              <span className="text-xs font-extrabold uppercase">Description</span>
              <textarea 
                className="mt-3 min-h-40 w-full rounded-md bg-[#d2d9e0] p-4 font-semibold outline-none focus:bg-white" 
                placeholder="Tell the story of your product..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </label>
          </section>
          
          <aside className="space-y-5">
            <div className="rounded-md bg-white p-6 shadow-sm">
              <p className="font-extrabold text-[#0f6f66]">Publishing</p>
              <div className="mt-5 space-y-3 text-sm font-bold">
                <div className="flex justify-between rounded bg-[#eef2f5] p-3"><span>Status</span><span>Draft</span></div>
                <div className="flex justify-between rounded bg-[#eef2f5] p-3"><span>Visibility</span><span>Public Store</span></div>
              </div>
              <button 
                className="mt-6 w-full rounded-md bg-[#0f756b] py-3 font-extrabold text-white disabled:opacity-70 flex justify-center items-center"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Product"}
              </button>
            </div>
            <div className="rounded-md bg-white p-6 shadow-sm"><p className="font-extrabold">Need some help?</p><p className="mt-2 text-sm font-semibold leading-6 text-[#626c76]">Our concierge team is available to help set up your first collection.</p></div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}

export function BuilderPage() {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [components, setComponents] = useState([
    { id: "hero-1", type: "hero", content: { title: "Crafted with Soul.", subtitle: "Bespoke ceramics and textiles created locally.", buttonText: "Explore Collection", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80" }},
    { id: "heading-1", type: "heading", content: { text: "New Arrivals", level: "h2" } },
    { id: "text-1", type: "text", content: { text: "Check out our latest products and collections." } },
  ]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const storeName = store?.name || user?.businessName || user?.name || "My Store";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    apiFetch("/api/stores/my")
      .then(({ data }) => { if(data.success) setStore(data.data.store) })
      .catch(() => {});
  }, []);

  const addComponent = (type) => {
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
    };
    setComponents([...components, newComponent]);
  };

  const getDefaultContent = (type) => {
    switch(type) {
      case "text": return { text: "Enter your text here..." };
      case "heading": return { text: "New Heading", level: "h2" };
      case "image": return { url: "", caption: "Image caption" };
      case "product-grid": return { title: "Featured Products", limit: 6 };
      case "contact-form": return { title: "Contact Us", subtitle: "Get in touch with us" };
      default: return {};
    }
  };

  const removeComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
    if (selectedComponent === id) setSelectedComponent(null);
  };

  const updateComponent = (id, newContent) => {
    setComponents(components.map(c => c.id === id ? { ...c, content: { ...c.content, ...newContent } } : c));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#edf2f6] text-[#2e333b]">
      <AdminTopbar action={<Link className="rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white" to={PUBLISH_ROUTE}>Publish</Link>} title="ShopGenie" />
      <div className="grid min-h-[calc(100dvh-4rem)] w-full gap-4 p-4 lg:grid-cols-[230px_minmax(0,1fr)_300px]">
        <aside className="rounded-md bg-white p-4 shadow-sm">
          <h2 className="font-extrabold text-[#0f6f66]">Add Components</h2>
          {[
            ["Text", "Headlines, paragraphs, and descriptions.", "text"],
            ["Heading", "Section titles and page headers.", "heading"],
            ["Image", "Showcase your products or storefront.", "image"],
            ["Product Grid", "A dynamic display of your top items.", "product-grid"],
            ["Contact Form", "Let customers reach out directly.", "contact-form"],
          ].map(([label, desc, type]) => (
            <button
              key={type}
              onClick={() => addComponent(type)}
              className="mt-3 w-full rounded-md bg-[#f3f7fa] p-4 text-left transition hover:bg-[#e4e9ef]"
            >
              <p className="font-extrabold">{label}</p>
              <p className="mt-1 text-xs font-semibold text-[#69737e]">{desc}</p>
            </button>
          ))}
        </aside>

        <section className="mx-auto w-full max-w-3xl rounded-md bg-white p-8 shadow-sm">
          <nav className="flex justify-between text-sm font-semibold">
            <strong className="text-xl text-[#0f6f66]">{storeName}</strong>
            <span>Shop</span><span>Our Story</span><span>Contact</span>
          </nav>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
              {components.map((component) => (
                <SortableComponent
                  key={component.id}
                  component={component}
                  isSelected={selectedComponent === component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  onRemove={() => removeComponent(component.id)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {components.length === 0 && (
            <div className="mt-16 text-center text-[#c8d1da]">
              <p className="text-lg font-bold">No components yet</p>
              <p className="text-sm">Add components from the left panel to build your page.</p>
            </div>
          )}
        </section>

        <aside className="rounded-md bg-white p-4 shadow-sm">
          <h2 className="font-extrabold text-[#0f6f66]">Component Settings</h2>
          {selectedComponent ? (
            <ComponentSettings
              component={components.find(c => c.id === selectedComponent)}
              onUpdate={(newContent) => updateComponent(selectedComponent, newContent)}
              onRemove={() => removeComponent(selectedComponent)}
            />
          ) : (
            <p className="mt-5 text-sm font-semibold text-[#69737e]">Select a component to edit its settings.</p>
          )}
          <TipBox className="mt-5" title="AI Tip">High-quality images with rounded corners make your store feel premium.</TipBox>
        </aside>
      </div>
    </main>
  );
}

function SortableComponent({ component, isSelected, onClick, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative mt-8 group ${isSelected ? "ring-2 ring-[#0f756b]" : ""}`}
      onClick={onClick}
    >
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 cursor-grab opacity-0 transition group-hover:opacity-100" {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-[#69737e]" />
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute -right-3 -top-3 z-10 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <ComponentRenderer component={component} />
    </div>
  );
}

function ComponentRenderer({ component }) {
  switch(component.type) {
    case "hero":
      return (
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-[-0.06em]">{component.content.title}</h1>
            <p className="mt-6 font-semibold leading-7 text-[#626c76]">{component.content.subtitle}</p>
            <button className="mt-8 rounded-md bg-[#0f756b] px-6 py-3 font-extrabold text-white">{component.content.buttonText}</button>
          </div>
          {component.content.image && (
            <div className="aspect-square rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${component.content.image})` }} />
          )}
        </div>
      );
    case "heading":
      const Tag = component.content.level || "h2";
      return <Tag className="text-2xl font-extrabold">{component.content.text}</Tag>;
    case "text":
      return <p className="font-semibold leading-7 text-[#626c76]">{component.content.text}</p>;
    case "image":
      return component.content.url ? (
        <img src={component.content.url} alt={component.content.caption} className="rounded-lg" />
      ) : (
        <div className="aspect-video rounded-lg bg-[#e4e9ef] flex items-center justify-center">
          <ImageIconLucide className="h-8 w-8 text-[#69737e]" />
        </div>
      );
    case "product-grid":
      return (
        <div>
          <h2 className="mb-4 text-2xl font-extrabold">{component.content.title}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-lg bg-[#e4e9ef] p-4 text-center">
                <div className="aspect-square rounded bg-[#d2d9e0]" />
                <p className="mt-2 font-bold">Product {i}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "contact-form":
      return (
        <div>
          <h2 className="mb-2 text-2xl font-extrabold">{component.content.title}</h2>
          <p className="mb-4 text-sm font-semibold text-[#626c76]">{component.content.subtitle}</p>
          <div className="space-y-3">
            <input className="w-full rounded-md bg-[#e4e9ef] p-3" placeholder="Your Name" />
            <input className="w-full rounded-md bg-[#e4e9ef] p-3" placeholder="Your Email" />
            <textarea className="w-full rounded-md bg-[#e4e9ef] p-3" rows="4" placeholder="Your Message" />
            <button className="rounded-md bg-[#0f756b] px-6 py-3 font-extrabold text-white">Send Message</button>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ComponentSettings({ component, onUpdate, onRemove }) {
  if (!component) return null;

  return (
    <div className="mt-5">
      {component.type === "hero" && (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Title</span>
            <input
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.title || ""}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Subtitle</span>
            <textarea
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.subtitle || ""}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Button Text</span>
            <input
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.buttonText || ""}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
            />
          </label>
        </div>
      )}
      {component.type === "heading" && (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Text</span>
            <input
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.text || ""}
              onChange={(e) => onUpdate({ text: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Level</span>
            <select
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.level || "h2"}
              onChange={(e) => onUpdate({ level: e.target.value })}
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </label>
        </div>
      )}
      {component.type === "text" && (
        <label className="block">
          <span className="text-xs font-extrabold uppercase">Text</span>
          <textarea
            className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
            rows="4"
            value={component.content.text || ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </label>
      )}
      {component.type === "image" && (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Image URL</span>
            <input
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.url || ""}
              onChange={(e) => onUpdate({ url: e.target.value })}
              placeholder="https://..."
            />
          </label>
          <label className="block">
            <span className="text-xs font-extrabold uppercase">Caption</span>
            <input
              className="mt-1 w-full rounded bg-[#e4e9ef] p-2 text-sm"
              value={component.content.caption || ""}
              onChange={(e) => onUpdate({ caption: e.target.value })}
            />
          </label>
        </div>
      )}
      <button
        onClick={onRemove}
        className="mt-8 w-full rounded-md bg-[#ffe4e4] py-3 font-extrabold text-[#d43238]"
      >
        Remove Component
      </button>
    </div>
  );
}

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiFetch("/api/orders");
        if (data?.success) {
          setOrders(data.data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "bg-yellow-50 text-yellow-600";
      case "delivered": return "bg-green-50 text-green-600";
      case "cancelled": return "bg-red-50 text-red-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold text-[#0f6f66]">Orders & Inquiries</h1>
        <p className="font-semibold text-[#626c76]">Manage your customer requests and sales in one place.</p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <StatCard label="Total Orders" value={orders.length} delta={`+${orders.filter(o => o.status === 'delivered').length} completed`} />
          <StatCard label="Pending" value={orders.filter(o => o.status === 'pending').length} delta="awaiting processing" tone="blue" />
          <StatCard label="Revenue" value={`$${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}`} delta="total earnings" />
        </div>

        <div className="mt-7 overflow-hidden rounded-md bg-white shadow-sm">
          <div className="flex flex-wrap justify-between gap-3 bg-[#edf2f6] p-4">
            <div className="flex h-10 min-w-64 items-center gap-2 rounded bg-white px-3 text-sm font-semibold text-[#7a838d]">
              <Search className="h-4 w-4" />
              <input className="flex-1 bg-transparent outline-none" placeholder="Search customer, order ID..." />
            </div>
            <select
              className="rounded bg-white px-4 py-2 text-sm font-bold"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0f756b]" />
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#edf2f6] text-xs font-extrabold uppercase text-[#7a838d]">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr className="border-b border-[#edf2f6] hover:bg-[#f8fafb]" key={order._id}>
                      <td className="px-6 py-4 font-bold text-[#2e333b]">#{order._id?.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#626c76]">{order.customer?.name || "Guest"}</td>
                      <td className="px-6 py-4 font-bold text-[#0f756b]">${order.total?.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#626c76]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-[#c8d1da]" />
              <p className="mt-4 font-extrabold text-[#626c76]">No orders yet</p>
              <p className="mt-1 text-sm font-semibold text-[#7a838d]">Orders will appear here once customers start purchasing.</p>
            </div>
          )}
        </div>
        <TipBox className="mt-7" title="Did you know?">Responding to inquiries within 2 hours increases conversion rates by nearly 45%.</TipBox>
      </div>
    </AdminLayout>
  );
}

export function AnalyticsPage() {
  const [visitorData, setVisitorData] = useState([]);
  const [productViewData, setProductViewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [visitorsRes, productsRes] = await Promise.all([
          fetch("/api/analytics/visitors"),
          fetch("/api/analytics/product-views"),
        ]);

        const visitorsData = await visitorsRes.json();
        const productsData = await productsRes.json();

        if (visitorsRes.ok) {
          setVisitorData(visitorsData.data || generateMockVisitorData());
        } else {
          setVisitorData(generateMockVisitorData());
        }

        if (productsRes.ok) {
          setProductViewData(productsData.data || generateMockProductData());
        } else {
          setProductViewData(generateMockProductData());
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
        setVisitorData(generateMockVisitorData());
        setProductViewData(generateMockProductData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const generateMockVisitorData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      visitors: Math.floor(Math.random() * 100) + 20,
    }));
  };

  const generateMockProductData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 50) + 10,
    }));
  };

  const totalVisitors = visitorData.reduce((sum, d) => sum + d.visitors, 0);
  const totalViews = productViewData.reduce((sum, d) => sum + d.views, 0);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0f6f66]">Shop Performance</h1>
            <p className="font-semibold text-[#626c76]">See how your business is growing this month.</p>
          </div>
          <select
            className="rounded-md bg-white px-4 py-2 text-sm font-bold border"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <StatCard icon={BarChart3} label="Total Visitors" value={totalVisitors} delta="+12%" />
          <StatCard icon={Grid2X2} label="Product Views" value={totalViews} delta="+8%" tone="blue" />
          <TipBox title="Pro Tip">Start promoting your store to see traffic grow!</TipBox>
        </div>

        {loading ? (
          <div className="mt-7 text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0f756b]" />
          </div>
        ) : (
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <section className="rounded-md bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-extrabold">Store Visitors</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#0f756b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section className="rounded-md bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-extrabold">Product Views</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productViewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#0f756b" />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>
        )}

        <section className="mt-8 rounded-md bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-extrabold">Ready to grow even more?</h2>
          <p className="mx-auto mt-3 max-w-xl font-semibold text-[#626c76]">Our deep-dive reports can show exactly where your customers are coming from.</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0f756b] px-7 py-3 font-extrabold text-white">
            <Download className="h-4 w-4" />
            Download PDF Report
          </button>
        </section>
      </div>
    </AdminLayout>
  );
}

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    apiFetch("/api/stores/my")
      .then(({ data }) => {
        if(data.success) {
          setStore(data.data.store);
          setFormData({
            storeName: data.data.store.name || "",
            ownerName: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            description: data.data.store.description || "",
          });
        }
      })
      .catch(() => {});
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await apiFetch("/api/stores", {
        method: "PUT",
        body: JSON.stringify({
          name: formData.storeName,
          description: formData.description,
        }),
      });

      setStore(data.data.store);
      setSuccess("Settings saved successfully!");
      updateUser({ ...user, businessName: formData.storeName });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-5xl font-extrabold tracking-[-0.06em]">Settings</h1>
        <p className="mt-1 font-semibold text-[#626c76]">Manage your shop&apos;s identity, digital address, and communication channels.</p>

        {error && <div className="mt-4 rounded-md bg-red-50 p-4 text-sm font-bold text-red-500">{error}</div>}
        {success && <div className="mt-4 rounded-md bg-green-50 p-4 text-sm font-bold text-green-600">{success}</div>}

        <section className="mt-8 rounded-md bg-white p-7 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#0f6f66]">Store Details</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-xs font-extrabold uppercase">Store Name</span>
              <input
                className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold outline-none focus:bg-white"
                value={formData.storeName}
                onChange={(e) => setFormData({...formData, storeName: e.target.value})}
              />
            </label>
            <label>
              <span className="text-xs font-extrabold uppercase">Brand Logo</span>
              <div className="mt-2 flex items-center gap-3">
                <span className="rounded bg-[#ffdb80] px-4 py-3 font-bold">
                  {(formData.storeName || "BS").slice(0, 2).toUpperCase()}
                </span>
                <button className="rounded border border-[#0f756b] px-4 py-3 font-bold text-[#0f756b]">Change Logo</button>
              </div>
            </label>
          </div>
          <label className="mt-6 block">
            <span className="text-xs font-extrabold uppercase">Owner Name</span>
            <input
              className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold outline-none focus:bg-white"
              value={formData.ownerName}
              onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
            />
          </label>
          <label className="mt-6 block">
            <span className="text-xs font-extrabold uppercase">Description</span>
            <textarea
              className="mt-2 w-full rounded bg-[#dbe1e7] p-4 font-semibold outline-none focus:bg-white"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </label>
          <button
            className="mt-6 rounded-md bg-[#0f756b] px-6 py-3 font-extrabold text-white disabled:opacity-70"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </section>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-md bg-white p-7 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#0f6f66]">Domain Management</h2>
            <TipBox className="mt-4" title="Pro Tip">Using a custom domain like .com increases customer trust by 45%.</TipBox>
            <div className="mt-6 rounded bg-[#dbe1e7] p-4 text-center font-extrabold">
              {store?.slug || (formData.storeName ? formData.storeName.toLowerCase().replace(/\s+/g, "-") : "your-store")}.shopgenie.store
            </div>
            <button className="mt-4 w-full rounded border border-dashed border-[#87919c] py-3 font-bold">Connect a custom domain</button>
          </section>

          <section className="rounded-md bg-[#e4e9ef] p-7 shadow-sm">
            <h2 className="font-extrabold text-[#0f6f66]">Contact Information</h2>
            <div className="mt-5 space-y-4">
              <label>
                <span className="text-xs font-extrabold uppercase">Email</span>
                <input
                  className="mt-1 w-full rounded bg-white p-3 text-sm font-semibold outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </label>
              <label>
                <span className="text-xs font-extrabold uppercase">Phone</span>
                <input
                  className="mt-1 w-full rounded bg-white p-3 text-sm font-semibold outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

export function PublishPage() {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
     apiFetch("/api/stores/my")
      .then(({ data }) => { if(data.success) setStore(data.data.store) })
      .catch(() => {});
  }, []);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const { data } = await apiFetch("/api/stores/publish", { method: "POST" });
      setStore(data.data.store);
    } catch (err) {
      console.error("Publishing failed", err);
    } finally {
      setPublishing(false);
    }
  };

  const storeName = store?.name || user?.businessName || user?.name || "My Store";

  return (
    <main className="min-h-[100dvh] bg-[#111] text-[#2e333b]">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-7xl overflow-hidden bg-[#eef2f5]">
        <AdminTopbar 
          action={
            <button 
              className="rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-70" 
              onClick={handlePublish}
              disabled={publishing || store?.isPublished}
            >
              {publishing ? "Publishing..." : (store?.isPublished ? "Already Published" : "Looks Great, Publish Now!")}
            </button>
          } 
          title="ShopGenie" 
        />
        <div className="absolute inset-0 top-16 bg-[url('https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-35 blur-[1px]" />
        <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center p-4">
          <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
            <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${store?.isPublished ? 'bg-[#a6eadf] text-[#0f756b]' : 'bg-gray-100 text-gray-400'}`}>
              <Check className="h-9 w-9" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold">{store?.isPublished ? "Congratulations!" : "Ready to go live?"}</h1>
            <p className="mt-3 font-semibold leading-7 text-[#626c76]">
              {store?.isPublished 
                ? "Your store is now live and ready to welcome customers from all over the world." 
                : "Review your shop one last time. Once you click publish, your site will be visible to everyone."}
            </p>
            <div className="mt-6 rounded-md bg-[#edf2f6] p-4 text-left">
              <p className="text-xs font-extrabold uppercase text-[#7a838d]">Your Live URL</p>
              <p className="font-extrabold truncate">www.{store?.slug || storeName.toLowerCase().replace(/\s+/g, "-")}.shopgenie.store</p>
            </div>
            {store?.isPublished ? (
              <>
                <button className="mt-5 w-full rounded-md bg-[#2e333b] py-3 font-extrabold text-white">Share Site</button>
                <Link className="mt-3 block rounded-md bg-[#a6eadf] py-3 font-extrabold text-[#0f6f66]" to={DASHBOARD_ROUTE}>Go to Dashboard</Link>
              </>
            ) : (
               <button 
                className="mt-5 w-full rounded-md bg-[#0f756b] py-3 font-extrabold text-white"
                onClick={handlePublish}
               >
                 Publish My Store
               </button>
            )}
            <TipBox className="mt-5" title="Need to change something?">You can always unpublish or edit your site in the settings panel.</TipBox>
          </section>
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
