import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/signIn";
const SignIn = () => {
  const navigate = useNavigate();
  const { formData, handleChange, executeSignUp, error, loading } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await executeSignUp();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="abc123@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p>{error}</p>}
        <button>{loading ? "signing in..." : "Sign In"}</button>
      </form>
    </div>
  );
};

export default SignIn;
