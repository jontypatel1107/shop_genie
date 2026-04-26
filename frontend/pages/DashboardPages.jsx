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
  Loader2,
  X,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!storeName.trim()) {
      setError("Please enter a store name");
      return;
    }

    setLoading(true);
    setError("");

    const category = localStorage.getItem("pending_store_category") || "other";

    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: storeName,
          category: category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create store");
      }

      // Update local user state with business name if needed
      updateUser({ ...user, businessName: storeName });
      
      navigate(THEME_ROUTE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <input
              className="h-16 w-full rounded-md bg-[#dbe1e7] px-5 text-base font-semibold outline-none focus:bg-white"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g., The Artisan Corner"
            />
            {error && <p className="mt-2 text-sm font-bold text-red-500">{error}</p>}
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
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#0f756b] px-10 text-base font-extrabold text-white shadow-[0_16px_35px_rgba(15,117,107,0.2)] disabled:opacity-70"
            onClick={handleContinue}
            disabled={loading}
            type="button"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue Setup"}
            {!loading && <ArrowRight className="h-5 w-5" />}
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
            <div className="mt-10 text-7xl font-black opacity-75">
              {storeName ? storeName.slice(0, 2).toUpperCase() : (user?.name ? user.name.slice(0, 2).toUpperCase() : "LS")}
            </div>
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
  const [loading, setLoading] = useState(false);

  const handleThemeSelect = async (theme) => {
    setLoading(true);
    try {
      const res = await fetch("/api/stores", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      if (res.ok) {
        navigate(DASHBOARD_ROUTE);
      }
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch("/api/stores/my");
        const data = await res.json();
        if (res.ok) {
          setStore(data.data.store);
        } else if (res.status === 404) {
          // If no store found, redirect to creation flow
          navigate(CATEGORY_ROUTE);
        }
      } catch (err) {
        console.error("Failed to fetch store", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
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
          <StatCard label="Total Products" value="0" delta="+0%" />
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
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#c8d1da]" />
              <p className="mt-4 font-extrabold text-[#626c76]">No orders yet</p>
              <p className="mt-1 text-sm font-semibold text-[#7a838d]">Orders will appear here once you start selling.</p>
            </div>
          </section>
          <TipBox title="Pro Tip: Getting Started">Add your first product to get your store ready for customers. Use high-quality photos for best results.</TipBox>
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
        const res = await fetch("/api/products/my");
        const data = await res.json();
        if (res.ok) {
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
      // Use FormData for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      
      images.forEach((file) => {
        data.append("images", file);
      });

      const res = await fetch("/api/products", {
        method: "POST",
        body: data, // No Content-Type header needed, browser sets it for FormData
      });

      const result = await res.json();

      if (res.ok) {
        navigate(PRODUCTS_ROUTE);
      } else {
        setError(result.message || "Failed to save product");
      }
    } catch (err) {
      setError("Something went wrong during upload");
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
  const storeName = store?.name || user?.businessName || user?.name || "My Store";

  useEffect(() => {
     fetch("/api/stores/my")
      .then(res => res.json())
      .then(data => { if(data.success) setStore(data.data.store) });
  }, []);

  return (
    <main className="min-h-[100dvh] bg-[#edf2f6] text-[#2e333b]">
      <AdminTopbar action={<Link className="rounded-md bg-[#0f756b] px-5 py-2.5 text-sm font-extrabold text-white" to={PUBLISH_ROUTE}>Publish</Link>} title="ShopGenie" />
      <div className="grid min-h-[calc(100dvh-4rem)] w-full gap-4 p-4 lg:grid-cols-[230px_minmax(0,1fr)_300px]">
        <aside className="rounded-md bg-white p-4 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Add Components</h2>{[["Text", "Headlines, paragraphs, and descriptions."], ["Image", "Showcase your products or storefront."], ["Product Grid", "A dynamic display of your top items."], ["Contact Form", "Let customers reach out directly."]].map(([a,b])=><div className="mt-4 rounded-md bg-[#f3f7fa] p-4" key={a}><p className="font-extrabold">{a}</p><p className="mt-1 text-xs font-semibold text-[#69737e]">{b}</p></div>)}</aside>
        <section className="mx-auto w-full max-w-3xl rounded-md bg-white p-8 shadow-sm"><nav className="flex justify-between text-sm font-semibold"><strong className="text-xl text-[#0f6f66]">{storeName}</strong><span>Shop</span><span>Our Story</span><span>Contact</span></nav><div className="mt-16 grid items-center gap-8 md:grid-cols-2"><div><h1 className="text-5xl font-extrabold leading-tight tracking-[-0.06em]">Crafted with <span className="text-[#0f6f66]">Soul.</span></h1><p className="mt-6 font-semibold leading-7 text-[#626c76]">Bespoke ceramics and textiles created locally. Every piece tells a unique story.</p><button className="mt-8 rounded-md bg-[#0f756b] px-6 py-3 font-extrabold text-white">Explore Collection</button></div><div className="aspect-square rounded-xl bg-[url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" /></div><h2 className="mt-20 text-2xl font-extrabold">New Arrivals</h2></section>
        <aside className="rounded-md bg-white p-4 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Component Settings</h2><div className="mt-5 aspect-video rounded-md bg-[url('https://images.unsplash.com/photo-1595433409683-943ded8cfb1c?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center" /><p className="mt-5 text-sm font-extrabold">Visual Style</p><div className="mt-3 grid grid-cols-2 gap-3"><button className="rounded-md border-2 border-[#0f756b] py-3 text-xs font-extrabold">Portrait</button><button className="rounded-md bg-[#eef2f5] py-3 text-xs font-extrabold">Landscape</button></div><TipBox className="mt-5" title="AI Tip">High-quality images with rounded corners make your store feel premium.</TipBox><button className="mt-8 w-full rounded-md bg-[#ffe4e4] py-3 font-extrabold text-[#d43238]">Remove Component</button></aside>
      </div>
    </main>
  );
}

export function OrdersPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl"><h1 className="text-3xl font-extrabold text-[#0f6f66]">Orders & Inquiries</h1><p className="font-semibold text-[#626c76]">Manage your customer requests and sales in one place.</p><div className="mt-7 grid gap-5 md:grid-cols-3"><StatCard label="Total Orders" value="0" delta="+0%" /><StatCard label="Active Inquiries" value="0" delta="0 awaiting response" /><StatCard label="Completion Rate" value="0%" delta="No data yet" /></div><div className="mt-7 overflow-hidden rounded-md bg-white shadow-sm"><div className="flex flex-wrap justify-between gap-3 bg-[#edf2f6] p-4"><div className="flex h-10 min-w-64 items-center gap-2 rounded bg-white px-3 text-sm font-semibold text-[#7a838d]"><Search className="h-4 w-4" />Search customer, order ID, or keyword...</div><button className="rounded bg-[#0f756b] px-4 py-2 text-sm font-extrabold text-white">New Order</button></div><div className="py-12 text-center"><MessageSquare className="mx-auto h-12 w-12 text-[#c8d1da]" /><p className="mt-4 font-extrabold text-[#626c76]">No orders yet</p><p className="mt-1 text-sm font-semibold text-[#7a838d]">Orders will appear here once customers start purchasing.</p></div></div><TipBox className="mt-7" title="Did you know?">Responding to inquiries within 2 hours increases conversion rates by nearly 45%.</TipBox></div>
    </AdminLayout>
  );
}

export function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl"><h1 className="text-3xl font-extrabold text-[#0f6f66]">Shop Performance</h1><p className="font-semibold text-[#626c76]">See how your business is growing this month.</p><div className="mt-7 grid gap-5 md:grid-cols-3"><StatCard icon={BarChart3} label="Total Visitors" value="0" delta="+0%" /><StatCard icon={Grid2X2} label="Product Views" value="0" delta="+0%" /><TipBox title="Pro Tip">Start promoting your store to see traffic grow!</TipBox></div><div className="mt-7 grid gap-6 lg:grid-cols-2"><ChartCard title="Store Visitors" type="empty" /><ChartCard title="Product Views" type="empty" /></div><section className="mt-8 rounded-md bg-white p-8 text-center shadow-sm"><h2 className="text-2xl font-extrabold">Ready to grow even more?</h2><p className="mx-auto mt-3 max-w-xl font-semibold text-[#626c76]">Our deep-dive reports can show exactly where your customers are coming from.</p><button className="mt-6 rounded-md bg-[#0f756b] px-7 py-3 font-extrabold text-white">Download PDF Report</button></section></div>
    </AdminLayout>
  );
}

function ChartCard({ title, type }) {
  return (
    <section className="rounded-md bg-[#e4e9ef] p-6">
      <h2 className="font-extrabold">{title}</h2>
      <div className="mt-5 flex h-64 items-center justify-center rounded-md bg-white p-7">
        <div className="text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-[#c8d1da]" />
          <p className="mt-4 font-extrabold text-[#626c76]">No data yet</p>
          <p className="mt-1 text-sm font-semibold text-[#7a838d]">Data will appear here once you start getting visitors.</p>
        </div>
      </div>
    </section>
  );
}

export function SettingsPage() {
  const { user } = useAuth();
  const [store, setStore] = useState(null);

  useEffect(() => {
     fetch("/api/stores/my")
      .then(res => res.json())
      .then(data => { if(data.success) setStore(data.data.store) });
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl"><h1 className="text-5xl font-extrabold tracking-[-0.06em]">Settings</h1><p className="mt-1 font-semibold text-[#626c76]">Manage your shop&apos;s identity, digital address, and communication channels.</p><section className="mt-8 rounded-md bg-white p-7 shadow-sm"><h2 className="text-xl font-extrabold text-[#0f6f66]">Store Details</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><label><span className="text-xs font-extrabold uppercase">Store Name</span><input className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold" defaultValue={store?.name || user?.businessName || ""} /></label><label><span className="text-xs font-extrabold uppercase">Brand Logo</span><div className="mt-2 flex items-center gap-3"><span className="rounded bg-[#ffdb80] px-4 py-3 font-bold">{(store?.name || user?.businessName || "BS").slice(0, 2).toUpperCase()}</span><button className="rounded border border-[#0f756b] px-4 py-3 font-bold text-[#0f756b]">Change Logo</button></div></label></div><label className="mt-6 block"><span className="text-xs font-extrabold uppercase">Owner Name</span><input className="mt-2 h-12 w-full rounded bg-[#dbe1e7] px-4 font-semibold" defaultValue={user?.name || ""} /></label></section><div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]"><section className="rounded-md bg-white p-7 shadow-sm"><h2 className="text-xl font-extrabold text-[#0f6f66]">Domain Management</h2><TipBox className="mt-4" title="Pro Tip">Using a custom domain like .com increases customer trust by 45%.</TipBox><div className="mt-6 rounded bg-[#dbe1e7] p-4 text-center font-extrabold">{store?.slug || (user?.businessName ? user.businessName.toLowerCase().replace(/\s+/g, "-") : "your-store")}.shopgenie.store</div><button className="mt-4 w-full rounded border border-dashed border-[#87919c] py-3 font-bold">Connect a custom domain</button></section><section className="rounded-md bg-[#e4e9ef] p-7 shadow-sm"><h2 className="font-extrabold text-[#0f6f66]">Site Visibility</h2>{["Online Now","Search Engines"].map(x=><div className="mt-5 flex justify-between font-bold" key={x}><span>{x}</span><span className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${store?.isPublished ? 'bg-[#0f756b]' : 'bg-gray-400'}`} />{store?.isPublished ? 'Active' : 'Offline'}</span></div>)}<button className={`mt-6 w-full rounded-md py-3 font-extrabold text-white ${store?.isPublished ? 'bg-[#d43238]' : 'bg-[#0f756b]'}`}>{store?.isPublished ? 'Go Offline' : 'Go Online'}</button></section></div></div>
    </AdminLayout>
  );
}

export function PublishPage() {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
     fetch("/api/stores/my")
      .then(res => res.json())
      .then(data => { if(data.success) setStore(data.data.store) });
  }, []);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch("/api/stores/publish", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setStore(data.data.store);
      }
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