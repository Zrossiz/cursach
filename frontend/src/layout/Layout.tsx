import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import type { LayoutProps } from "./Layout.props"
import styles from './Layout.module.scss'

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout