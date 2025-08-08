# 📊 Investor Room - Professional Dashboard for Founders

> **A professional platform to create investor dashboards in a simple and elegant way**

Investor Room is a modern and customizable template built with **Nextra** that allows any founder to create a professional dashboard for investor reports, business metrics, and product updates.

## 🌐 Live Demo
**[🚀 View Live Example](https://investors-room-qicb7ygc5-uncodie.vercel.app)**

![Investor Room Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)

## 🚀 Key Features

- **📈 Complete Dashboard**: Financial metrics, KPIs, quarterly comparisons
- **🎨 Professional Design**: Modern and responsive interface with custom components
- **📱 Mobile First**: Optimized for mobile devices and tablets
- **🔒 Access Control**: Easy integration with Auth0 and Supabase
- **⚡ Performance**: Built on Next.js 14 with performance optimizations
- **📝 Easy Editing**: Content in MDX format for simple editing
- **🌙 Dark Mode**: Native support for light and dark themes

## 📋 Included Content

- **Executive Summary**: Executive summary with key metrics
- **Financial Metrics**: ARR, revenue, cash runway
- **Product KPIs**: Active users, retention, NPS
- **Product Updates**: Roadmap and releases
- **Quarterly Comparisons**: Period-over-period growth analysis
- **North Star Metrics**: Business star metrics
- **Methodology**: Explanation of calculations and definitions

## 🛠️ Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework for web applications
- **[Nextra](https://nextra.site/)** - Documentation framework built on Next.js
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework (included in Nextra)
- **[MDX](https://mdxjs.com/)** - Markdown with React components

## 🚀 Quick Start

### 1. Clone and Installation

```bash
# Clone the repository
git clone https://github.com/your-username/investor-room.git
cd investor-room

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 2. Local Development

```bash
# Start development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser to see the result.

### 3. Content Customization

1. **Edit your startup information** in `pages/index.mdx`
2. **Update metrics** in `pages/kpis.mdx` and `pages/financials.mdx`
3. **Modify configuration** in `theme.config.tsx`
4. **Customize components** in the `components/` folder

## 🌐 Deploy on Vercel

### Automatic Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with one click**:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/investor-room)

3. **Configure your custom domain** (optional) in the Vercel dashboard

### Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your project**:
   ```bash
   vercel --prod
   ```

### Environment Variables for Production

If you use authentication, configure these variables in Vercel:

```bash
# For Auth0
AUTH0_SECRET=your-secret-here
AUTH0_BASE_URL=https://your-domain.vercel.app
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# For Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔒 Access Control

### Option 1: Auth0 Integration

Auth0 is perfect for startups that need robust enterprise authentication.

#### 1. Auth0 Configuration

1. **Create an account** on [Auth0](https://auth0.com)
2. **Create a new application** of type "Regular Web Application"
3. **Configure URLs**:
   - **Allowed Callback URLs**: `https://your-domain.vercel.app/api/auth/callback`
   - **Allowed Logout URLs**: `https://your-domain.vercel.app`

#### 2. Dependencies Installation

```bash
npm install @auth0/nextjs-auth0
```

#### 3. Code Configuration

Create `pages/api/auth/[...auth0].js`:

```javascript
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();
```

Wrap your application in `pages/_app.tsx`:

```tsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
```

#### 4. Protect Pages

```tsx
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Dashboard() {
  return <div>Your protected dashboard</div>;
});
```

### Option 2: Supabase Integration

Supabase is ideal for startups that prefer an open-source solution with more control.

#### 1. Supabase Configuration

1. **Create a project** on [Supabase](https://supabase.com)
2. **Configure authentication** in Authentication > Settings
3. **Enable providers** (Email, Google, GitHub, etc.)

#### 2. Dependencies Installation

```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

#### 3. Client Configuration

Create `lib/supabase.js`:

```javascript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
```

#### 4. Authentication Middleware

Create `middleware.js`:

```javascript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
```

#### 5. Login Component

```tsx
'use client';
import { supabase } from '../lib/supabase';

export default function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
}
```

## 📝 Customization for your Startup

### 1. Basic Configuration

Edit `theme.config.tsx`:

```tsx
const config: DocsThemeConfig = {
  logo: <span>📊 YourStartup Investor Room</span>,
  project: {
    link: 'https://github.com/your-username/your-investor-room',
  },
  footer: {
    content: '© 2024 YourStartup - Investor Dashboard',
  },
}
```

### 2. Metrics and Data

Update files in `pages/`:
- `index.mdx` - Main page with executive summary
- `kpis.mdx` - Key business KPIs
- `financials.mdx` - Financial metrics
- `q1-2025.mdx` - Current quarter objectives

### 3. Custom Components

Components in `components/` are fully customizable:
- `MetricCard.tsx` - Metric display cards
- `GradientHeader.tsx` - Gradient headers
- `FeatureCard.tsx` - Feature cards

### 4. Styles and Branding

Nextra uses Tailwind CSS, you can customize:
- Main colors in components
- Typography and spacing
- Dark/light mode

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server on port 3002

# Production
npm run build        # Build application for production
npm run start        # Start production server

# Utilities
npm run lint         # Run ESLint to check code
npm run type-check   # Check TypeScript types
```

## 📁 Project Structure

```
investor-room/
├── components/          # Reusable components
│   ├── MetricCard.tsx   # Metric cards
│   ├── GradientHeader.tsx
│   └── ...
├── pages/               # Dashboard pages
│   ├── index.mdx        # Main page
│   ├── kpis.mdx         # Key KPIs
│   ├── financials.mdx   # Financial metrics
│   └── ...
├── public/              # Static files
├── theme.config.tsx     # Nextra configuration
├── next.config.mjs      # Next.js configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Use Cases

### For Founders

- **Monthly/quarterly reports** to investors
- **Real-time metrics dashboards**
- **Fundraising presentations** with updated data
- **Stakeholder transparency**

### For VCs and Investors

- **Portfolio company tracking**
- **Standardized metrics** across startups
- **24/7 access** to updated information
- **Performance comparisons**

## 🤝 Contributing

Contributions are welcome! If you have ideas to improve the template:

1. **Fork the project**
2. **Create a branch** for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📄 License

This project is under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🆘 Support

- **Documentation**: [Nextra Docs](https://nextra.site)
- **Issues**: [GitHub Issues](https://github.com/your-username/investor-room/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/investor-room/discussions)

## 🚀 Showcase

Do you use this template? We'd love to see your implementation!

Share your Investor Room:
- **Twitter**: [@your_handle](https://twitter.com/your_handle)
- **LinkedIn**: [Your Profile](https://linkedin.com/in/your-profile)

---

**Made with ❤️ for the founder community**

*Last updated: January 2025*