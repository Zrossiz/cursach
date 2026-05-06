import { useState } from "react"
import { userRegistration } from "@/api/user";
import { returnMessageFromAxiosErr } from "@/utils/error";
import styles from './RegistrationForm.module.scss';
import { Link } from "react-router-dom";

export const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitPassword, setRepitPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false)

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

        if (repitPassword !== password) {
            setErrorMessage("Пароли не совпадают")
            return
        }

        try {
            await userRegistration(email, password);
            setSuccess(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        } catch (err) {
            setErrorMessage(returnMessageFromAxiosErr(err))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Регистрация</div>
            {errorMessage !== "" && (
                <div>Ошибка: {errorMessage}</div>
            )}
            {success && (
                <div>Успешная регистрация!</div>
            )}
            <div className={styles.inputsWrapper}>
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
                <input 
                    type="password" 
                    placeholder="Повторите пароль"
                    value={repitPassword} 
                    onChange={
                        (e) => setRepitPassword(e.target.value)
                    } 
                />
                <button onClick={submit}>Регистрация</button>
            </div>
            <div className={styles.loginRedirect}>
                <Link to={"/login"}>Аутентификация</Link>
            </div>
        </div>
    )
}