import styles from './AboutMe.module.css';

function AboutMe() {
  return <>
    <div className={styles.aboutMe}>
        <h2 className={styles.h2}>About Me</h2>
        <div className={styles.profileContainer}>
          <img src="/profile.jpeg" alt='Alex Rumak Profile Picture' className={styles.profile}></img>
        </div>
        <div>
          <p className={styles.p}>Hi 👋🏼</p>
          <p className={styles.p}>I'm <b>Alex Rumak</b> - a Software Engineer, Roboticist, Generalist, and Lifelong Learner.</p>
          <p className={styles.p}>I'm currently studying <b>Embedded Systems</b> at <span><img src='/ucboulder.png' className={styles.emoji}></img> University of Colorado <b>Boulder</b></span> and working as a <span><b>Software Engineer</b>  <span className={styles.nowrap}> @ <img src='/microsoft.png' className={styles.emoji}></img> <b>Microsoft</b></span></span>.</p>
          <p className={styles.p}>I love <span className={styles.nowrap}>⛷️ skiing</span>, playing <span className={styles.nowrap}><img src='/pickleball.png' className={styles.emoji}></img> pickleball</span>, and building things. I am currently building a 🤖 Segway robot 🤖 using FreeRTOS on a ESP32.</p>
        </div>
    </div>
  </> 
}

export default AboutMe;
