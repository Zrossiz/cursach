import { RegistrationForm } from "@/page-components/RegistrationForm/RegistrationForm";
import styles from './Registration.module.scss';

const RegistrationPage = () => {
    return (
        <div className={styles.wrapper}>
            <RegistrationForm />
        </div>
    )
}

export default RegistrationPage;