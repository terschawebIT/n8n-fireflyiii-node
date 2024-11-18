import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FireflyiiiOAuth2Api implements ICredentialType {
	name = 'fireflyiiiOAuth2Api';
	displayName = 'FireFly III OAuth2 API';
	documentationUrl = 'https://docs.firefly-iii.org/how-to/firefly-iii/features/api/';

	// Made inline authentication settings below, no need for this.
	extends = ['oAuth2Api'];

	properties: INodeProperties[] = [
		{
			displayName:
				'You must have self-hosted FireFly III instance, it\'s not a CloudService -yet?-. Refer to <a href="https://www.firefly-iii.org/" target="_blank">FireFly III Website</a> for more information.',
			name: 'API URL & Permissions',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Your FireFly III Instance URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-firefly-instance.com',
			description: 'The base URL of your FireFly III instance.',
			hint: 'Do not end with a trailing slash.',
			required: true,
			typeOptions: {
				regex: '^(https?:\\/\\/[^\\s/$.?#].[^\\s]*)[^\\s/]$',
			},
		},
		{
				displayName: 'Client ID',
				name: 'clientId',
				description: 'The Client ID from OAuth tab in Profile Page.',
				type: 'string',
				default: '',
				required: true,
		},
		{
				displayName: 'Client Secret',
				name: 'clientSecret',
				description: 'The Client Secret from OAuth tab in Profile Page.',
				type: 'string',
				typeOptions: {
						password: true,
				},
				required: true,
				default: '',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'string',
			default: 'https://your-firefly-instance.com/oauth/authorize',
			hint: 'Same as the base URL, with /oauth/authorize at the end.',
			required: true,
		},
		{
				displayName: 'Access Token URL',
				name: 'accessTokenUrl',
				type: 'string',
				default: 'https://your-firefly-instance.com/oauth/token',
				hint: 'Same as the base URL, with /oauth/token at the end.',
				required: true,
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
			description: 'The scope to request.',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
