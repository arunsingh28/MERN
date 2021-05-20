import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/')
        }
    }, [history])

    const handleForm = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/auth/login',
                { password, email },
                config)
            localStorage.setItem('authToken', data.token)
            history.push('/')

        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="card card-outline-secondary container">
            <div className="card-header">
                <h3 className="mb-0">Login</h3>
            </div>
            { error && <span className="alert alert-danger mt-2">{error}</span>}
            <div className="card-body">
                <form onSubmit={handleForm}>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Email</label>
                        <input type="email" className="form-control" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>


                    <div className="form-group my-3">
                        <button className="btn btn-success float-right" type="submit">Login</button>
                    </div>
                    <Link to="/register">if you don't have an account ?</Link>
                </form>
            </div>
        </div>
    )
}

export default Login


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";


// const LoginScreen = ({ history }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (localStorage.getItem("authToken")) {
//       history.push("/");
//     }
//   }, [history]);

//   const loginHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       header: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         "/api/auth/login",
//         { email, password },
//         config
//       );

//       localStorage.setItem("authToken", data.token);

//       history.push("/");
//     } catch (error) {
//       setError(error.response.data.error);
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="login-screen">
//       <form onSubmit={loginHandler} className="login-screen__form">
//         <h3 className="login-screen__title">Login</h3>
//         {error && <span className="error-message">{error}</span>}
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             required
//             id="email"
//             placeholder="Email address"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             tabIndex={1}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">
//             Password:{" "}
//             <Link to="/forgotpassword" className="login-screen__forgotpassword">
//               Forgot Password?
//             </Link>
//           </label>
//           <input
//             type="password"
//             required
//             id="password"
//             autoComplete="true"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             tabIndex={2}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>

//         <span className="login-screen__subtext">
//           Don't have an account? <Link to="/register">Register</Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default LoginScreen;
