# Resonate Website

The official landing page for **Resonate** - an Open Source social voice platform maintained by [AOSSIE](https://aossie.org).

## 🚀 About Resonate

Resonate is a social voice platform, similar to Clubhouse and Twitter Spaces, but completely Open Source. It aims to enhance credibility within the open-source community, attract users, and foster growth through real-time audio communication.

**Key Features of the App:**
*   Real-time Audio Communication.
*   Create rooms and moderate speakers/events.
*   Pair chatting for random partner matching.
*   Real-time messaging (Coming Soon).

## 💻 Tech Stack

This website is built using modern web technologies to ensure a smooth and engaging user experience.

*   **[React](https://reactjs.org/)**: Frontend library for building the user interface.
*   **[GSAP](https://greensock.com/gsap/)**: For high-performance animations (ScrollTrigger).
*   **[Lenis](https://github.com/studio-freight/lenis)**: For smooth, inertial scrolling.
*   **[React Icons](https://react-icons.github.io/react-icons/)**: For vector icons.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   npm or yarn

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/AOSSIE/Resonate-Website.git
    cd Resonate-Website
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```
    The app will run at `http://localhost:3000`.

4.  **Build for production**
    ```bash
    npm run build
    ```
    This creates an optimized build in the `build` folder.

## 📂 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Modular React components
│   ├── NavBar/      # Navigation bar
│   ├── Hero/        # Hero section
│   ├── Features/    # Features showcase
│   ├── TechStack/   # Tech stack display
│   ├── About/       # About AOSSIE section
│   ├── DownloadApp/ # App download links
│   └── Footer/      # Footer section
├── App.js           # Main application component (Animations & Layout)
├── App.css          # Global styles
└── index.js         # Entry point
```

## 🤝 Contributing

We welcome contributions! Please see the [Please see the AOSSIE contribution guidelines](https://github.com/AOSSIE-Org/Resonate-Website/blob/dev/CONTRIBUTING.md) for more details.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is part of AOSSIE. Please check the repository for license details.

---
<p align="center">
  Maintained with ❤️ by <a href="https://aossie.org">AOSSIE</a>
</p>
