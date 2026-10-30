# Deployment Guide (`DEPLOYMENT.md`)

Step-by-step instructions for deploying the **Urban Cafe & Restaurant** website to **Netlify** or **Vercel**, connecting a custom domain, and completing the pre-launch checklist.

---

## 1. Deploying to Netlify

### Option A: Drag-and-Drop (Fastest for Sample Pitch)
1. Run `npm run build` locally to generate the `dist/` folder (or use the project root directly since `index.html`, `styles.css`, `script.js`, `menu.json`, `sitemap.xml`, `robots.txt`, and `images/` are all at the root).
2. Log in to [app.netlify.com](https://app.netlify.com/).
3. Drag the `dist/` folder (or root folder) into the **Deploy manually** dropzone.
4. Netlify will publish a live HTTPS preview URL (e.g., `https://urban-cafe-abbottabad-sample.netlify.app`) in under 15 seconds.

### Option B: Git Repository Continuous Deployment
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Netlify, click **Add new site -> Import an existing project**.
3. Select the repository and configure:
   - **Build command**: `npm run build` (or leave blank if serving root static files)
   - **Publish directory**: `dist` (or `.` if Build command is blank)
4. Click **Deploy site**.

---

## 2. Deploying to Vercel

1. Install the Vercel CLI (`npm i -g vercel`) or log in to [vercel.com](https://vercel.com/).
2. Click **Add New -> Project** and import your Git repository.
3. Configure build settings:
   - **Framework Preset**: Vite (or Other for static root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 3. Custom Domain Setup

Once the owner approves the website and registers a domain (for example, `urbancafeabbottabad.com` or `urbancafe.pk`):

1. **Add Domain in Host Dashboard**:
   - In Netlify (`Domain management -> Add a domain`) or Vercel (`Settings -> Domains`), enter the domain name.
2. **Configure DNS Records**:
   - Point the apex `@` `A` record to the host's load balancer IP (`75.2.60.5` for Netlify or `76.76.21.21` for Vercel).
   - Point the `www` `CNAME` record to your Netlify/Vercel subdomain.
3. **Verify HTTPS / SSL**:
   - Wait for automatic Let's Encrypt SSL provisioning (typically 2-10 minutes) and enable **Force HTTPS**.
4. **Update Canonical & Sitemap URLs**:
   - Replace `https://urbancafeabbottabad.example.com` in `index.html` (`<link rel="canonical">`, `og:url`, JSON-LD `url`), `script.js` (`LIVE_SITE_URL`), `sitemap.xml`, and `robots.txt` with the live production domain.

---

## 4. Pre-Launch Checklist (Before Handing Over to Owner)

- [ ] Replace all `"Rs. ---"` placeholders in `menu.json` with confirmed PKR prices from the owner.
- [ ] Replace `/images/hero-placeholder.svg` and `/images/gallery-1.svg` through `gallery-6.svg` with licensed photos provided by the owner.
- [ ] Replace the text logo in `<header>` with the owner's official logo file (and update `:root` colors in `styles.css` if requested).
- [ ] Confirm with the owner that `+92 313 9755550` (`923139755550`) is the active WhatsApp number for receiving customer orders and birthday inquiries.
- [ ] Confirm daily opening hours (`Mon-Thu & Sat-Sun: 12:30 - 23:15`, `Fri: 14:30 - 23:15`) and parking instructions at Jadoon Plaza Phase 2, Mandian.
- [ ] Ask if an official Instagram handle exists; if so, populate `INSTAGRAM_URL` in `script.js`.
- [ ] Generate and verify the final table QR code pointing to the live custom domain and test scanning it with both Android and iOS cameras.
- [ ] Test one real WhatsApp order and one birthday booking inquiry end-to-end with the restaurant's phone.
