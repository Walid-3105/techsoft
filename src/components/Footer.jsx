import { useEffect, useState } from "react";
import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const iconMap = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
};

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const [footerData, setFooterData] = useState({
    quickLinks: [],
    socialLinks: [],
    contact: {},
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axiosPublic.get("/api/footer-links");
        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        setFooterData({
          quickLinks: data.quickLinks || [],
          socialLinks: data.socialLinks || [],
          contact: data.contact || {},
        });
      } catch (err) {
        console.error("Failed to load footer data:", err);
      }
    };

    fetchFooterData();
  }, [axiosPublic]);

  const { quickLinks, socialLinks, contact } = footerData;

  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <a href="/">
            <img
              className="w-[130px] md:w-[300px] h-[70px] object-cover mb-4 items-start -ml-10"
              src={logo}
              alt=""
            />
          </a>
          <div className="text-xs">
            রঙিলা টিভি একটি আধুনিক ডিজিটাল প্ল্যাটফর্ম, যেখানে আপনি যেকোনো সময়,
            যেকোনো স্থান থেকে সরাসরি টিভি চ্যানেল দেখতে পারবেন। আমাদের লক্ষ্য
            হলো দেশি ও আন্তর্জাতিক মানের বিনোদন সহজে ও ঝামেলাহীনভাবে আপনার হাতের
            মুঠোয় পৌঁছে দেওয়া।
            <br />
            <br />
            আমাদের অ্যাপে রয়েছে:
            <ul className="">
              <li>✅ ১০০০+ লাইভ টিভি চ্যানেল</li>
              <li>✅ এক্সক্লুসিভ মুভি ও ওয়েব সিরিজ </li>
              <li>✅ উন্নতমানের ভিডিও স্ট্রিমিং সুবিধা</li>
              <li>✅ ইউজার ফ্রেন্ডলি ইন্টারফেস</li>
              <li>✅ ২৪/৭ কাস্টমার সাপোর্ট</li>
            </ul>
            <br />
            আমরা বিশ্বাস করি, বিনোদন সবার অধিকার। তাই রঙিলা টিভি প্রতিটি
            ব্যবহারকারীর জন্য নিয়ে এসেছে সহজ, সাশ্রয়ী ও মানসম্মত বিনোদনের এক
            নতুন দিগন্ত।
            <br />
            রঙিলা টিভি — বিনোদনের নতুন ঠিকানা
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Live TV App Link</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, i) => (
              <li key={i} className="">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center"
                >
                  <img
                    src={i % 2 === 0 ? footer1 : footer2}
                    alt={`icon-${i}`}
                    className={"w-10 h-10"}
                  />

                  {link.name || `Link ${i + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            {socialLinks.map((link, i) => {
              const Icon = iconMap[link.icon?.toLowerCase()];
              return (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-2"
                  >
                    {Icon && <Icon />}
                    {link.name || link.icon || `Social ${i + 1}`}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            {contact?.phone && (
              <li className="flex items-start gap-2">
                <FaPhoneAlt className="mt-1" />
                <span>{contact.phone}</span>
              </li>
            )}
            {contact?.email && (
              <li className="flex items-start gap-2">
                <FaEnvelope className="mt-1" />
                <span>{contact.email}</span>
              </li>
            )}
            {contact?.address && (
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                <span>{contact.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-2 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} rangeelaTv. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
