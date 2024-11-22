import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';

export async function fireflyApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	{
		method,
		endpoint,
		headers = {},
		body = {},
		query = {},
		uri,
	}: {
		method: IHttpRequestMethods;
		endpoint: string;
		headers?: IDataObject;
		body?: IDataObject;
		query?: IDataObject;
		uri?: string; // Optional override for full custom URI
	},
): Promise<any> {
	const credentials = await this.getCredentials('fireflyiiiOAuth2Api');

	if (!credentials) {
		throw new Error('No credentials returned!');
	}

	// Get global xTraceId if provided
	const xTraceId = this.getNodeParameter('xTraceId', 0, '') as string;

	// Construct Base URL
	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, ''); // Remove trailing slashes
	const url = uri || `${baseUrl}/api/v1${endpoint}`;

	// Filter out empty query parameters
	const filteredQuery = Object.fromEntries(
		Object.entries(query || {}).filter(([_, value]) => value != null && value !== ''),
	);

	// Build request options
	const options: IHttpRequestOptions = {
		method,
		body: method === 'GET' || method === 'HEAD' || method === 'DELETE' ? null : body, // Assign body conditionally
		qs: filteredQuery,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(headers || {}),
			...(xTraceId ? { 'X-Trace-Id': xTraceId } : {}),
		},
		url,
		json: true,
		returnFullResponse: true,
	};

	// Only include body for non-GET requests
	if (method !== 'GET' && method !== 'HEAD' && method !== 'DELETE') {
		options.body = body;
	}

	// Make API request
	return this.helpers.requestWithAuthentication.call(this, 'fireflyiiiOAuth2Api', options);
}
