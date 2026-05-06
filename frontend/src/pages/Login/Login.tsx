import { LoginForm } from "@/page-components/LoginForm/LoginForm"
import styles from './Login.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
    )
}

export default LoginPage