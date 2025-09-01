import "./about.css";
import authorImage from "../../assets/IMG_5105.jpeg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Author Image" />
      <div className="about__story">
        <h2 className="about__title">About the author</h2>
        <div className="about__body">
          <p>
            I'm Alexander Reznik, a NYC native with a BFA in Graphic Design from
            Pratt Institute. Over my career, I've worked in marketing and
            advertising for companies like Madison Square Garden, BBDO, and WWE,
            where I've built creative teams and streamlined processes. My focus
            has always been on hands-on creative operations, using
            problem-solving skills to drive results.
          </p>
          <p>
            As my career evolved, I became increasingly fascinated by the
            technical side of things, working closely with software engineers to
            tailor workflows to business needs. This led me to pursue software
            engineering, combining my creative thinking with a technical
            approach to solve complex challenges. Joining TripleTen has expanded
            my skill set, giving me the ability to build and customize apps that
            meet unique needs.
          </p>
          <p>
            In this project, I focused on building reusable components and
            optimizing the mobile UI. Following the figma design I noticed that
            they were missing some key elements. Mainly essential features like
            "Home," "Saved Articles," and "Sign Out" buttons to improve the user
            experience. My creative background allowed me to not only identify
            the need but also, create these icons and implement them. With my
            background in marketing and design, I bring a deep understanding of
            UX, ensuring seamless communication and high-quality results. My
            ability to handle every stage of a project, from ideation to design
            to development, helps companies save time, reduce costs, and
            maintain control over quality.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
