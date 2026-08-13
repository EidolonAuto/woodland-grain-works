# Deployment

The production artifact is the repository's static files. There is no build output and no runtime secret.

## GitHub Pages

1. In repository settings, open **Pages**.
2. Select **GitHub Actions** as the source.
3. Push to `main` or run the **Deploy static site** workflow manually.
4. Configure the custom domain if one is selected, then update canonical and Open Graph URLs.

The quality workflow runs independently on pushes and pull requests. Branch protection should require it before merging.

## Other static hosts

Use repository root as the publish directory and no build command. Add host redirects or headers only in provider-specific files when a verified need appears; keep core site behavior provider-neutral.

## Pre-launch checklist

- Replace `https://example.com/` canonical placeholder.
- Use an absolute production URL for the social preview.
- Connect and test the inquiry backend or keep the form visibly disabled.
- Verify all business facts and policies.
- Run quality checks and rendered tests on the deployed origin.
- Configure HTTPS, a restrictive Content Security Policy, referrer policy, and other security headers at the host.

