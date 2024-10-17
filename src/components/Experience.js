import React, { useContext } from "react";
import styles from "../styles/Experience.module.css";
import { Link } from "react-router-dom";
import tdImg from "../media/tds.png";
import georgiaLogo from "../media/georgiaLogo.png";
import stratImg from "../media/strategio.png";
import owlImg from "../media/BIGOWL.jpg";
import fulbrightImg from "../media/fulbright.png";
import ucImg from "../media/uc.png";
import VariableContext from "../context/VariableProvider";

// const MobileExperience = () => (
// 	<div className={`${styles.item} ${left ? styles.leftItem : styles.rightItem}`}>
// 			<img src={image} alt={imageAlt}/>
// 			<div className={styles.textBox}>
// 				<h2>{title} <span className={styles.lightBold}>{subTitle}</span></h2>
// 				{only ? only : (<small>{start}&#8212;{end === undefined ? 'present' : end}</small>) }
// 				<p>{children}</p>
// 			</div>
// 			<span className={left ? styles.leftArrow : styles.rightArrow} />
// 		</div>
// );

const TimeLineCard = ({
  listId,
  title,
  subTitle,
  start,
  end,
  only,
  image,
  imageAlt,
  children,
}) => {
  const { isMobile } = useContext(VariableContext);
  const left = isMobile ? false : listId % 2 === 0;

  return (
    <div
      className={`${styles.item} ${left ? styles.leftItem : styles.rightItem} ${
        isMobile ? styles.itemMobile : ""
      }`}
    >
      <img src={image} alt={imageAlt} />
      <div className={`${isMobile ? styles.textBoxMobile : styles.textBox}`}>
        <h2>
          {title} <span className={styles.lightBold}>{subTitle}</span>
        </h2>
        {only ? (
          <small>{only}</small>
        ) : (
          <small>
            {start}&#8212;{end === undefined ? "present" : end}
          </small>
        )}
        <p>{children}</p>
      </div>
      {!isMobile && (
        <span className={left ? styles.leftArrow : styles.rightArrow} />
      )}
    </div>
  );
};

// TODO: Do not duplicate timeline card array; use same object for both mobile and desktop components

const MobileExperience = () => {
  let i = 0;
  return (
    <>
      <h1 className={`${styles.mobileHOne} ${styles.yellow}`}>Experience</h1>
      <div className={styles.wrapperMobile}>
        <div className={styles.experienceWrapper}>
          <div className={styles.timelineMobile}>
            <TimeLineCard
              listId={i++}
              title="Georgia Institute of Technology"
              subTitle="| Masters Student in Computer Science"
              start="2025"
              image={georgiaLogo}
              imageAlt="Georgia Tech Logo"
            >
              Admitted to the{" "}
              <Link
                to="https://omscs.gatech.edu/"
                className={styles.red}
                target="_blank"
              >
                Online Masters of Science in Computer Science Program
              </Link>{" "}
              at Georgia Tech for the Spring 2025 semester.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="TD Securities"
              subTitle="| Fullstack Developer"
              start="2022"
              image={tdImg}
              imageAlt="TD Bank Logo"
            >
              Work as a fullstack developer at{" "}
              <Link
                to="https://www.tdsecurities.com/ca/en"
                className={styles.red}
                target="_blank"
              >
                TD Securities
              </Link>{" "}
              investment bank as a member of the API gateway team.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="Strategio"
              subTitle="| Technologist"
              start="2022"
              image={stratImg}
              imageAlt="Strategio logo"
            >
              Hired as a Technologist at{" "}
              <Link
                to="https://strategio.tech/"
                className={styles.red}
                target="_blank"
              >
                Strategio
              </Link>
              , a company that trains and contracts out software developers to
              enterprise companies.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="White Owl Records"
              subTitle="| Lead Website Developer"
              start="2023"
              image={owlImg}
              imageAlt="White owl records logo"
            >
              Design, build, and manage the official website for{" "}
              <Link
                to="https://whiteowlrecords.xyz/"
                className={styles.red}
                target="_blank"
              >
                White Owl Records
              </Link>
              , an independent label based out of Brooklyn, New York
              highlighting experimental live techno.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="Fulbright Austria"
              subTitle="| US Teaching Assistant"
              start="2021"
              end="2022"
              image={fulbrightImg}
              imageAlt="fulbright logo"
            >
              Taught English as a foreign language to high school students
              outside of Vienna, Austria as a part of{" "}
              <Link
                to="https://www.fulbright.at/"
                className={styles.red}
                target="_blank"
              >
                Fulbright Austria's
              </Link>{" "}
              US Teaching Assistant program. Lived in Vienna for one wonderful
              year.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="University of Chicago"
              subTitle="| BA in History of Science"
              start="2017"
              end="2021"
              image={ucImg}
              imageAlt="University of Chicago Crest"
            >
              Graduated with honors from the{" "}
              <Link
                to="https://www.uchicago.edu/en"
                target="_blank"
                className={styles.red}
              >
                University of Chicago
              </Link>{" "}
              with a major in the History, Philosophy and Social Studies of
              Science and Medicine and a minor in Computer Science.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="UChicago Writing Program"
              subTitle="| Peer Writing Tutor"
              start="2019"
              end="2021"
              image={ucImg}
              imageAlt="University of Chicago Crest"
            >
              Provided one-on-one instruction to undergraduate students
              attending UChicago as a writing tutor with the{" "}
              <Link
                to="https://writing-program.uchicago.edu/"
                target="_blank"
                className={styles.red}
              >
                UChicago Writing Program
              </Link>
              , focusing on writing for readers in academic and professional
              contexts.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="College Summer Institute"
              subTitle="| Grant Awardee"
              only="2020"
              image={ucImg}
              imageAlt="University of Chicago Crest"
            >
              Recieved a grant to complete an independent research project in
              the humanities as part of the UChicago College Summer Institute.
              Our small cohort recieved training in humanities research methods
              and participated in a symposium at the end of the program to
              present our papers.
            </TimeLineCard>

            <TimeLineCard
              listId={i++}
              title="Foreign Language Aquisition Grant"
              subTitle="| Grant Awardee"
              only="2020"
              image={ucImg}
              imageAlt="University of Chicago Crest"
            >
              Recieved a Summer International Travel Grant from the University
              of Chicago Study Abroad Office to study German for one summer in
              Germany.
            </TimeLineCard>
          </div>
        </div>
      </div>
    </>
  );
};

const Experience = () => {
  let i = 0;
  const { isMobile } = useContext(VariableContext);

  if (isMobile) return <MobileExperience />;

  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.yellow}`}>Experience</h1>
      <div className={styles.experienceWrapper}>
        <div className={styles.timeline}>
          <TimeLineCard
            listId={i++}
            title="Georgia Institute of Technology"
            subTitle="| Masters Student in Computer Science"
            start="2025"
            image={georgiaLogo}
            imageAlt="Georgia Tech Logo"
          >
            Admitted to the{" "}
            <Link
              to="https://omscs.gatech.edu/"
              className={styles.red}
              target="_blank"
            >
              Online Masters of Science in Computer Science Program
            </Link>{" "}
            at Georgia Tech for the Spring 2025 semester.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="TD Securities"
            subTitle="| Fullstack Developer"
            start="2022"
            image={tdImg}
            imageAlt="TD Bank Logo"
          >
            Work as a fullstack developer at{" "}
            <Link
              to="https://www.tdsecurities.com/ca/en"
              className={styles.red}
              target="_blank"
            >
              TD Securities
            </Link>{" "}
            investment bank as a member of the API gateway team.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="Strategio"
            subTitle="| Technologist"
            start="2022"
            image={stratImg}
            imageAlt="Strategio logo"
          >
            Hired as a Technologist at{" "}
            <Link
              to="https://strategio.tech/"
              className={styles.red}
              target="_blank"
            >
              Strategio
            </Link>
            , a company that trains and contracts out software developers to
            enterprise companies.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="White Owl Records"
            subTitle="| Lead Website Developer"
            start="2023"
            image={owlImg}
            imageAlt="White owl records logo"
          >
            Design, build, and manage the official website for{" "}
            <Link
              to="https://whiteowlrecords.xyz/"
              className={styles.red}
              target="_blank"
            >
              White Owl Records
            </Link>
            , an independent label based out of Brooklyn, New York highlighting
            experimental live techno.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="Fulbright Austria"
            subTitle="| US Teaching Assistant"
            start="2021"
            end="2022"
            image={fulbrightImg}
            imageAlt="fulbright logo"
          >
            Taught English as a foreign language to high school students outside
            of Vienna, Austria as a part of{" "}
            <Link
              to="https://www.fulbright.at/"
              className={styles.red}
              target="_blank"
            >
              Fulbright Austria's
            </Link>{" "}
            US Teaching Assistant program. Lived in Vienna for one wonderful
            year.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="University of Chicago"
            subTitle="| BA in History of Science"
            start="2017"
            end="2021"
            image={ucImg}
            imageAlt="University of Chicago Crest"
          >
            Graduated with honors from the{" "}
            <Link
              to="https://www.uchicago.edu/en"
              target="_blank"
              className={styles.red}
            >
              University of Chicago
            </Link>{" "}
            with a major in the History, Philosophy and Social Studies of
            Science and Medicine and a minor in Computer Science.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="UChicago Writing Program"
            subTitle="| Peer Writing Tutor"
            start="2019"
            end="2021"
            image={ucImg}
            imageAlt="University of Chicago Crest"
          >
            Provided one-on-one instruction to undergraduate students attending
            UChicago as a writing tutor with the{" "}
            <Link
              to="https://writing-program.uchicago.edu/"
              target="_blank"
              className={styles.red}
            >
              UChicago Writing Program
            </Link>
            , focusing on writing for readers in academic and professional
            contexts.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="College Summer Institute"
            subTitle="| Grant Awardee"
            only="2020"
            image={ucImg}
            imageAlt="University of Chicago Crest"
          >
            Recieved a grant to complete an independent research project in the
            humanities as part of the UChicago College Summer Institute. Our
            small cohort recieved training in humanities research methods and
            participated in a symposium at the end of the program to present our
            papers.
          </TimeLineCard>

          <TimeLineCard
            listId={i++}
            title="Foreign Language Aquisition Grant"
            subTitle="| Grant Awardee"
            only="2020"
            image={ucImg}
            imageAlt="University of Chicago Crest"
          >
            Recieved a Summer International Travel Grant from the University of
            Chicago Study Abroad Office to study German for one summer in
            Germany.
          </TimeLineCard>
        </div>
      </div>
    </div>
  );
};

export default Experience;
