const Login = () => {
    return (
        <>
            <h1>Sign in</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button>Log in</button>
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" name="" id="remember-me" />
            <a href="">Forgot password</a>
        </>
    )
}

export default Login