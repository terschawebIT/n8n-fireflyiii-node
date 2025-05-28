import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IPollFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';

export async function fireflyApiRequestV2(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
	option: Partial<IHttpRequestOptions> = {},
): Promise<any> {
	// Credentials
	const credentials = await this.getCredentials('fireflyiiiOAuth2Api');

	// Base URL
	const baseUrl = credentials.url as string;

	// Filter out empty query parameters
	const filteredQuery = Object.fromEntries(
		Object.entries(query || {}).filter(([_, value]) => value != null && value !== ''),
	);

	// Prepare request options
	const options: IHttpRequestOptions = {
		method,
		url: uri || `${baseUrl}/api/v1${endpoint}`,
		body,
		qs: filteredQuery,
		json: true,
		...option,
	};

	// Make the request
	return await this.helpers.httpRequest(options);
}
