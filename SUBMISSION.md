# n8n Community Node Submission Guide

This document outlines the steps to publish and submit the ScrapeBadger n8n node.

## Pre-Submission Checklist

Before submitting to n8n, ensure:

- [ ] Package name follows convention: `n8n-nodes-scrapebadger`
- [ ] MIT License included
- [ ] No runtime dependencies (verification requirement)
- [ ] README.md with usage examples
- [ ] Icon in SVG format
- [ ] All operations tested locally

## Step 1: Test Locally

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Link for local testing
npm link

# In your n8n installation
cd ~/.n8n
npm link n8n-nodes-scrapebadger

# Restart n8n and test
n8n start
```

## Step 2: Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish

# Verify publication
npm info n8n-nodes-scrapebadger
```

## Step 3: Create GitHub Repository

1. Create repository: `scrape-badger/n8n-nodes-scrapebadger`
2. Push code to repository
3. Add topics: `n8n`, `n8n-community-node`, `twitter`, `scraping`
4. Enable Issues for support requests

## Step 4: Submit to n8n Creator Portal

1. Go to [n8n Creator Portal](https://portal.n8n.io/)
2. Sign in with your n8n account
3. Click "Submit Node"
4. Fill in the submission form:
   - **npm Package Name**: `n8n-nodes-scrapebadger`
   - **GitHub Repository**: `https://github.com/scrape-badger/n8n-nodes-scrapebadger`
   - **Category**: Data & Storage
   - **Description**: Scrape Twitter/X data via ScrapeBadger API. Get user profiles, tweets, followers, trends, and more.

## Step 5: Create Demo Video (Required for Verification)

Record a 2-5 minute video demonstrating:

1. Installing the node
2. Setting up credentials
3. Using at least 2-3 different operations
4. Running a workflow successfully

Upload to YouTube (unlisted is fine) and include the link in your submission.

## Step 6: Verification Process

For verified status (required for n8n Cloud):

1. Ensure no runtime dependencies
2. Follow n8n coding guidelines
3. Provide working demo video
4. Respond to reviewer feedback promptly

Verification typically takes 1-2 weeks.

## Post-Submission

### Create Workflow Templates

Submit workflow templates to [n8n.io/workflows](https://n8n.io/workflows/):

1. **Twitter Mention Monitor**
   - Trigger: Schedule (every hour)
   - ScrapeBadger: Search tweets for mentions
   - Slack: Send notification

2. **Competitor Tweet Tracker**
   - Trigger: Schedule (daily)
   - ScrapeBadger: Get user tweets
   - Notion: Store in database

3. **Influencer Analytics**
   - Trigger: Schedule (weekly)
   - ScrapeBadger: Get profile + followers
   - Google Sheets: Log metrics

### Promote the Integration

- [ ] Announce on n8n community forum
- [ ] Post on Twitter/X
- [ ] Add to ScrapeBadger documentation
- [ ] Create blog post with use cases

## Maintenance

After publication:

1. Monitor GitHub issues
2. Update for n8n version compatibility
3. Add new features as ScrapeBadger API expands
4. Respond to user feedback

## Resources

- [n8n Node Creation Guide](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Verification Guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)
- [n8n Creator Portal](https://portal.n8n.io/)
- [n8n Community Forum](https://community.n8n.io/)
