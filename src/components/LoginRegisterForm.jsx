export default function LoginRegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  login,
  register,
  isLogin,
  setIsLogin,
  resetPassword,
}) {
  return (
    <div className={`login-register-form ${!isLogin && "right"}`}>
      <h1>CodeChamp</h1>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLogin ? (
        <div>
          <span onClick={() => setIsLogin(!isLogin)}>
            Belum punya akun? Daftar |
          </span>
          <span onClick={resetPassword}> Lupa Password?</span>
        </div>
      ) : (
        <div>
          <span onClick={() => setIsLogin(!isLogin)}>
            Sudah punya akun? Login
          </span>
        </div>
      )}
      <button onClick={isLogin ? login : register}>
        {isLogin ? "Login" : "Daftar"}
      </button>
    </div>
  );
}
