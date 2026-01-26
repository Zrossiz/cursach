import { useState } from "react"
import { userLogin } from "../../api/user";
import { returnMessageFromAxiosErr } from "../../utils/error";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const submit = async () => {
        setErrorMessage("");
        if (email.length < 5 || !email.includes("@")) {
            setErrorMessage("Невалидный email")
            return
        }

        if (password.length < 4) {
            setErrorMessage("Длина пароля должна быть больше 4 символов")
            return
        }

        try {
            await userLogin(email, password);
            setSuccess(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        } catch (err) {
            setErrorMessage(returnMessageFromAxiosErr(err))
        }
    }

    return (
        <div>
            <div>Логин</div>
            {success && (
                <div>Успешная аутентификация!</div>
            )}
            {errorMessage !== "" && (
                <div>Ошибка: {errorMessage}</div>
            )}
            <div>
                <input 
                    type="text" 
                    placeholder="Введите email"
                    value={email} 
                    onChange={
                        (e) => setEmail(e.target.value)
                    } 
                />
                <input 
                    type="password" 
                    placeholder="Введите пароль"
                    value={password} 
                    onChange={
                        (e) => setPassword(e.target.value)
                    } 
                />
                <button onClick={submit}>Логин</button>
            </div>
        </div>
    )
}