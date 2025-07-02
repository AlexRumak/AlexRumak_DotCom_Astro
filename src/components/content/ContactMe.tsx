import styles from './ContactMe.module.css';

function ContactMe() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Test');
  }

  return <>
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.h2}>Contact Me</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>Send</button>
    </form>
  </>;
}

export default ContactMe;