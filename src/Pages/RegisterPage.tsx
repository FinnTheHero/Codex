import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { useNotification } from "../Contexts/NotificationContext";
import { Register } from "../Services/authService";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { errors, addError, removeError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 25) {
            addError("Username is too long!");
            return;
        } else {
            errors.forEach((error) => {
                if (error.message === "Username is too long!") {
                    removeError(error.id);
                }
            });
        }
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            !e.target.value.match(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            )
        ) {
            addError("Invalid email!");
            return;
        } else if (e.target.value.length >= 50) {
            addError("Email is too long!");
            return;
        } else if (e.target.value.length <= 5) {
            addError("Email is too short!");
            return;
        } else {
            errors.forEach((error) => {
                if (
                    error.message === "Invalid email!" ||
                    error.message === "Email is too short!" ||
                    error.message === "Email is too long!"
                ) {
                    removeError(error.id);
                }
            });
        }
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 8) {
            addError("Password is too short!");
            return;
        } else if (e.target.value.length >= 25) {
            addError("Password is too long!");
            return;
        } else {
            errors.forEach((error) => {
                if (
                    error.message === "Password is too short!" ||
                    error.message === "Password is too long!"
                ) {
                    removeError(error.id);
                }
            });
        }
        setPassword(e.target.value);
    };

    const HandlerRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!username || username === "") {
            addError("Username is required!");
            return;
        }

        if (!email || email === "") {
            addError("Email is required!");
            return;
        }

        if (!password || password === "") {
            addError("Password is required!");
            return;
        }

        try {
            const response = await Register(username, email, password);
            if (response?.status === 201 && response.data.message) {
                setNotification(response.data.message);
                return navigate("/login");
            }
        } catch (err) {
            addError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl w-full flex flex-col justify-center items-center">
            <form onSubmit={HandlerRegister} className="max-w-sm w-full p-12">
                <div className="flex flex-col justify-evenly pb-2 border-b border-zinc-800">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="search-input mb-3 pl-1"
                        required
                        maxLength={25}
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete={"email"}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="search-input mb-3 pl-1"
                        required
                        maxLength={50}
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={"password"}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="search-input pl-1"
                        required
                        minLength={8}
                        maxLength={25}
                    />
                </div>

                <div className="mt-6 flex flex-col flex-nowrap justify-evenly items-center">
                    <button type="submit" className="link">
                        [Register]
                    </button>
                    <h2 className="my-2">Or</h2>
                    <Link to="/login" className="content">
                        [Login]
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
