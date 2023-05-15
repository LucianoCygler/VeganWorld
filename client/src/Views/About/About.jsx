import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.contenedor}>
          <h2 className={styles.h2}>Vegan World</h2>
          <h3>Comes from our own needs. We wanted an app that could make it easier to be a vegan and order food like everybody else.
            So we teamed up and built our own company to facilitate this. And we couldn't be happier about the results.</h3>
          <h3>Day after day more than 3000 orders from our website are being completed. And that means that a lot of people are eating healthy and delicious food.</h3>
          <img className={styles.image} src="https://lh3.googleusercontent.com/x38IQRDTmLHdORZdCX6oUOKXrUfGDO5GekvJlUhBi6rMbkej3rp8yQvnaSjoD3p70K8j5Q1QZvXw0fHVWrxjDpRKvKN7Ra6E3l0tlv7U" alt="logo" />
        </div>
    </div>
  );
};

export default About;
