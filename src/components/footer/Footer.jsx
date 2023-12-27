import React from 'react';
import './Footer.css';
import Logo from '../../assets/Flavor_Maison.svg'
import { UilFacebook, UilInstagramAlt, UilTwitter, UilLinkedin } from '@iconscout/react-unicons'

function Footer() {
    return (
        <>
            <footer>
                <div className="f-col f-col-1">
                    <img src={Logo} className='logo' alt='Flavor Mason logo' />
                </div>

                <div className="f-col">

                    <div>
                        <strong>Over ons</strong>
                    </div>

                    <div>
                        <a href='#'>Portfolio</a> <br />
                        <a href='#'>Werken bij</a><br />
                        <a href='#'>Contact</a>
                    </div>

                </div>

                <div className="f-col">
                        <p><strong>Contacteer ons</strong> <br/>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. <br/>
                        Fusce euismod convallis velit
                        <br/>+07001234567</p>
                </div>

                <div className="footer-sm-icons f-col">
                    <a  className="icon color-black" href="#"><UilFacebook/></a>
                    <a  className="icon color-black" href="#"><UilInstagramAlt/></a>
                    <a  className="icon color-black" href="#"><UilTwitter/></a>
                    <a  className="icon color-black" href="#"><UilLinkedin/></a>
                </div>
                <div className='copyright'><span>Copyright© 2023 Nuray Tuncer Alle rechten voorbehouden</span></div>
            </footer>
        </>
    );
}
export default Footer;