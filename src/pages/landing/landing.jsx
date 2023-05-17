import landingPageStyles from './landing.module.css'
import Navbar from '../../components/MainNavbar'
import {
  Bubble,
  Convert3DCube,
  ReceiptSquare,
  Brush2,
  ChartCircle,
  TickSquare,
  RecordCircle
} from 'iconsax-react'
import Footer from '../../components/Footer'
import heroImage from '../../assets/general/Students-reading.webp'
import heroImage2 from '../../assets/general/Team-demonstration.webp'
import codeIcon from '../../assets/icons/code.png'
import figmaIcon from '../../assets/icons/figma.png'
import notionIcon from '../../assets/icons/notion.png'
import pieIcon from '../../assets/icons/pie.png'
import pythonIcon from '../../assets/icons/python.png'

import IconSquare from '../../assets/general/iconsquare.webp'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className={landingPageStyles['intro-area']}>
          <h1>Getting answers made easy for you</h1>
          <p>
            A community for Altschoolers that provides easy access to assistance
            from peers and mentors to expand your knowledge.
          </p>
          <button>
            <a href='/regularstudent/login'>Get Started</a>
          </button>
        </div>
      </div>
      <div className={landingPageStyles['about-us-area']}>
        <div className={landingPageStyles['about-us-text']}>
          <h2>About Us</h2>
          <p>
            Study Buddy is an online e-learning interactive platform that allows
            Altschoolers post questions on the community, interact with other
            community members and also receive feedbacks and responses from
            other students, instructors and mentors
          </p>
        </div>
        <div className={landingPageStyles['about-us-image-area']}>
          <div
            className={`${landingPageStyles['decor-box']} ${landingPageStyles['decor-box-1']}`}
          ></div>
          <div className={landingPageStyles['about-us-image']}>
            <img src={heroImage2} alt='' />
          </div>
          <div
            className={`${landingPageStyles['decor-box']} ${landingPageStyles['decor-box-2']}`}
          ></div>
        </div>
      </div>
      <div className={landingPageStyles['tracks-area']}>
        <h2>Tracks on StudyBuddy</h2>
        <div className={landingPageStyles['tracks-container']}>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Frontend Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Product Design</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Data Analysis</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Backend Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Product Marketing</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Data Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Cloud Engineering</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Product Management</p>
          </div>
          <div className={landingPageStyles['track']}>
            <TickSquare size='32' variant='Bold' />
            <p>Data Science</p>
          </div>
        </div>
      </div>
      <div className={landingPageStyles['benefits-area']}>
        <h5>WHY JOIN US</h5>
        <h2>Benefits of joining Study Buddy</h2>
        <div className={landingPageStyles['benefits-container']}>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Convert3DCube size='40' />
            </div>
            <h3>Interactive Community</h3>
            <p>
              Study Buddy allows you to meet and interact with people that are
              into similar career and learn with and from them
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Bubble size='40' />
            </div>
            <h3>Learning Resources</h3>
            <p>
              You will have access to the learning resources that have been
              uploaded by people who are in your track
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <RecordCircle size='40' />
            </div>
            <h3>Access to Mentors</h3>
            <p>
              Study Buddy has mentors that are knowledgeable in different tech
              careers and they give answers to any question you may have
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <ReceiptSquare size='40' />
            </div>
            <h3>Career Growth</h3>
            <p>
              Actively participating in the community provided will have your
              learning process and therefore help your career
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <Brush2 size='40' />
            </div>
            <h3>Skill Analysis</h3>
            <p>
              There are different breakdown of skills for each track and quizzes
              are available in order for you to assess your skills
            </p>
          </div>
          <div className={landingPageStyles['benefit-card']}>
            <div className={landingPageStyles['benefit-icon']}>
              <ChartCircle size='40' />
            </div>
            <h3>Learning Circle</h3>
            <p>
              For Altschoolers who have learning circle, Study Buddy allows you
              to interact with your circle members as a group
            </p>
          </div>
        </div>
          <button>
            <a href='/regularstudent/login'>Get Started</a>
          </button>
      </div>
      <div className={landingPageStyles['outro-area']}>
        <div className={landingPageStyles['icon-boxes-area']}>
          <img
            src={IconSquare}
            alt='Icon square'
            className={landingPageStyles['icon-square-img']}
          />
        </div>

        <div className={landingPageStyles['call-to-action-area']}>
          <h1>Learn and share knowledge the easy way</h1>
          <p>
            Share what you know even as you learn what you do not know in the
            most convenient way.
          </p>
          <button>
            <a href='/regularstudent/login'>Get Started</a>
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Landing
