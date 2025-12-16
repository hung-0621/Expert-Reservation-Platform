import "../style/component/Footer.css"

function Footer() {
    const team_name = "TKUIMWD"
    const team_github = "https://github.com/TKUIMWD"

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <span>© 2025 Powered by</span>
                <a href={team_github} target="_blank" rel="noopener noreferrer">
                    {team_name}
                </a>
            </div>
        </footer>
    )
}

export default Footer;