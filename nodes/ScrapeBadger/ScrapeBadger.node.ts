import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class ScrapeBadger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScrapeBadger',
		name: 'scrapeBadger',
		icon: 'file:scrapebadger.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Scrape Twitter/X data via ScrapeBadger API',
		defaults: {
			name: 'ScrapeBadger',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'scrapeBadgerApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl || "https://api.scrapebadger.com"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// ===========================================
			// Resource Selection
			// ===========================================
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
						description: 'Get Twitter/X user data',
					},
					{
						name: 'Tweet',
						value: 'tweet',
						description: 'Get tweet data',
					},
					{
						name: 'Trend',
						value: 'trend',
						description: 'Get trending topics',
					},
					{
						name: 'Place',
						value: 'place',
						description: 'Search for places',
					},
					{
						name: 'List',
						value: 'list',
						description: 'Get Twitter list data',
					},
					{
						name: 'Community',
						value: 'community',
						description: 'Get Twitter community data',
					},
				],
				default: 'user',
			},

			// ===========================================
			// User Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get Profile',
						value: 'getProfile',
						description: 'Get a user profile by username',
						action: 'Get user profile',
					},
					{
						name: 'Get About',
						value: 'getAbout',
						description: 'Get extended about information for a user',
						action: 'Get user about info',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for users by query',
						action: 'Search users',
					},
					{
						name: 'Get Followers',
						value: 'getFollowers',
						description: 'Get followers of a user',
						action: 'Get user followers',
					},
					{
						name: 'Get Following',
						value: 'getFollowing',
						description: 'Get accounts a user is following',
						action: 'Get user following',
					},
				],
				default: 'getProfile',
			},

			// ===========================================
			// Tweet Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tweet'],
					},
				},
				options: [
					{
						name: 'Get by ID',
						value: 'getById',
						description: 'Get a tweet by its ID',
						action: 'Get tweet by ID',
					},
					{
						name: 'Get User Tweets',
						value: 'getUserTweets',
						description: 'Get recent tweets from a user',
						action: 'Get user tweets',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for tweets by query',
						action: 'Search tweets',
					},
				],
				default: 'getById',
			},

			// ===========================================
			// Trend Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['trend'],
					},
				},
				options: [
					{
						name: 'Get Trends',
						value: 'getTrends',
						description: 'Get current trending topics',
						action: 'Get trends',
					},
					{
						name: 'Get Place Trends',
						value: 'getPlaceTrends',
						description: 'Get trends for a specific location',
						action: 'Get place trends',
					},
				],
				default: 'getTrends',
			},

			// ===========================================
			// Place Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['place'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						description: 'Search for places by name',
						action: 'Search places',
					},
				],
				default: 'search',
			},

			// ===========================================
			// List Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['list'],
					},
				},
				options: [
					{
						name: 'Get Detail',
						value: 'getDetail',
						description: 'Get details about a Twitter list',
						action: 'Get list detail',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for Twitter lists',
						action: 'Search lists',
					},
					{
						name: 'Get Tweets',
						value: 'getTweets',
						description: 'Get tweets from a Twitter list',
						action: 'Get list tweets',
					},
				],
				default: 'getDetail',
			},

			// ===========================================
			// Community Operations
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['community'],
					},
				},
				options: [
					{
						name: 'Get Detail',
						value: 'getDetail',
						description: 'Get details about a Twitter community',
						action: 'Get community detail',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for Twitter communities',
						action: 'Search communities',
					},
				],
				default: 'getDetail',
			},

			// ===========================================
			// Input Fields
			// ===========================================

			// Username field (for user operations)
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getProfile', 'getAbout', 'getFollowers', 'getFollowing'],
					},
				},
				default: '',
				placeholder: 'elonmusk',
				description: 'Twitter username (without @)',
			},

			// Username for getting user tweets
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tweet'],
						operation: ['getUserTweets'],
					},
				},
				default: '',
				placeholder: 'elonmusk',
				description: 'Twitter username (without @)',
			},

			// Tweet ID field
			{
				displayName: 'Tweet ID',
				name: 'tweetId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tweet'],
						operation: ['getById'],
					},
				},
				default: '',
				placeholder: '1234567890123456789',
				description: 'The ID of the tweet to retrieve',
			},

			// Query field for user search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['search'],
					},
				},
				default: '',
				placeholder: 'AI researcher',
				description: 'Search query for finding users',
			},

			// Query field for tweet search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tweet'],
						operation: ['search'],
					},
				},
				default: '',
				placeholder: 'AI agents',
				description: 'Search query for finding tweets. Supports advanced Twitter search operators.',
			},

			// Query field for place search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['place'],
						operation: ['search'],
					},
				},
				default: '',
				placeholder: 'San Francisco',
				description: 'Place name to search for',
			},

			// Query field for list search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['list'],
						operation: ['search'],
					},
				},
				default: '',
				placeholder: 'tech news',
				description: 'Search query for finding lists',
			},

			// Query field for community search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['community'],
						operation: ['search'],
					},
				},
				default: '',
				placeholder: 'developers',
				description: 'Search query for finding communities',
			},

			// List ID field
			{
				displayName: 'List ID',
				name: 'listId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['list'],
						operation: ['getDetail', 'getTweets'],
					},
				},
				default: '',
				placeholder: '1234567890',
				description: 'The ID of the Twitter list',
			},

			// Community ID field
			{
				displayName: 'Community ID',
				name: 'communityId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['community'],
						operation: ['getDetail'],
					},
				},
				default: '',
				placeholder: '1234567890',
				description: 'The ID of the Twitter community',
			},

			// WOEID field for place trends
			{
				displayName: 'WOEID',
				name: 'woeid',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['trend'],
						operation: ['getPlaceTrends'],
					},
				},
				default: 23424977,
				description: 'Where On Earth ID. Common values: US=23424977, UK=23424975, Japan=23424856, World=1.',
			},

			// Trend category (optional)
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['trend'],
						operation: ['getTrends'],
					},
				},
				options: [
					{
						name: 'All',
						value: '',
						description: 'All trending topics',
					},
					{
						name: 'News',
						value: 'news',
						description: 'News-related trends',
					},
					{
						name: 'Sports',
						value: 'sports',
						description: 'Sports-related trends',
					},
					{
						name: 'Entertainment',
						value: 'entertainment',
						description: 'Entertainment-related trends',
					},
				],
				default: '',
				description: 'Filter trends by category',
			},

			// Max results field (for operations that support it)
			{
				displayName: 'Max Results',
				name: 'maxResults',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 200,
				},
				displayOptions: {
					show: {
						operation: ['search', 'getFollowers', 'getFollowing', 'getUserTweets', 'getTweets'],
					},
				},
				default: 20,
				description: 'Maximum number of results to return',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let endpoint = '';
				const method: IHttpRequestMethods = 'GET';
				const qs: Record<string, string | number> = {};

				// ===========================================
				// User Resource
				// ===========================================
				if (resource === 'user') {
					if (operation === 'getProfile') {
						const username = this.getNodeParameter('username', i) as string;
						endpoint = `/v1/twitter/users/${encodeURIComponent(username)}`;
					} else if (operation === 'getAbout') {
						const username = this.getNodeParameter('username', i) as string;
						endpoint = `/v1/twitter/users/${encodeURIComponent(username)}/about`;
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = '/v1/twitter/users/search';
						qs.query = query;
						qs.max_results = maxResults;
					} else if (operation === 'getFollowers') {
						const username = this.getNodeParameter('username', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = `/v1/twitter/users/${encodeURIComponent(username)}/followers`;
						qs.max_results = maxResults;
					} else if (operation === 'getFollowing') {
						const username = this.getNodeParameter('username', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = `/v1/twitter/users/${encodeURIComponent(username)}/following`;
						qs.max_results = maxResults;
					}
				}

				// ===========================================
				// Tweet Resource
				// ===========================================
				else if (resource === 'tweet') {
					if (operation === 'getById') {
						const tweetId = this.getNodeParameter('tweetId', i) as string;
						endpoint = `/v1/twitter/tweets/${encodeURIComponent(tweetId)}`;
					} else if (operation === 'getUserTweets') {
						const username = this.getNodeParameter('username', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = `/v1/twitter/users/${encodeURIComponent(username)}/tweets`;
						qs.max_results = maxResults;
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = '/v1/twitter/tweets/search';
						qs.query = query;
						qs.max_results = maxResults;
					}
				}

				// ===========================================
				// Trend Resource
				// ===========================================
				else if (resource === 'trend') {
					if (operation === 'getTrends') {
						const category = this.getNodeParameter('category', i) as string;
						endpoint = '/v1/twitter/trends';
						if (category) {
							qs.category = category;
						}
					} else if (operation === 'getPlaceTrends') {
						const woeid = this.getNodeParameter('woeid', i) as number;
						endpoint = `/v1/twitter/trends/place/${woeid}`;
					}
				}

				// ===========================================
				// Place Resource
				// ===========================================
				else if (resource === 'place') {
					if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						endpoint = '/v1/twitter/geo/search';
						qs.query = query;
					}
				}

				// ===========================================
				// List Resource
				// ===========================================
				else if (resource === 'list') {
					if (operation === 'getDetail') {
						const listId = this.getNodeParameter('listId', i) as string;
						endpoint = `/v1/twitter/lists/${encodeURIComponent(listId)}`;
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = '/v1/twitter/lists/search';
						qs.query = query;
						qs.max_results = maxResults;
					} else if (operation === 'getTweets') {
						const listId = this.getNodeParameter('listId', i) as string;
						const maxResults = this.getNodeParameter('maxResults', i) as number;
						endpoint = `/v1/twitter/lists/${encodeURIComponent(listId)}/tweets`;
						qs.max_results = maxResults;
					}
				}

				// ===========================================
				// Community Resource
				// ===========================================
				else if (resource === 'community') {
					if (operation === 'getDetail') {
						const communityId = this.getNodeParameter('communityId', i) as string;
						endpoint = `/v1/twitter/communities/${encodeURIComponent(communityId)}`;
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						endpoint = '/v1/twitter/communities/search';
						qs.query = query;
					}
				}

				// Make the API request
				const responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'scrapeBadgerApi',
					{
						method,
						url: endpoint,
						qs: Object.keys(qs).length > 0 ? qs : undefined,
					},
				);

				// Handle array responses
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
