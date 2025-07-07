import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const FooterPanel = () => {
  const axiosPublic = useAxiosPublic();

  const [footerData, setFooterData] = useState({
    _id: "",
    quickLinks: [],
    socialLinks: [],
    contact: {
      phone: "",
      email: "",
      address: "",
    },
  });

  const [editSocialUrl, setEditSocialUrl] = useState({});
  const [editQuickLinkUrl, setEditQuickLinkUrl] = useState({});
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const fetchFooterData = useCallback(async () => {
    try {
      const res = await axiosPublic.get("/api/footer-links");
      setFooterData(res.data);
      setContact(res.data.contact);
    } catch (err) {
      console.error("Failed to fetch footer data:", err);
    }
  }, [axiosPublic]);

  useEffect(() => {
    fetchFooterData();
  }, [fetchFooterData]);

  const handleQuickLinkChange = (index, newUrl) => {
    setEditQuickLinkUrl((prev) => ({ ...prev, [index]: newUrl }));
  };

  const handleSocialLinkChange = (icon, newUrl) => {
    setEditSocialUrl((prev) => ({ ...prev, [icon]: newUrl }));
  };

  const updateQuickLinks = async () => {
    try {
      const updatedLinks = footerData.quickLinks.map((link, index) => ({
        _id: link._id,
        name: link.name,
        url: editQuickLinkUrl[index] ?? link.url,
      }));

      await axiosPublic.put("/api/footer-links/quickLinks", {
        _id: footerData._id,
        quickLinks: updatedLinks,
      });

      setEditQuickLinkUrl({});
      toast.success("Quick links updated successfully");
      fetchFooterData();
    } catch {
      toast.error("Failed to update quick links");
    }
  };

  const updateSocialLinks = async () => {
    try {
      const updatedSocial = footerData.socialLinks.map((link) => ({
        _id: link._id,
        name: link.name,
        url: editSocialUrl[link.icon] ?? link.url,
        icon: link.icon,
      }));

      await axiosPublic.put("/api/footer-links/socialLinks", {
        _id: footerData._id,
        socialLinks: updatedSocial,
      });

      setEditSocialUrl({});
      toast.success("Social links updated successfully");
      fetchFooterData();
    } catch {
      toast.error("Failed to update social links");
    }
  };

  const updateContact = async () => {
    try {
      await axiosPublic.put("/api/footer-links/contact", {
        _id: footerData._id,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
      });

      toast.success("Contact info updated successfully");
      fetchFooterData();
    } catch {
      toast.error("Failed to update contact info");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Quick Links */}
      <h2 className="text-xl font-bold mb-2">Quick Links</h2>
      {(footerData.quickLinks || []).map((link, index) => (
        <div key={link._id || index} className="flex items-center mb-2 gap-2">
          <label className="w-24">{link.name}:</label>
          <input
            type="text"
            defaultValue={link.url}
            onChange={(e) => handleQuickLinkChange(index, e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
          />
        </div>
      ))}
      <button className="btn btn-primary my-2" onClick={updateQuickLinks}>
        Update Quick Links
      </button>

      {/* Social Links */}
      <h2 className="text-xl font-bold mt-6 mb-2">Follow Us Links</h2>
      {(footerData.socialLinks || []).map((link) => (
        <div
          key={link._id || link.icon}
          className="flex items-center mb-2 gap-2"
        >
          <label className="w-24 capitalize">{link.icon}:</label>
          <input
            type="text"
            defaultValue={link.url}
            onChange={(e) => handleSocialLinkChange(link.icon, e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
          />
        </div>
      ))}
      <button className="btn btn-primary my-2" onClick={updateSocialLinks}>
        Update Follow Us Links
      </button>

      {/* Contact Info */}
      <h2 className="text-xl font-bold mt-6 mb-2">Contact Info</h2>
      <div className="mb-2">
        <label className="block">Phone:</label>
        <input
          type="text"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block">Email:</label>
        <input
          type="text"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block">Address:</label>
        <textarea
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <button className="btn btn-primary my-2" onClick={updateContact}>
        Update Contact Info
      </button>
    </div>
  );
};

export default FooterPanel;
