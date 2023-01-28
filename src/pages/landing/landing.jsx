import styles from './landing.module.css'
import Navbar from '../../components/Navbar'
import { Bubble, Convert3DCube, ReceiptSquare, Brush2, ChartCircle } from 'iconsax-react'

const Landing = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className={styles['intro-area']}>
                    <h1>
                        Getting answers made easy for you
                    </h1>
                    <p>
                        A community for Altschoolers that provides  easy access to  assistance from peers and mentors to expand your knowledge.
                    </p>
                    <button>
                        Get Started
                    </button>
                </div>
            </div>
            <div className={styles['about-us-area']}>
                <div className={styles['about-us-text']}>
                    <h2>
                        About Us
                    </h2>
                    <p>
                        Study Buddy is an online e-learning interactive platform that allows Altschoolers  post questions on the community, interact with other community members and also receive feedbacks and responses from other students, instructors and mentors
                    </p>
                </div>
                <div className={styles['about-us-image-area']}>
                    <div className={`${styles['decor-box']} ${styles['decor-box-1']}`}></div>
                    <div className={styles['about-us-image']}>
                        <img src="/Team-demonstration.png" alt="" />
                    </div>
                    <div className={`${styles['decor-box']} ${styles['decor-box-2']}`}></div>
                </div>
            </div>
            <div className={styles['tracks-container']}>
                <h2>Tracks on StudyBuddy</h2>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={styles['benefits-area']}>
                <h5>WHY JOIN US</h5>
                <h2>Benefits of joining Study Buddy</h2>
                <div className={styles['benefits-container']}>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>
                            <Convert3DCube size='40' />
                        </div>
                        <h3>Interactive Community</h3>
                        <p>Study Buddy allows you to meet and interact with people that are into similar career and learn with and from them</p>
                    </div>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>
                            <Bubble size="40" />
                        </div>
                        <h3>Learning Resources</h3>
                        <p>You will have access to the learning resources that have been uploaded by people who are in your track</p>
                    </div>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>

                        </div>
                        <h3>Access to Mentors</h3>
                        <p>Study Buddy has mentors that are knowledgeable in different tech careers and they give answers to any question you may have</p>
                    </div>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>
                        <ReceiptSquare size="40" />
                        </div>
                        <h3>Career Growth</h3>
                        <p>Actively participating in the community provided will have your learning process and therefore help your career</p>
                    </div>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>
                        <Brush2 size="40" />
                        </div>
                        <h3>Skill Analysis</h3>
                        <p>There are different breakdown of skills for each track and quizzes are available in order for you to assess your skills</p>
                    </div>
                    <div className={styles['benefit-card']}>
                        <div className={styles['benefit-icon']}>
<ChartCircle size='40' />
                        </div>
                        <h3>Learning Circle</h3>
                        <p>For Altschoolers who have learning circle, Study Buddy allows you to interact with your circle members as a group</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;


