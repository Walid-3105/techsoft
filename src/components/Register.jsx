import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axiosPublic.post("/api/register", {
        email,
        password,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Register
      </button>
    </form>
  );
};

export default Register;
