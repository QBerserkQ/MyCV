# CV Portfolio

A full-stack personal CV / portfolio website with a self-hosted admin mode — no separate admin panel, just log in on the site itself and edit everything inline.

<img width="1517" height="731" alt="image" src="https://github.com/user-attachments/assets/121494d4-af79-4648-af8d-d1d0eec0cc84" />


## ✨ Features

- **Live-editable content** — skills, education, work experience, and projects are all stored in a database and managed directly from the UI once logged in as admin
- **Secure admin mode** — Basic Auth with role-based access (`ADMIN` / `USER`), protected write operations, safe public read access
- **Image uploads** — profile photo and project images are uploaded straight to Cloudinary from the browser, no server storage required
- **Live GitHub & LeetCode stats** — real contribution and submission activity for the last 30 days, pulled through a caching backend proxy (so no API tokens are ever exposed to the browser)
- **Clean component architecture** — each section of the page is its own panel component, backed by a single reusable CRUD hook on the frontend

## 🛠️ Tech Stack

**Backend**
- Java · Spring Boot
- Spring Security (Basic Auth, BCrypt, role-based access)
- Spring Data JPA · H2 Database
- Spring Cache

**Frontend**
- React + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI components)

**External services**
- Cloudinary — image hosting
- GitHub GraphQL API — contribution stats
- LeetCode GraphQL API — submission stats

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- A free [Cloudinary](https://cloudinary.com) account (for image uploads)
- A GitHub [Personal Access Token](https://github.com/settings/tokens) (for GitHub stats)

### Backend

```bash
# from the project root
./gradlew bootRun
```

Set the following environment variables before running:

```
GITHUB_TOKEN=your_github_personal_access_token
```

Configure `src/main/resources/application.properties`:

```properties
github.username=your-github-username
leetcode.username=your-leetcode-username
```

The backend starts on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Add your Cloudinary credentials in `frontend/src/api/client.js`:

```js
const CLOUDINARY_CLOUD_NAME = "your-cloud-name";
const CLOUDINARY_UPLOAD_PRESET = "your-unsigned-preset";
```

The frontend starts on `http://localhost:5173`.

## 📁 Project Structure

```
├── src/main/java/volodea/cv/
│   ├── controller/       # REST controllers (Skill, Experience, Education, Project, User, GitHub/LeetCode stats)
│   ├── model/            # JPA entities
│   ├── repository/       # Spring Data repositories
│   ├── config/           # Security & cache configuration
│   └── init/             # Initial data seeding
│
└── frontend/src/
    ├── api/               # Fetch wrapper & Cloudinary upload helper
    ├── context/           # Auth context (Basic Auth session)
    ├── hooks/             # useCrud, useUser, useGithubStats, useLeetcodeStats
    ├── components/panels/ # One component per CV section
    └── pages/             # Main CV page
```

## 🔐 How Admin Mode Works

The site has no separate `/admin` route. Instead, a lock icon in the header opens a login form. Once authenticated with valid admin credentials, edit and delete controls appear inline across every section — skills, experience, education, and projects.

All write operations (`POST` / `PUT` / `DELETE`) require authentication and are protected server-side by Spring Security; public visitors only ever see `GET` responses.

## 📄 License
