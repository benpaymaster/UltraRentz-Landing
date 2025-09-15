// generate_readme.mjs
import fs from "fs";

const readmeContent = `# UltraRentz Landing Page

A clean, modern, and responsive landing page for **UltraRentz** – a decentralized rent deposit platform that leverages blockchain technology for fair, secure, and transparent rent deposits.

---

## 🚀 Features

- **Responsive Design** – Works seamlessly on mobile, tablet, and desktop.
- **Smooth Scrolling** – Navigate between sections with ease.
- **Hero Section** – Clear messaging and call-to-action.
- **Features Section** – Highlights UltraRentz platform advantages.
- **How It Works** – Step-by-step explanation of the 4-of-6 multisig escrow process.
- **Developers / Documentation Section** – Tutorials and guides for integrating UltraRentz.
- **Videos Section** – Embedded tutorial and explainer videos.
- **Blog Section** – Showcases news, updates, and articles.
- **CTA & Footer** – Engaging call-to-action with a branded footer.

---

## 🛠 Tech Stack

- **Frontend:** React 18
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **Language:** TypeScript

---

## 📂 Project Structure

\`\`\`
UltraRentz-Landing/
├─ src/
│  ├─ components/   # Navbar, Hero, Features, HowItWorks, Developers, Videos, Blog, CTA, Footer
│  ├─ pages/        # Landing.tsx
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ package.json
├─ vite.config.ts
└─ README.md
\`\`\`

---

## ⚡ Getting Started

1. **Clone the repository:**

\`\`\`bash
git clone https://github.com/benpaymaster/UltraRentz-Landing.git
cd UltraRentz-Landing
\`\`\`

2. **Install dependencies:**

\`\`\`bash
npm install
\`\`\`

3. **Start development server:**

\`\`\`bash
npm run dev
\`\`\`

4. **Open in browser:**

The development server will open automatically, or go to \`http://localhost:5173\`.

---

## 📈 Deployment

Build for production:

\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🧑‍💻 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature/YourFeature\`).
3. Commit your changes (\`git commit -m "Add new feature"\`).
4. Push to your branch (\`git push origin feature/YourFeature\`).
5. Open a Pull Request.

---

## 📄 License

This project is **MIT Licensed**.
`;

fs.writeFileSync("README.md", readmeContent);
console.log("✅ README.md has been generated/updated successfully!");
