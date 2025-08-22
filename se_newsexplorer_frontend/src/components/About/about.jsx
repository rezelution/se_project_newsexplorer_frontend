import "./about.css";
import authorImage from "../../assets/IMG_5105.jpeg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Author Image" />
      <div className="about__story">
        <h2 className="about__title">About the author</h2>
        <p className="about__body">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__body--no-margin">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
