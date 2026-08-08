# Updating the live GitHub Pages site

## 1. Upload the replacement build

1. Extract `fly-tipping-watch-uk-review-fixed.zip`.
2. Open the extracted folder.
3. In the GitHub repository, choose **Add file → Upload files**.
4. Drag all files and folders from inside the extracted folder into the upload area.
5. GitHub will show existing files as replacements and new files as additions.
6. Commit with: `Apply public-site review fixes`.

## 2. Delete the obsolete setup file

Uploading replacements does not delete files that are no longer part of the build.

After committing, open:

`assets/config.js`

Choose **Delete this file**, then commit with:

`Remove obsolete submission configuration`

The new site does not use this file.

## 3. Confirm the issue templates

Check that the repository contains:

- `.github/ISSUE_TEMPLATE/factual-correction.yml`
- `.github/ISSUE_TEMPLATE/broken-link.yml`
- `.github/ISSUE_TEMPLATE/config.yml`

If the `.github` folder was not included by the browser upload, upload those files separately.

## 4. Check the deployment

Allow the GitHub Pages workflow to complete, then review:

- `/`
- `/data.html`
- `/bodies.html`
- `/cases.html`
- `/sources.html`
- `/about.html`
- `/contact.html`
- `/privacy.html`
- `/accessibility.html`

Also open the repository's **Issues → New issue** page and confirm the correction and broken-link forms appear.
