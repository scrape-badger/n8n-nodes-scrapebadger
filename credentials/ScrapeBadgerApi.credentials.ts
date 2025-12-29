import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrapeBadgerApi implements ICredentialType {
	name = 'scrapeBadgerApi';
	displayName = 'ScrapeBadger API';
	documentationUrl = 'https://docs.scrapebadger.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your ScrapeBadger API key. Get one at https://scrapebadger.com',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.scrapebadger.com',
			description: 'The base URL for the ScrapeBadger API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/twitter/health',
			method: 'GET',
		},
	};
}
