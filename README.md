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

This website has been overhauled (2026) to use a modern, high-performance architecture.

*   **[Next.js 16](https://nextjs.org/)**: React Framework with App Router for SSR & SEO.
*   **[TypeScript](https://www.typescriptlang.org/)**: For type safety and better developer experience.
*   **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first styling with the new CSS-based configuration.
*   **[React](https://react.dev/)**: Latest React 19 features (including Compiler).

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18.17 or higher required for Next.js)
*   npm

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/AOSSIE/Resonate-Website.git
    cd Resonate-Website
    ```
    *(Make sure to checkout the `new-design` branch if developing the overhaul)*

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
    This creates an optimized production build.

## 📂 Project Structure

```
src/
├── app/ # App Router pages and layouts
│ ├── globals.css # Global styles & Tailwind Design Tokens
│ ├── layout.tsx # Root layout (Fonts & Metadata)
│ └── page.tsx # Landing Page
├── assets/ # (Legacy) Raw assets, prefer using public/
└── public/ # Static assets served at root
├── assets/ # Images and icons
├── robots.txt # SEO Configuration
└── llms.txt # AI Crawler Policy
```

## 🤝 Contributing

We welcome contributions! Please see the [AOSSIE contribution guidelines](https://github.com/AOSSIE/.github/blob/main/CONTRIBUTING.md) for more details.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is part of AOSSIE. Please check the repository for license details.

---
<p align="center">
  Maintained with ❤️ by <a href="https://aossie.org">AOSSIE</a>
</p>