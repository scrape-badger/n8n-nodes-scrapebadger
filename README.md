# n8n-nodes-scrapebadger

This is an n8n community node for [ScrapeBadger](https://scrapebadger.com), providing Twitter/X scraping capabilities in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

ScrapeBadger provides comprehensive Twitter/X data access:

- **Users**: Get profiles, about info, followers, following, and search users
- **Tweets**: Get individual tweets, user timelines, and search tweets
- **Trends**: Get trending topics globally or by location
- **Places**: Search for Twitter places (for geotagged tweets)
- **Lists**: Get list details, search lists, and get list tweets
- **Communities**: Get community details and search communities

## Installation

### In n8n Desktop/Cloud

1. Go to **Settings > Community Nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-scrapebadger`
4. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node
npm install n8n-nodes-scrapebadger
```

## Credentials

To use this node, you need a ScrapeBadger API key:

1. Sign up at [scrapebadger.com](https://scrapebadger.com)
2. Navigate to your dashboard and create an API key
3. In n8n, go to **Credentials > Add Credential > ScrapeBadger API**
4. Enter your API key

## Operations

### User Operations

| Operation | Description |
|-----------|-------------|
| **Get Profile** | Get a user's profile by username |
| **Get About** | Get extended about information |
| **Search** | Search for users by query |
| **Get Followers** | Get a user's followers |
| **Get Following** | Get accounts a user follows |

### Tweet Operations

| Operation | Description |
|-----------|-------------|
| **Get by ID** | Get a single tweet by ID |
| **Get User Tweets** | Get recent tweets from a user |
| **Search** | Search tweets with query |

### Trend Operations

| Operation | Description |
|-----------|-------------|
| **Get Trends** | Get current trending topics |
| **Get Place Trends** | Get trends for a specific location (WOEID) |

### Place Operations

| Operation | Description |
|-----------|-------------|
| **Search** | Search for Twitter places |

### List Operations

| Operation | Description |
|-----------|-------------|
| **Get Detail** | Get list details |
| **Search** | Search for lists |
| **Get Tweets** | Get tweets from a list |

### Community Operations

| Operation | Description |
|-----------|-------------|
| **Get Detail** | Get community details |
| **Search** | Search for communities |

## Usage Examples

### Monitor Brand Mentions

1. Add a **Schedule Trigger** node (e.g., every hour)
2. Add a **ScrapeBadger** node:
   - Resource: Tweet
   - Operation: Search
   - Query: `@yourbrand OR "your brand"`
   - Max Results: 50
3. Add a **Slack** node to send notifications

### Track Competitor Activity

1. Add a **Schedule Trigger** node
2. Add a **ScrapeBadger** node:
   - Resource: Tweet
   - Operation: Get User Tweets
   - Username: competitor_handle
3. Add an **Airtable/Notion** node to store tweets

### Follower Growth Tracking

1. Add a **Schedule Trigger** node (daily)
2. Add a **ScrapeBadger** node:
   - Resource: User
   - Operation: Get Profile
   - Username: your_account
3. Add a **Google Sheets** node to log follower count

## Common WOEIDs for Trends

| Location | WOEID |
|----------|-------|
| Worldwide | 1 |
| United States | 23424977 |
| United Kingdom | 23424975 |
| Japan | 23424856 |
| Germany | 23424829 |
| France | 23424819 |
| Brazil | 23424768 |
| India | 23424848 |

## Rate Limits

ScrapeBadger uses a credit-based system. Each API call consumes credits based on the operation type. Check your dashboard for current usage and limits.

## Troubleshooting

### "Invalid API Key" Error

- Ensure your API key is correctly entered in credentials
- Check that your API key is active in the ScrapeBadger dashboard

### "Rate Limit Exceeded" Error

- Your account may have reached its rate limit
- Wait a moment and retry, or upgrade your plan

### Empty Results

- Verify the username/ID exists
- Check that the account is not private (private accounts return limited data)

## Resources

- [ScrapeBadger Documentation](https://docs.scrapebadger.com)
- [ScrapeBadger Dashboard](https://scrapebadger.com/dashboard)
- [n8n Community](https://community.n8n.io/)

## License

[MIT](LICENSE)

## Support

- **ScrapeBadger Support**: support@scrapebadger.com
- **GitHub Issues**: [Report bugs](https://github.com/scrape-badger/n8n-nodes-scrapebadger/issues)
