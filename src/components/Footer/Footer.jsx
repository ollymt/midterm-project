import './Footer.css'
export default function Footer( isOnCard ) {
    return (
        <div className={`footer`}>
            <h1 className="signature">ollymt</h1>
            <a href="https://github.com/ollymt" className="footerlink" target="_blank">github</a>
            <a href="https://open.spotify.com/user/2cfevl384d09m037am3c1japr?si=2d570d01c94241c2" className="footerlink" target="_blank">spotify</a>
            <br />
            /*<p className="tiny">made with 🤍 in react by ollymt <br /> watch superman legacy (not sponsored)</p>*/
        </div>
    )
}