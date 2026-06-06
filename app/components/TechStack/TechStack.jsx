// import React from "react";
// import "./TechStack.css";
// import flutterLogo from "../../assets/Flutter.png";
// import appwriteLogo from "../../assets/Appwrite.png";

// const TechStack = () => {
//   return (
//     <section className="tech-stack-container">
//       <div className="tech-stack">
//         <h2>TECH STACK</h2>
//         <div className="tech-logos">
//           <div className="tech-logo">
//             <img src={flutterLogo.src} alt="Flutter"  draggable={false} />
//           </div>
//           <div className="tech-logo">
//             <img src={appwriteLogo.src} alt="Appwrite"  draggable={false} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(TechStack);

import React from "react";
import "./TechStack.css";
import Image from "next/image";
import flutterLogo from "../../assets/Flutter.png";
import appwriteLogo from "../../assets/Appwrite.png";

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
          <div className="tech-logo">
            <Image
              src={flutterLogo}
              alt="Flutter Framework Logo"
              placeholder="blur"
              draggable={false}
              style={{ borderRadius: "6px" }}
            />
          </div>
          <div className="tech-logo">
            <Image
              src={appwriteLogo}
              alt="Appwrite Backend Logo"
              placeholder="blur"
              draggable={false}
              style={{ borderRadius: "6px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechStack);
