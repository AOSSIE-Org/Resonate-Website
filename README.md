# Resonate Website

The official landing page for **Resonate** - an Open Source social voice platform maintained by [AOSSIE](https://aossie.org).

## About Resonate

Resonate is a social voice platform, similar to Clubhouse and Twitter Spaces, but completely Open Source. It aims to enhance credibility within the open-source community, attract users, and foster growth through real-time audio communication.

**Key Features of the App:**

1. Real-time Audio Communication by joining rooms and talking to people.
2. Ability to create rooms and moderate speakers and events.
3. Create Scheduled Rooms and notify subscribers as reminders to join
4. Listen to and create Stories as chapters with synced lyrics, browse through entire catalog of stories following your favorite creators and waiting for their latest chapter/story releases. Post your own stories having chapters.
5. Pair chatting to enable users to find random partners to talk to in the app.
6. Friend People/Profiles enabling your self to talk on voice calls/realtime messaging with them

## :link: Repository Links

1. [Resonate Flutter App](https://github.com/AOSSIE-Org/Resonate)
2. [Resonate Backend](https://github.com/AOSSIE-Org/Resonate-Backend)

## 💻 Tech Stack

This website is built using modern web technologies to ensure a smooth and engaging user experience.

- **[Next.js](https://nextjs.org/)**: React framework for production with server-side rendering and static generation.
- **[React](https://reactjs.org/)**: Frontend library for building the user interface.
- **[GSAP](https://greensock.com/gsap/)**: For high-performance animations (ScrollTrigger).
- **[Lenis](https://github.com/darkroomengineering/lenis)**: For smooth, inertial scrolling.
- **[React Icons](https://react-icons.github.io/react-icons/)**: For vector icons.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ or v20 LTS recommended)
- npm or yarn

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/AOSSIE-Org/Resonate-Website.git
    cd Resonate-Website
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

    The app will run at `http://localhost:3000`.

4.  **Build for production**

    ```bash
    npm run build
    ```

    This creates an optimized static export in the `out` folder.

5.  **Start production server**
    ```bash
    npm start
    ```
    Runs the optimized production build.

## 📂 Project Structure

```
app/
├── assets/          # Images and static assets
├── components/      # Modular React components
│   ├── About/       # About section
│   ├── DownloadApp/ # App download links
│   ├── Features/    # Features showcase
│   ├── Hero/        # Hero section
│   ├── Layout/      # Shared layout components
│   │   ├── NavBar/  # Navigation bar
│   │   └── Footer/  # Footer
│   └── TechStack/   # Tech stack display
├── page.jsx           # Main application component (Homepage)
├── layout.js          # Root layout
└── globals.css        # Global styles
```

## 🤝 Contributing

We welcome contributions! Please see the [AOSSIE contribution guidelines](https://github.com/AOSSIE-Org/Resonate-Website/blob/main/CONTRIBUTING.md) for more details.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push the branch to your fork (git push origin feature/AmazingFeature)
5.  Open a Pull Request against `Resonate-Website:dev`

## 📄 License

This project is part of AOSSIE. Please check the repository for license details.

---

<p align="center">
  Maintained with ❤️ by <a href="https://aossie.org">AOSSIE</a>
</p>
