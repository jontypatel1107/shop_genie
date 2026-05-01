import { useEffect } from "react";

const SEO = ({ title, description, keywords, ogImage, ogType = "website", canonical }) => {
  const defaultTitle = "ShopGenie";
  const defaultDescription = "Build stunning websites for your local shop in minutes. No coding required.";
  const siteName = "ShopGenie";

  const finalTitle = title ? `${title} | ShopGenie` : defaultTitle;
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    document.title = finalTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", finalDescription);
    setMeta("keywords", keywords || "no-code website builder, local shop website, e-commerce, ShopGenie, online store builder");
    setMeta("og:title", finalTitle, true);
    setMeta("og:description", finalDescription, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", siteName, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", finalTitle);
    setMeta("twitter:description", finalDescription);

    if (ogImage) {
      setMeta("og:image", ogImage, true);
      setMeta("twitter:image", ogImage);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [finalTitle, finalDescription, keywords, ogImage, ogType, canonical]);

  return null;
};

export default SEO;
