import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Loader2,
  ShoppingCart,
  Search,
  ArrowRight
} from "lucide-react";

export default function StoreView() {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const res = await fetch(`/api/stores/${slug}`);
        const data = await res.json();
        
        if (res.ok) {
          setStore(data.data.store);
          setProducts(data.data.products);
        } else {
          setError(data.message || "Store not found");
        }
      } catch (err) {
        setError("Failed to load store");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-[#0f756b]" />
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#f4f7f9] px-4 text-center">
        <h1 className="text-4xl font-black text-[#2e333b]">404</h1>
        <p className="mt-2 text-lg font-bold text-[#626c76]">{error || "This shop doesn't exist yet."}</p>
        <Link to="/" className="mt-6 rounded-md bg-[#0f756b] px-6 py-3 font-bold text-white shadow-lg">
          Back to ShopGenie
        </Link>
      </div>
    );
  }

  // Define theme-specific styles
  const themes = {
    modern: {
      bg: "bg-white",
      text: "text-slate-900",
      accent: "bg-[#0f756b]",
      accentText: "text-[#0f756b]",
      card: "bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow",
      nav: "bg-white/80 backdrop-blur-md border-b border-slate-100",
      font: "font-sans"
    },
    classic: {
      bg: "bg-[#fdfbf7]",
      text: "text-[#3e2f28]",
      accent: "bg-[#8b5e3c]",
      accentText: "text-[#8b5e3c]",
      card: "bg-white border border-[#e5dec9] shadow-sm",
      nav: "bg-[#fdfbf7] border-b border-[#e5dec9]",
      font: "font-serif"
    },
    bright: {
      bg: "bg-white",
      text: "text-[#1a1a1a]",
      accent: "bg-[#ff4d4d]",
      accentText: "text-[#ff4d4d]",
      card: "bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
      nav: "bg-white border-b-2 border-[#1a1a1a]",
      font: "font-sans"
    },
    minimal: {
      bg: "bg-[#fafafa]",
      text: "text-[#111]",
      accent: "bg-black",
      accentText: "text-black",
      card: "bg-transparent",
      nav: "bg-transparent",
      font: "font-sans"
    }
  };

  const activeTheme = themes[store.theme] || themes.modern;

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} ${activeTheme.font}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 px-4 py-4 sm:px-8 ${activeTheme.nav}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight">
            {store.logo ? <img src={store.logo} alt={store.name} className="h-8" /> : store.name}
          </h1>
          
          <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider md:flex">
            <a href="#home" className="hover:opacity-70">Home</a>
            <a href="#products" className="hover:opacity-70">Shop</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:opacity-70"><Search className="h-5 w-5" /></button>
            <button className="relative p-2 hover:opacity-70">
              <ShoppingCart className="h-5 w-5" />
              <span className={`absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${activeTheme.accent}`}>0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className={`inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-white ${activeTheme.accent}`}>
                Welcome to {store.name}
              </span>
              <h2 className="mt-6 text-5xl font-black leading-tight sm:text-7xl">
                Elevate Your <span className={activeTheme.accentText}>Style.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed opacity-70">
                {store.description || "Discover our curated collection of premium products, designed for those who appreciate quality and craftsmanship."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#products" className={`rounded-full px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 ${activeTheme.accent}`}>
                  Shop Collection
                </a>
                <button className="rounded-full border border-current px-8 py-4 font-bold transition-colors hover:bg-current hover:text-white">
                  Our Story
                </button>
              </div>
            </div>
            <div className="relative">
              <div className={`aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 ${store.theme === 'bright' ? 'border-2 border-black' : ''}`}>
                 <img 
                  src={store.banner || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"} 
                  alt="Hero Banner" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Features */}
      <section className="bg-slate-50 px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { title: "Free Delivery", desc: "On all orders over $50" },
              { title: "24/7 Support", desc: "Always here to help" },
              { title: "Easy Returns", desc: "30-day money back guarantee" }
            ].map(f => (
              <div key={f.title} className="text-center">
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm font-medium opacity-60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 border-b border-current/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight">Featured Products</h2>
              <p className="mt-2 font-medium opacity-60">Our most popular items this week.</p>
            </div>
            <button className={`flex items-center gap-2 font-bold ${activeTheme.accentText}`}>
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className={`group overflow-hidden rounded-2xl ${activeTheme.card}`}>
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img 
                      src={product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase opacity-50">{product.category}</p>
                    <h3 className="mt-1 text-lg font-bold">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-black">${product.price}</span>
                      <button className={`rounded-full p-2 text-white shadow-md transition-transform active:scale-95 ${activeTheme.accent}`}>
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-4 text-lg font-bold opacity-40">No products listed yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className={`mt-20 px-4 py-20 sm:px-8 border-t border-current/5`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black">{store.name}</h2>
              <p className="mt-6 max-w-md text-lg font-medium opacity-60">
                {store.description || "Building a better shopping experience for our local community. Quality you can trust."}
              </p>
              <div className="mt-8 flex gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 hover:bg-current hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 hover:bg-current hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 hover:bg-current hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest">Get in touch</h4>
              <ul className="mt-6 space-y-4 font-bold opacity-60">
                <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> {store.phone || "+1 (555) 000-0000"}</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> {store.email || `hello@${slug}.com`}</li>
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4" /> {store.address?.city || "Local City"}, {store.address?.state || "IN"}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-widest">Powered By</h4>
              <Link to="/" className="mt-6 block text-xl font-black text-[#0f756b]">ShopGenie</Link>
              <p className="mt-2 text-xs font-bold opacity-40">Build your store in minutes.</p>
            </div>
          </div>
          
          <div className="mt-20 border-t border-current/10 pt-8 text-center text-xs font-bold opacity-40">
            &copy; {new Date().getFullYear()} {store.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}