# Browser2JS
Static HTML, CSS and browser JavaScript for https://browser2js.github.io/.
The site has no application server, Cloudflare Worker, Sites runtime, React or framework dependencies. Node.js is used only to assemble the static files during the build. The PHP, Python and Node.js snippets on the page are educational examples displayed as text.
## Publish this package
This ZIP includes the Git repository and a new commit whose author and committer are both `Anonymous <anonymous@example.invalid>`. It extends the initial commit in the supplied repository; existing history and the original LICENSE are preserved.
Extract the ZIP into a new folder, retaining its `.git` directory. In `browser2js/browser2js.github.io`, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions** once. Then run the following from the extracted `browser2js.github.io` folder:
```sh
git push origin main
```
The `origin` URL is `git@github.com:browser2js/browser2js.github.io.git`, matching the supplied repository. GitHub authentication uses your own SSH configuration; this package contains no credentials. Authentication and anonymous commit metadata are separate.
The workflow builds on pushes to `main` and can also be started manually. Its build job checks out submodules, runs `npm run build` and uploads only `dist/`; its deploy job publishes that artifact to GitHub Pages. A separate `gh-pages` branch is unnecessary.
If you already have another local checkout, use the repository in this ZIP rather than copying only the visible source files: the new anonymous commit and the submodule pin are recorded in its Git metadata. Normal push is intended; do not force-push over newer remote work.
## Build locally
Requirements: Node.js 24 and Git. No `npm install` is needed.
```sh
git submodule update --init --recursive
npm run build
```
The build writes `dist/index.html` and static assets. All asset URLs are relative, so the same output also works under a repository subpath. Open `dist/index.html` to inspect the page locally; clipboard access may require HTTPS or localhost, in which case the copy button selects the text instead.
## Source files
`src/index.html` contains the page and its text, `src/assets/styles.css` its styling, and `src/assets/site.js` the alert, copy buttons and keyboard-accessible runtime tabs. `scripts/build.mjs` assembles the static output. `.github/workflows/pages.yml` builds and publishes it.
The proof-of-concept subtitle is “A real, safe JavaScript alert”. The creator credit is “It was created by a very serious GPT6 Astra xhigh.” Here, “serious” describes the tone, not performance.
## Pinned dependency
`vendor/dragscroll` is a real Git submodule of https://github.com/asvd/dragscroll.git, fixed at `bb4cd42f3f850bedf9f9fd99a388017a09e29b52` (v0.0.8). The build checks that exact commit and rejects modifications. The `dragscroll` class is applied to `.table-wrap`. Its MIT license is retained in the submodule and copied into the published assets.
The source ZIP includes the populated submodule and portable Git metadata, but excludes generated builds and installed dependencies. GitHub Actions retrieves the same pinned commit using `submodules: recursive`; it does not track the upstream branch.
## Sharing metadata
The canonical URL and Open Graph URL are `https://browser2js.github.io/`; the metadata author is `browser2js`. English titles, descriptions, keywords, locale, image alternative text, and WebSite structured data identify this as satire. The X/Twitter card uses `summary_large_image`.
The supplied screenshot is included unchanged at `src/assets/browser2js-preview.png` and published at `https://browser2js.github.io/assets/browser2js-preview.png`. Its Open Graph dimensions match the original PNG: 1101 × 800. The sharing service controls cropping within its wide card. The screenshot URL becomes available on GitHub Pages after the deployment workflow completes.
## License
Browser2JS retains the supplied public-domain dedication in `LICENSE`. The independently licensed dragscroll dependency retains its own MIT license and upstream attribution.
## GitHub Pages documentation
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
