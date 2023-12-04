import './footer.css';

function Footer() {
    return (
        <footer className="container">
            <hr className='container footer_hr'></hr>
            <div className="row text-start footer">
                <div className="col-4">
                    <h5>About</h5>
                    <p>How to purchase</p>
                    <p>FAQ</p>
                    <p>What is Notos?</p>
                </div>
                <div className="col-4">
                    <h5>Services</h5>
                    <p>Privacy</p>
                    <p>Terms & Conditions</p>
                    <p>Payments</p>
                </div>
                <div className="col-4">
                    <h5>Contact</h5>
                    <p>Tel:+123 456 890</p>
                    <p>Fax:456 890</p>
                    <p>NotosCoffee@gmail.com</p>
                </div>
            </div>
            <hr className='container'></hr>
            <div className="copyright"> <h5>Copyright © 2023 by Anh Van. All Rights
                Reserved.</h5></div>
        </footer>
    );
}
export default Footer;