# Daily Activity Tracker

A modern, full-stack web application for tracking and analyzing daily activities, built with Next.js 15, TypeScript, and Supabase.

## 🌟 Features

- **User Authentication**: Secure login/signup with Supabase Auth
- **Activity Logging**: Track daily activities with timestamps and categories
- **Data Analysis**: Visualize activity patterns and trends
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Live data synchronization
- **Dark/Light Mode**: Toggle between themes

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern React patterns

### Backend & Database
- **Supabase** - Open-source Firebase alternative
- **PostgreSQL** - Reliable relational database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account and project

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yatricloud/daily-activity-tracker-yatricloud.git
cd daily-activity-tracker-yatricloud
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Build and Run
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 🏗️ Project Structure

```
daily-activity-tracker-yatricloud/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── activities/         # Activity management pages
│   │   ├── analysis/           # Data analysis dashboard
│   │   ├── auth/               # Authentication pages
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React context providers
│   │   ├── lib/                # Utility libraries
│   │   └── globals.css         # Global styles
│   ├── components/             # Shared components
│   ├── context/                # React context
│   └── lib/                    # Utility functions
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout

### Activities
- `GET /activities` - List activities
- `POST /activities` - Create activity
- `PUT /activities/:id` - Update activity
- `DELETE /activities/:id` - Delete activity

### Analysis
- `GET /analysis` - Activity analytics
- `GET /analysis/stats` - Statistical data

## 🗄️ Database Schema

### Users Table
```sql
users (
  id uuid primary key,
  email text unique,
  created_at timestamp,
  updated_at timestamp
)
```

### Activities Table
```sql
activities (
  id uuid primary key,
  user_id uuid references users(id),
  title text,
  description text,
  category text,
  duration interval,
  created_at timestamp,
  updated_at timestamp
)
```

## 🔒 Security Features

- **Row Level Security** - Data isolation per user
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - XSS and injection protection
- **Environment Variables** - Secure configuration

## 📈 Performance

- **Static Generation** - Pre-rendered pages
- **Code Splitting** - Lazy-loaded components
- **Image Optimization** - Next.js image optimization
- **Caching** - Browser and CDN caching
- **Bundle Analysis** - Optimized JavaScript bundles

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/yatricloud/daily-activity-tracker-yatricloud/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yatricloud/daily-activity-tracker-yatricloud/discussions)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools

---

**Made with ❤️ by Nency Ravaliya**

**© 2025 Yatri Cloud. Designed by Uimitra**
