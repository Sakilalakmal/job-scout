<img width="1475" height="675" alt="job-scout" src="https://github.com/user-attachments/assets/e3c1eeed-cc9c-441f-87e2-078e017b2694" />


# Job Scout - Intelligent Job Board Platform

Job Scout is a modern, open-source job board platform designed to streamline the hiring process. Built with the latest web technologies, it offers a seamless experience for companies to post opportunities and for professionals to find their dream careers effortlessly.

## 🚀 Features

- **🏢 Dual Role System**: Dedicated dashboards for Companies to manage listings and Job Seekers to manage applications.
- **📝 Rich Job Posting**: Intuitive editor (Tiptap) for creating engaging job descriptions with rich text formatting.
- **✨ Smart Resume Handling**: Seamless resume and logo uploads utilizing UploadThing.
- **💳 Secure Payments**: Integrated Stripe checkout for dedicated job posting transactions.
- **🛡️ Advanced Security**: Robust bot protection and rate limiting powered by Arcjet.
- **⚡ Background Processing**: Reliable background jobs for emails and notifications using Inngest.
- **🔐 Secure Authentication**: Robust user management via NextAuth v5 (GitHub and Google OAuth).
- **🎨 Modern UI/UX**: A responsive and accessible interface built with Tailwind CSS v4 and Shadcn UI (Radix).
- **📧 Email Notifications**: Automated transactional emails delivered via Resend.

## 🛠️ Tech Stack

This project leverages a cutting-edge stack for performance, scalability, and developer experience:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Auth.js (NextAuth v5)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix), Lucide React
- **Forms**: React Hook Form, Zod
- **Rich Text**: Tiptap
- **File Uploads**: UploadThing
- **Payments**: Stripe
- **Background Jobs**: Inngest
- **Security**: Arcjet
- **Emails**: Resend

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: v18+ recommended
- **npm** or **pnpm**
- **PostgreSQL**: Local instance or cloud provider (e.g., Neon, Supabase)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/sakilalakmal/job-scout.git
    cd job-scout
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory and add the following keys:

    ```env
    # Database
    DATABASE_URL="postgresql://..."

    # Authentication (NextAuth)
    AUTH_SECRET="your_generated_secret"
    AUTH_GITHUB_ID="your_github_client_id"
    AUTH_GITHUB_SECRET="your_github_client_secret"
    AUTH_GOOGLE_ID="your_google_client_id"
    AUTH_GOOGLE_SECRET="your_google_client_secret"

    # App URL
    NEXT_PUBLIC_URL="http://localhost:3000"

    # UploadThing (File Uploads)
    UPLOADTHING_SECRET="your_uploadthing_secret"
    UPLOADTHING_APP_ID="your_uploadthing_app_id"

    # Stripe (Payments)
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."
    STRIPE_PRICE_ID="price_..."

    # Arcjet (Security)
    ARCJET_KEY="aj_..."

    # Inngest (Background Jobs)
    INNGEST_EVENT_KEY="your_inngest_event_key"
    INNGEST_SIGNING_KEY="your_inngest_signing_key"

    # Resend (Emails)
    RESEND_API_KEY="re_..."
    ```

4.  **Database Setup**

    Push the Prisma schema to your database:

    ```bash
    npx prisma db push
    ```

5.  **Run the Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
