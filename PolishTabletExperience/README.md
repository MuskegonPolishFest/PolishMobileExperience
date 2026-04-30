# Polish Mobile Experience (Tablet Kiosk App)

The Polish Mobile Experience is a fully interactive, offline-first tablet application built with React Native (Expo). It is designed to act as a public kiosk display for the Muskegon Polish Festival, allowing users to explore the rich history of Poland through an interactive map, timeline, and curated Points of Interest (POIs).

Because the deployed Lenovo tablets may not have reliable internet access in a public festival setting, this application is engineered to bundle all high-resolution media and text content locally at build-time.

---

## ✨ Features

- **Interactive SVG Maps:** Pan and zoom across custom historical maps of Poland.
- **Dynamic Timeline Scrubber:** Navigate through different eras (Golden Age to Modern Poland) to see how borders shifted over time.
- **Curated Points of Interest (POIs):** Tappable hotspots that reveal detailed historical facts and images.
- **100% Offline Capable:** Zero loading spinners. All data and high-res images are bundled directly into the APK.
- **Headless CMS Integration:** Powered by Sanity CMS, allowing non-technical festival staff to safely update text and images for future events without altering the React codebase.

---

## 🛠️ Tech Stack

- **Frontend:** React Native, Expo, React Navigation (Expo Router)
- **Styling:** StyleSheet, custom Themed Components
- **CMS:** Sanity (Headless CMS)
- **Media:** `expo-image` for high-performance image rendering, `react-native-svg` for vector maps.
- **Language:** TypeScript

---

## 🏗 Architecture & Offline Strategy

Instead of fetching data from Sanity at runtime (when the user touches the tablet), we download all content and images *before* building the app. 

This ensures that:
1. The kiosk never fails due to a bad internet connection.
2. The UI is completely instantaneous.
3. The content can be managed via a friendly web interface.

---

## 📝 Content Management (Sanity CMS)

All content (Points of Interest, text, and images) is managed via the Sanity Studio.

### 1. Update Content in the Studio
The easiest way to manage content is via the deployed Studio:
👉 **[https://mpf.sanity.studio/](https://mpf.sanity.studio/)**

Alternatively, you can run the studio locally:
```bash
cd studio-mpf
npm run dev
```

### 2. Sync Content to the App (Crucial Step!)
Before building a new version of the tablet app, you **must** sync the latest content from Sanity to your local environment.

Run the following command from the root folder (`PolishTabletExperience`):
```bash
npm run sync-content
```

**What this does:**
- Authenticates with the Sanity Cloud using the API Token.
- Downloads all POI text data and dynamically generates `constants/generatedContent.ts`.
- Downloads all high-resolution images to `assets/generated_images/`.

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18+)
- Expo CLI
- An Android Emulator or physical tablet for testing

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Sync the latest content (Requires `.env` file in `studio-mpf/` with `SANITY_API_TOKEN`):
   ```bash
   npm run sync-content
   ```
4. Start the Expo development server:
   ```bash
   npx expo start
   ```

---

## 📦 Building for Production

To create the final APK to load onto the Lenovo tablets:

1. Ensure your content is perfectly synced:
   ```bash
   npm run sync-content
   ```
2. Build the Android APK using Expo Application Services (EAS):
   ```bash
   eas build -p android --profile production
   ```
3. Download the resulting `.apk` file and sideload it onto the target tablets.

---

## 📁 Project Structure

```text
PolishTabletExperience/
├── app/                  # Expo Router navigation and main screen entry points
├── components/           # Reusable UI components (MapHotspot, ContentCard, etc.)
├── constants/            # Theme colors, fonts, and generated content data
│   └── generatedContent.ts # AUTO-GENERATED: Do not edit manually!
├── assets/               # Static assets
│   ├── maps_svg/         # Historical map vectors
│   └── generated_images/ # AUTO-GENERATED: Images downloaded from Sanity
├── scripts/
│   └── sync-content.js   # Build-time script to fetch Sanity data
└── studio-mpf/           # Sanity Studio configuration and schema definitions
```
