import "./Contribute.css";
import { FaGithub } from "react-icons/fa";

const Contribute = () => {
  return (
    <section className="contribute">
      <div className="contribute-container">
        <h2>Contribute to Resonate</h2>
        <p>
          Resonate is an open-source platform built by the community. 
          You can help improve the project by contributing code, reporting bugs,
          or suggesting new features.
        </p>

        <a
          href="https://github.com/AOSSIE-Org/Resonate"
          target="_blank"
          rel="noopener noreferrer"
          className="contribute-btn"
        >
          <FaGithub /> View on GitHub
        </a>
      </div>
    </section>
  );
};

export default Contribute;