/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { fireflyApiRequest } from './utils/ApiRequest';
import { aboutOperations, aboutFields } from './actions/about/about.resource';
import { accountsOperations, accountsFields } from './actions/accounts/accounts.resource';
import { searchFields, searchOperations } from './actions/search/search.resource';
import { categoriesFields, categoriesOperations } from './actions/categories/categories.resource';
import { tagsFields, tagsOperations } from './actions/tags/tags.resource';

export class Fireflyiii implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FireFly III',
		name: 'fireflyiii',
		icon: 'file:fireflyiii.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Read, update, write and delete data using the powerful FireFly III API',
		defaults: {
			name: 'FireFly III',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'fireflyiiiOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					// Search resource
					{
						name: 'Search API',
						value: 'search',
						description: 'Endpoints deliver search results for transactions or accounts',
						hint: 'Check https://docs.firefly-iii.org/how-to/firefly-iii/features/search/ for more information',
					},
					// About resource
					{
						name: 'About API',
						value: 'about',
						description:
							'Endpoints deliver general system information, version- and meta information',
					},
					// Accounts resource
					{
						name: 'Accounts API',
						value: 'accounts',
						description:
							"Endpoints deliver all of the user's asset, expense and other CRUD operations by Account",
					},
					// Categories resource
					{
						name: 'Categories API',
						value: 'categories',
						description:
							"Endpoints deliver all of the user's categories and CRUD operations by Category",
					},
					// Tags resource
					{
						name: 'Tags API',
						value: 'tags',
						description: "Endpoints deliver all of the user's tags and CRUD operations by Tag",
					},
				],
				default: 'about',
			},
			// Global optional X-Trace-ID header for all requests
			{
				displayName: 'X-Trace-ID',
				name: 'xTraceId',
				type: 'string',
				default: '',
				description: 'A unique UUID identifier for the request, used for debugging and tracing',
				placeholder: '123e4567-e89b-12d3-a456-426614174000',
			},
			// Include operations and fields for the added resources
			...searchOperations,
			...searchFields,
			...aboutOperations,
			...aboutFields,
			...accountsOperations,
			...accountsFields,
			...categoriesOperations,
			...categoriesFields,
			...tagsOperations,
			...tagsFields,
		],
	};

	// Logic for Execution
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			// Execution logic for different resources and operations

			// ----------------------------------
			//             About API
			// ----------------------------------
			if (resource === 'about') {
				if (operation === 'getSystemInfo') {
					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: '/about',
					});
					returnData.push({ json: response });
				} else if (operation === 'getUserInfo') {
					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: '/about/user',
					});
					returnData.push({ json: response });
				} else if (operation === 'runCronJobs') {
					const cliToken = this.getNodeParameter('cliToken', i) as string;

					const additionalOptions = this.getNodeParameter(
						'additionalOptions',
						i,
						{},
					) as IDataObject;

					// Dynamically build query parameters
					const query: IDataObject = {};
					if (additionalOptions.date) {
						query.date = additionalOptions.date; // Add only if a value exists
					}
					if (additionalOptions.force) {
						query.force = additionalOptions.force; // Add only if true (or any meaningful value)
					}

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/cron/${cliToken}`,
						query,
					});

					returnData.push({ json: response });
				}
			}
			// ----------------------------------
			//             Accounts API
			// ----------------------------------
			else if (resource === 'accounts') {
				if (operation === 'getTransactions') {
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;
					const dateRangeFilters = this.getNodeParameter('dateRangeFilters', i, {}) as IDataObject;
					const transactionsType = this.getNodeParameter('transactionsType', i) as string;
					const accountId = this.getNodeParameter('accountId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/accounts/${accountId}/transactions`,
						query: {
							...paginationOptions,
							...dateRangeFilters,
							type: transactionsType,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'getAttachments') {
					const accountId = this.getNodeParameter('accountId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/accounts/${accountId}/attachments`,
					});
					returnData.push({ json: response });
				} else if (operation === 'getPiggyBanks') {
					const accountId = this.getNodeParameter('accountId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/accounts/${accountId}/piggy-banks`,
					});
					returnData.push({ json: response });
				} else if (operation === 'listAccounts') {
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;
					const accountType = this.getNodeParameter('accountType', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: '/accounts',
						query: {
							type: accountType,
							...paginationOptions,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'createAccount') {
					const name = this.getNodeParameter('name', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					const accountFields = this.getNodeParameter('accountFields', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'POST',
						endpoint: '/accounts',
						body: {
							name,
							type,
							...accountFields,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'getAccount') {
					const accountId = this.getNodeParameter('accountId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/accounts/${accountId}`,
					});
					returnData.push({ json: response });
				} else if (operation === 'updateAccount') {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const updateFields = this.getNodeParameter('accountFields', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'PUT',
						endpoint: `/accounts/${accountId}`,
						body: updateFields,
					});
					returnData.push({ json: response });
				} else if (operation === 'deleteAccount') {
					const accountId = this.getNodeParameter('accountId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'DELETE',
						endpoint: `/accounts/${accountId}`,
					});
					returnData.push({ json: response });
				}
			}
			// ----------------------------------
			//             Search API
			// ----------------------------------
			else if (resource === 'search') {
				const searchFor = this.getNodeParameter('searchFor', i) as string;
				const queryString = this.getNodeParameter('queryString', i) as string;

				// Add account-specific fields if available
				const accountType = this.getNodeParameter('type', i, '') as string;
				const searchField = this.getNodeParameter('searchField', i, '') as string;

				const response = await fireflyApiRequest.call(this, {
					method: 'GET',
					endpoint: `/search/${searchFor}`,
					query: {
						type: accountType,
						field: searchField,
						query: queryString,
					},
				});
				returnData.push({ json: response });
			}
			// ----------------------------------
			//             Categories API
			// ----------------------------------
			else if (resource === 'categories') {
				if (operation === 'listCategories') {
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: '/categories',
						query: {
							...paginationOptions,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'createCategory') {
					const name = this.getNodeParameter('name', i) as string;
					const notes = this.getNodeParameter('notes', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'POST',
						endpoint: '/categories',
						body: {
							name,
							notes,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'getCategory') {
					const categoryId = this.getNodeParameter('categoryId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/categories/${categoryId}`,
					});
					returnData.push({ json: response });
				} else if (operation === 'updateCategory') {
					const categoryId = this.getNodeParameter('categoryId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const notes = this.getNodeParameter('notes', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'PUT',
						endpoint: `/categories/${categoryId}`,
						body: {
							name,
							notes,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'deleteCategory') {
					const categoryId = this.getNodeParameter('categoryId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'DELETE',
						endpoint: `/categories/${categoryId}`,
					});
					returnData.push({ json: response });
				} else if (operation === 'getTransactionsByCategory') {
					const categoryId = this.getNodeParameter('categoryId', i) as string;
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;
					const dateRangeFilters = this.getNodeParameter('dateRangeFilters', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/categories/${categoryId}/transactions`,
						query: {
							...paginationOptions,
							...dateRangeFilters,
						},
					});
					returnData.push({ json: response });
				}
			}
			// ----------------------------------
			//             Tags API
			// ----------------------------------
			else if (resource === 'tags') {
				if (operation === 'listTags') {
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: '/tags',
						query: paginationOptions,
					});
					returnData.push({ json: response });
				} else if (operation === 'createTag') {
					const newName = this.getNodeParameter('name', i) as string;
					const extraOptions = this.getNodeParameter('extraOptions', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'POST',
						endpoint: '/tags',
						body: {
							tag: newName,
							...extraOptions,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'getTag') {
					const tagNameId = this.getNodeParameter('tagNameId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/tags/${tagNameId}`,
					});
					returnData.push({ json: response });
				} else if (operation === 'updateTag') {
					const tagNameId = this.getNodeParameter('tagNameId', i) as string;
					const newName = this.getNodeParameter('name', i) as string;
					const extraOptions = this.getNodeParameter('extraOptions', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'PUT',
						endpoint: `/tags/${tagNameId}`,
						body: {
							tag: newName,
							...extraOptions,
						},
					});
					returnData.push({ json: response });
				} else if (operation === 'deleteTag') {
					const tagNameId = this.getNodeParameter('tagNameId', i) as string;

					const response = await fireflyApiRequest.call(this, {
						method: 'DELETE',
						endpoint: `/tags/${tagNameId}`,
					});
					returnData.push({ json: response });
				} else if (operation === 'getTransactionsByTag') {
					const tagNameId = this.getNodeParameter('tagNameId', i) as string;
					const paginationOptions = this.getNodeParameter(
						'paginationOptions',
						i,
						{},
					) as IDataObject;
					const dateRangeFilters = this.getNodeParameter('dateRangeFilters', i, {}) as IDataObject;

					const response = await fireflyApiRequest.call(this, {
						method: 'GET',
						endpoint: `/tags/${tagNameId}/transactions`,
						query: {
							...paginationOptions,
							...dateRangeFilters,
						},
					});
					returnData.push({ json: response });
				}
			}
		}
		return [returnData];
	}
}
