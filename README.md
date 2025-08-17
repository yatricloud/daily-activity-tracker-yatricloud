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

### Deployment & DevOps
- **PM2** - Process manager for Node.js
- **Nginx** - Reverse proxy and web server
- **EC2** - Cloud infrastructure
- **Git** - Version control

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account and project
- Ubuntu 20.04+ server (for production)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Nency-Ravaliya/yatri-3-tier-application.git
cd yatri-3-tier-application
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
yatri-3-tier-application/
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
├── deploy.sh                   # Deployment script
├── ec2-setup.sh               # EC2 setup script
├── ecosystem.config.js         # PM2 configuration
├── start.sh                    # Application startup script
└── package.json                # Dependencies and scripts
```

## 🚀 Deployment

### Quick Deployment
```bash
# Make scripts executable
chmod +x *.sh

# Deploy with PM2
./deploy.sh
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### EC2 Setup
```bash
# Run EC2 setup script
./ec2-setup.sh
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `./deploy.sh` - Deploy with PM2
- `./ec2-setup.sh` - Setup EC2 instance

## 🔧 Configuration

### PM2 Configuration
The application uses PM2 for process management with:
- Auto-restart on crashes
- Memory limit: 1GB
- Log rotation
- Process monitoring

### Nginx Configuration
Nginx serves as a reverse proxy:
- Port 80 (HTTP)
- Proxies to localhost:3000
- WebSocket support
- Static file serving

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
- **HTTPS Support** - Encrypted data transmission
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

- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Deployment Guide**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Issues**: [GitHub Issues](https://github.com/Nency-Ravaliya/yatri-3-tier-application/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Nency-Ravaliya/yatri-3-tier-application/discussions)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools

---

**Made with ❤️ by Nency Ravaliya**
