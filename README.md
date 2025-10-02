
  # Admin Panel Design

  This is a code bundle for Admin Panel Design. The original project is available at https://www.figma.com/design/WA1iFkYIwn6DNZmjdTc4un/Admin-Panel-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deploying to Vercel

  This project is configured for deployment on Vercel. Follow these steps:

  ### Option 1: Deploy via Vercel CLI

  1. Install Vercel CLI globally:
     ```bash
     npm install -g vercel
     ```

  2. Deploy to Vercel:
     ```bash
     vercel
     ```

  3. Follow the prompts to link your project and deploy.

  ### Option 2: Deploy via Vercel Dashboard

  1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
  2. Go to [vercel.com](https://vercel.com) and sign in
  3. Click "New Project"
  4. Import your repository
  5. Vercel will automatically detect the configuration from `vercel.json`
  6. Click "Deploy"

  The `vercel.json` file is already configured with the correct build settings:
  - Build command: `npm run build`
  - Output directory: `build`
  - Client-side routing support is enabled
  