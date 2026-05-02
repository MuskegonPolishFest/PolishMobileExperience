# Sanity CMS Architecture Guide

This document explains the technical implementation of the Sanity CMS integration for the Polish Tablet Experience. It serves as a guide for developers to understand the migration process, the build-time sync strategy, and how to maintain the content pipeline.

## 1. The Strategy: Build-Time Content Generation

Unlike typical CMS implementations that fetch data over the network while the user is using the app, this project uses **Build-Time Generation**.

### Why?
The target hardware (Lenovo tablets at a public festival) may not have stable internet. To ensure the app never crashes or shows loading spinners, we bundle all data and images directly into the application binary (APK).

### How it works:
1.  **Sanity Cloud:** Serves as the "Single Source of Truth."
2.  **`sync-content.js`:** A Node.js script that runs on a developer's machine. It pulls the latest data and downloads all images locally.
3.  **Generated Assets:** The script overwrites `constants/generatedContent.ts` and populates `assets/generated_images/`.
4.  **Expo Bundle:** When `eas build` or `npx expo start` is run, React Native treats these files as local assets, ensuring 100% offline reliability.

## 2. Content Schema (`poi`)

The core content type is the **Point of Interest (POI)**. You can find the schema definition in `studio-mpf/schemaTypes/poi.ts`.

Key fields include:
- **Unique ID (Slug):** Matches the legacy `c1`, `c2` identifiers to maintain compatibility with existing logic.
- **Historical Era(s):** An array allowing a single POI to appear across multiple timeline eras (e.g., "Golden Age" and "Wars & Partitions").
- **Map Hotspot:** Raw `top` and `left` coordinates (as percentages) used to place icons on the SVG maps.
- **Related Content:** A list of other POIs that should be suggested at the bottom of a detail screen.

## 3. The Migration (From Scratch)

This project was migrated from a hardcoded TypeScript configuration. The migration steps were:
1.  **Studio Setup:** Initialized a Sanity Studio in `studio-mpf/`.
2.  **Schema Mapping:** Converted the `PoiDetail` and `ContentCardItem` TS interfaces into a unified Sanity `poi` schema.
3.  **Automated Upload:** Used `studio-mpf/scripts/migrateData.js` to parse the local TS files, upload images to the Sanity Asset Pipeline, and create documents.
4.  **Data Correction:** Ran `fixSlugs.js` to ensure all string IDs were properly converted to Sanity's internal `slug` object format.

## 4. Maintenance Commands

### Syncing Content
To refresh the local app data with the latest changes from the [Live Studio](https://mpf.sanity.studio/):
```bash
npm run sync-content
```

### Modifying the Schema
If you need to add a new field (e.g., "Video URL"):
1.  Update `studio-mpf/schemaTypes/poi.ts`.
2.  Run `cd studio-mpf && npx sanity deploy` to push the new UI to the web.
3.  Update `scripts/sync-content.js` to include the new field in the GROQ query and the generated file output.

## 5. Security Note
The **SANITY_API_TOKEN** is required for the sync script and migration scripts to work. This token is stored in `studio-mpf/.env` and is **ignored by Git** to prevent unauthorized access to your CMS. If you lose this token, you can generate a new one in the Sanity Manage dashboard.
