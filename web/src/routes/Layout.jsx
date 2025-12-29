export const Layout = ({ children }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <nav  style={{
                width: '100%',
                height: '60px',
                background: 'white',
                padding: '0 50px',
                display: 'flex',
                "flex-direction": "row",
                "align-items": "center",
                gap: '30px',
                position: 'fixed',
                top: 0,
                left: 0,
            }}>
                <a href="/"><img  src="/logo.webp" width={50} height={50}/></a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms and Conditions</a>
            </nav>

            <div  style={{ width: '100%', height: '100%', "margin-top": '60px', "background": "black" }}>
                {children}
            </div>
        </div>
    )
}