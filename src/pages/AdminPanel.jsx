import ChannelPanel from "../components/ChannelPanel";
import FooterPanel from "../components/FooterPanel";
import SliderPanel from "../components/SliderPanel";

const AdminPanel = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <SliderPanel />
      <hr className="my-6" />
      <ChannelPanel />
      <hr className="my-6" />
      <FooterPanel />
    </div>
  );
};

export default AdminPanel;
