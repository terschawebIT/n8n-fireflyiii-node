import type {
	IHttpRequestMethods,
	IRequestOptions,
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	// INodeExecutionData,
	IPollFunctions,
} from 'n8n-workflow';

export async function fireflyApiRequestV2(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	// Credentials
	const credentials = await this.getCredentials('fireflyiiiOAuth2Api');

	if (!credentials) {
		throw new Error('No credentials returned!');
	}
	// Get global xTraceId if provided
	const xTraceId = this.getNodeParameter('xTraceId', 0, '') as string;

	// Construct Base URL
	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, ''); // Remove trailing slashes

	// Filter out empty query parameters
	const filteredQuery = Object.fromEntries(
		Object.entries(qs || {}).filter(([_, value]) => value != null && value !== ''),
	);

	// Build request options
	let options: IRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			...(xTraceId ? { 'X-Trace-Id': xTraceId } : {}),
		},
		method,
		body,
		qs: filteredQuery,
		uri: uri || `${baseUrl}/api/v1${resource}`,
		json: true,
	};
	options = Object.assign({}, options, option);

	// Make the request
	return await this.helpers.requestWithAuthentication.call(this, 'fireflyiiiOAuth2Api', options);
}
