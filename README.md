# Resonate Website

The official landing page for **Resonate** - an Open Source social voice platform maintained by [AOSSIE](https://aossie.org).

## About Resonate

Resonate is an open-source social voice platform, similar to Clubhouse and Twitter Spaces. It aims to strengthen credibility within the open-source community, attract users, and foster ecosystem growth through real-time audio communication.

**Key Features of the App:**

- Real-time audio communication
- Room creation and speaker moderation
- Random pair chatting
- Real-time messaging (Coming soon)


## 💻 Tech Stack

This project is built with **Next.js** and a modern frontend tooling stack, focusing on performance, scalability, and maintainability.

- **[Next.js](https://nextjs.org/)**  
  React framework providing the App Router, server-side rendering (SSR), static site generation (SSG), routing, and built-in performance optimizations.

- **[React](https://react.dev/)**  
  Core UI library used within Next.js for component-based user interface development.

- **[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)**  
  Built-in font optimization used for loading and managing Google fonts efficiently.

- **[CSS Modules / Global CSS](https://nextjs.org/docs/app/building-your-application/styling/css)**  
  Styling approach used for scoped component styles and shared global styles.

- **[React Icons](https://react-icons.github.io/react-icons/)**  
  Library for scalable vector icons used across the UI.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

Make sure the following tools are installed:
- Node.js (v18 or above recommended — v20+ preferred)
- npm (comes with Node.js) or yarn
- Git

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/AOSSIE/Resonate-Website.git
    cd Resonate-Website
    ```

2.  **Verify Installation**

   Run the following commands to confirm installation:

     ```bash
      node -v
      npm -v
      git --version
     ```


3.  **Install dependencies**

    ```bash
    npm install
    ```

4.  **Start the development server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.


5.  **Build for production**
    ```bash
    npm run build
    ```
    This creates an optimized production build inside the `.next` folder.

6.  **Start the production server**

    ```bash
    npm start
    ```

    This starts the application using the optimized production build.



## 📂 Project Structure

```
app/
├── assets/          # Images and static assets
├── components/      # Modular React components
│   ├── NavBar/      # Navigation bar
│   ├── Hero/        # Hero section
│   ├── Features/    # Features showcase
│   ├── TechStack/   # Tech stack display
│   ├── About/       # About AOSSIE section
│   ├── DownloadApp/ # App download links
│   └── Footer/      # Footer section
├── page.jsx           # Main application component (Homepage)
├── layout.jsx         # Main Layout
└── globals.css        # Global styles
```

## 🤝 Contributing

We welcome contributions! Please see the [AOSSIE contribution guidelines](https://github.com/AOSSIE/.github/blob/main/CONTRIBUTING.md) for more details.

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
