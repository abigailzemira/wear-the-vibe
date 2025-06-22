# Wear The Vibe

Get Music That Matches Your Look

## Description

Wear The Vibe is an innovative web application that analyzes your outfit photos to generate personalized music recommendations. Using advanced AI and color analysis technology, the app extracts color palettes from your photos, determines your mood based on visual aesthetics, and curates music playlists that match your style and vibe.

Whether you upload a photo of your outfit or take a live photo, Wear The Vibe creates a unique musical experience tailored to your visual presentation, bridging the gap between fashion and music.

## Technologies Used

### Frontend Framework

- **Next.js 15.2.4** - React-based full-stack framework with App Router
- **React 19** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development

### UI/UX

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light theme support
- **SweetAlert2** - Beautiful alerts and modals
- **React Hook Form** - Form state management with validation

### State Management

- **Redux Toolkit** - Modern Redux state management
- **React Redux** - React bindings for Redux
- **Reselect** - Efficient state selector library

### AI & Image Processing

- **IBM Granite AI** (via Replicate) - Mood analysis and song generation
- **Replicate API** - AI model hosting and execution
- **Cloudinary** - Image upload and processing

### Authentication & Security

- **OAuth 2.0** - Secure authentication

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Features

### 🎨 **Color Palette Analysis**

- Extract dominant colors from outfit photos
- Analyze color harmony and composition
- Visual color palette display with percentages

### 🧠 **AI-Powered Mood Detection**

- Advanced mood analysis using IBM Granite AI
- Color psychology-based mood interpretation
- One-word mood summarization

### 🎵 **Personalized Music Recommendations**

- AI-generated playlist based on detected mood
- Curated song suggestions with artist information
- Minimum 7 song recommendations per analysis

### 📸 **Flexible Photo Input**

- Upload existing photos from device
- Live camera capture functionality
- Support for multiple image formats

### 🎭 **Multiple Demo Modes**

- Mood analysis demonstration
- Color palette showcase
- Interactive mood hook testing

### 🌙 **Modern UI/UX**

- Dark/light theme support
- Responsive design for all devices
- Accessible components with Radix UI
- Beautiful gradient backgrounds and animations

### 🔐 **Secure Authentication**

- Protected routes and API endpoints
- Secure token management

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_api_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wear-the-vibe
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and configuration

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://127.0.0.1:3000](http://127.0.0.1:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## AI Support Explanation

Wear The Vibe leverages cutting-edge AI technology to create a seamless connection between visual aesthetics and musical experiences:

### 🔬 **IBM Granite AI Integration**

The application uses IBM's Granite 3.3-8B Instruct model via Replicate for two primary AI functions:

1. **Mood Analysis**: The AI analyzes extracted color palettes using color psychology principles to determine the emotional tone and mood conveyed by your outfit colors.

2. **Music Generation**: Based on the detected mood, the AI generates personalized song recommendations that match the emotional and aesthetic vibe of your outfit.

### 🎨 **Color Psychology Engine**

- Extracts dominant colors and their percentages from uploaded images
- Applies color psychology research to interpret emotional responses
- Converts color combinations into mood descriptors

### 🎵 **Intelligent Music Curation**

- Processes mood data to understand musical preferences
- Generates diverse song recommendations across genres
- Ensures minimum 7 high-quality suggestions per analysis
- Considers tempo, energy, and emotional tone matching

### 🚀 **Real-time Processing**

- Streaming AI responses for better user experience
- Efficient API calls with optimized prompts
- Error handling and fallback mechanisms
- Redux state management for seamless data flow

### 🔒 **Privacy & Security**

- Images processed securely through Cloudinary
- No permanent storage of personal photos
- API rate limiting and error handling

The AI support makes Wear The Vibe more than just a music app—it's a sophisticated style-to-sound translator that understands the subtle connections between what you wear and what you might want to hear.

---

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ for fashion and music lovers everywhere**
