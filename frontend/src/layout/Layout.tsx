import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import type { LayoutProps } from "./Layout.props"

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout