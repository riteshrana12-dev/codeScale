import useSignUp from "../../hooks/signUp.js";

const SignUp = () => {
  const { formData, handleChange, executeSignUp, loading, error } = useSignUp();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await executeSignUp();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
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
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p>{error}</p>}
        <button>{loading ? "signing up..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default SignUp;
