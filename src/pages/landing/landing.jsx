import { useRef } from 'react';
import landingPageStyles from './landing.module.css';
import Navbar from '../../components/Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Bubble,
  Convert3DCube,
  ReceiptSquare,
  Brush2,
  ChartCircle,
  TickSquare,
  RecordCircle,
} from 'iconsax-react';
import Footer from '../../components/Footer';
import CommunityImage from '../../assets/general/CommunityImage.png';
import IconSquare from '../../assets/general/iconsquare.webp';
import heroImage from '../../assets/general/heroImage.svg';
import AboutUsImage from '../../assets/general/AboutusImage.png';

import { Link } from 'react-router-dom';

const Landing = () => {
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutUsRef = useRef(null);
  const heroTaglines = [
    'Ignite Discussion, Inspire Growth: Welcome to AltCamp',
    'Collaborate, Communicate, Succeed: AltCamp is Here',
    'Streamline Communication, Amplify Knowledge: AltCamp',
  ];

  const outroTaglines = [
    'Access and share resources',
    'Create and join communities of like minds',
    'Collaborate with students from other tracks',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Adjust the speed as needed
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800, // Adjust the speed as needed
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <>
      <Navbar
        homeRef={homeRef}
        aboutUsRef={aboutUsRef}
        featuresRef={featuresRef}
      />
      <div>
        <div className={landingPageStyles['intro-area']} ref={homeRef}>
          <div className={landingPageStyles['intro-text-area']}>
            {/* <h1>Transform your skills and learn the easy way</h1> */}
            <Slider {...settings} className={landingPageStyles['slider-area']}>
              {heroTaglines.map((tagline, index) => (
                <div key={index} className="tagline">
                  <h1>{tagline}</h1>
                </div>
              ))}
            </Slider>
            <p>
              A community for Altschoolers that provides easy access to
              assistance from peers and mentors.
            </p>
            <Link to="/account/login">
              <button>Get Started</button>
            </Link>
          </div>
          <div className={landingPageStyles['intro-image-area']}>
            <img src={heroImage} alt="" />
          </div>
        </div>
      </div>
      <div className={landingPageStyles['about-us-area']} ref={aboutUsRef}>
        <div className={landingPageStyles['about-us-image-area']}>
          <div
            className={`${landingPageStyles['decor-box']} ${landingPageStyles['decor-box-1']}`}
          ></div>
          <div className={landingPageStyles['about-us-image']}>
            <img src={CommunityImage} alt="about us image" />
            <img
              className={landingPageStyles['about-us-image-lg']}
              src={AboutUsImage}
              alt="about us image"
            />
          </div>
          <div
            className={`${landingPageStyles['decor-box']} ${landingPageStyles['decor-box-2']}`}
          ></div>
        </div>
        <div className={landingPageStyles['about-us-text']}>
          <h2>About Us</h2>
          <h3>LEARN WITH OTHERS</h3>
          <p>
            With the increasing desire to move formal education from the regular
            four walls to virtual spaces comes the need to improve virtual
            communication to suit academic purposes. More than ever, there’s a
            need to ensure that students from various locations do not learn in
            isolation. There is a need to ensure that students in a virtual
            school can co-learn and even build interpersonal relationships
            outside of the academic content they consume.
          </p>
          <p>
            AltCamp is a computer-mediated communication (CMC) product by
            AltSchool. It allows smooth communication among students and
            lecturers.
          </p>
        </div>
      </div>
      <div className={landingPageStyles['tracks-area']}>
        <h2>Tracks on AltCamp</h2>
        <div className={landingPageStyles['tracks-container']}>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Frontend Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Product Design</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Data Analysis</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Backend Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Product Marketing</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Data Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Cloud Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Product Management</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size="32" variant="Bold" />
            <p>Data Science</p>
          </div>
        </div>
      </div>
      <div className={landingPageStyles['benefits-area']} ref={featuresRef}>
        <h5>WHY JOIN US</h5>
        <h2>Features of AltCamp</h2>
        <div className={landingPageStyles['benefits-container']}>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Convert3DCube size="40" />
            </div>
            <h3>Interactive Community</h3>
            <p>
              AltCamp allows you to meet and interact with people that are into
              similar career and learn with and from them
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Bubble size="40" />
            </div>
            <h3>Learning Resources</h3>
            <p>
              You will have access to the learning resources that have been
              uploaded by people who are in your track
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <RecordCircle size="40" />
            </div>
            <h3>Access to Mentors</h3>
            <p>
              AltCamp has mentors that are knowledgeable in different tech
              careers and they give answers to any question you may have
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <ReceiptSquare size="40" />
            </div>
            <h3>Career Growth</h3>
            <p>
              Actively participating in the community provided will have your
              learning process and therefore help your career
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Brush2 size="40" />
            </div>
            <h3>Skill Analysis</h3>
            <p>
              There are different breakdown of skills for each track and quizzes
              are available in order for you to assess your skills
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <ChartCircle size="40" />
            </div>
            <h3>Learning Circle</h3>
            <p>
              For Altschoolers who have learning circle, AltCamp allows you to
              interact with your circle members as a group
            </p>
          </div>
        </div>
        <Link to="/account/login">
          <button>Get Started</button>
        </Link>
      </div>
      <div className={landingPageStyles['outro-area']}>
        <div className={landingPageStyles['icon-boxes-area']}>
          <img
            src={IconSquare}
            alt="Icon square"
            className={landingPageStyles['icon-square-img']}
          />
        </div>

        <div className={landingPageStyles['call-to-action-area']}>
          {/* <h1>Learn and share knowledge the easy way</h1> */}
          <Slider {...settings2} className={landingPageStyles['slider-area']}>
            {outroTaglines.map((tagline, index) => (
              <div key={index} className="tagline">
                <h1>{tagline}</h1>
              </div>
            ))}
          </Slider>
          <p>
            Share what you know even as you learn what you do not know in the
            most convenient way.
          </p>
          <Link to="/account/login">
            <button>Get Started</button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
