import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Facebook, Instagram, Twitch, Youtube } from 'iconsax-react'

import mainFooterStyles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={mainFooterStyles['main-footer']}>
            <div className={mainFooterStyles['']}>
                <img src="src\assets\general\Authlogo.png" alt="" />
                <div className={mainFooterStyles['sm-container']}>
                    <div className={mainFooterStyles['sm-link-container']}>
                        <Facebook size='12' variant="Bold" />
                    </div>
                    <div className={mainFooterStyles['sm-link-container']}>
                        <Facebook size='12' variant="Bold" />
                    </div>
                    <div className={mainFooterStyles['sm-link-container']}>
                        <Youtube size='12' variant="Bold" />
                    </div>
                    <div className={mainFooterStyles['sm-link-container']}>
                        <Instagram size='12' />
                    </div>
                    <div className={mainFooterStyles['sm-link-container']}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </div>
                <p>© 2022 - 2023</p>
            </div>
            <div className={mainFooterStyles['main-footer-list']}>
                <h3>Product</h3>
                <p>For AltSchoolers</p>
                <p>For Instructors</p>
                <p>For Mentors</p>
            </div>
            <div className={mainFooterStyles['main-footer-list']}>
                <h3>Features</h3>
                <p>Feature</p>
                <p>Feature</p>
                <p>Feature</p>
            </div>
            <div className={mainFooterStyles['main-footer-list']}>
                <h3>Company</h3>
                <p>Company</p>
                <p>Company</p>
                <p>Company</p>
            </div>
        </footer>
    )
}


export default Footer
