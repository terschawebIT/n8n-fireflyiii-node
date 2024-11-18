/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import {
	INodeProperties,
} from 'n8n-workflow';

export const searchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'Search All',
				value: 'searchAll',
				description: 'Search for transactions or accounts',
				action: 'Query search',
			},
		],
		default: 'searchAll',
	},
];

export const searchFields: INodeProperties[] = [
	// ----------------------------------
	//         Search Operations
	// ----------------------------------
	{
		displayName: 'Search For',
		name: 'searchFor',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['searchAll'],
			},
		},
		options: [
			{
				name: 'Transactions',
				value: 'transactions',
				description: 'Search transactions',
			},
			{
					name: 'Accounts',
					value: 'accounts',
					description: 'Search accounts',
			},
		],
		default: 'transactions',
		description: 'The type of entity to search',
	},
	{
		displayName: 'Query',
		name: 'queryString',
		displayOptions: {
				show: {
				resource: ['search'],
				operation: ['searchAll'],
				},
		},
		type: 'string',
		default: '',
		required: true,
		description: 'The search query string, <a href="https://docs.firefly-iii.org/how-to/firefly-iii/features/search/" target="_blank">Learn more</a>',
	},

	// Account-specific fields
	{
			displayName: 'Account Type',
			name: 'type',
			type: 'options',
			displayOptions: {
					show: {
						resource: ['search'],
						operation: ['searchAll'],
						searchFor: ['accounts'], // Show only when searching accounts
					},
			},
			options: [
					{ name: 'All', value: 'all' },
					{ name: 'Asset', value: 'asset' },
					{ name: 'Cash', value: 'cash' },
					{ name: 'Expense', value: 'expense' },
					{ name: 'Revenue', value: 'revenue' },
					{ name: 'Special', value: 'special' },
					{ name: 'Hidden', value: 'hidden' },
					{ name: 'Liability', value: 'liability' },
					{ name: 'Liabilities', value: 'liabilities' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'Debt', value: 'debt' },
					{ name: 'Mortgage', value: 'mortgage' },
					{ name: 'None', value: '' },
			],
			default: '',
			description: 'Filter accounts by type',
	},
	{
			displayName: 'Field',
			name: 'searchField',
			type: 'options',
			displayOptions: {
					show: {
						resource: ['search'],
						operation: ['searchAll'],
						searchFor: ['accounts'], // Show only when searching accounts
					},
			},
			options: [
				{ name: 'All', value: 'all' },
				{ name: 'IBAN', value: 'iban' },
				{ name: 'Name', value: 'name' },
				{ name: 'Account Number', value: 'number' },
				{ name: 'ID', value: 'id' },
			],
			default: 'all',
			description: 'The Account field(s) to search in',
	},
	// ----------------------------------
	//    Shared Optional Collections
	// ----------------------------------
	// Pagination options
	{
		displayName: 'Pagination Options',
		name: 'paginationOptions',
		type: 'collection',
		placeholder: 'Add Pagination Options',
		default: {},
		displayOptions: {
				show: {
					resource: ['search'],
					operation: ['searchAll'],
				},
		},
		options: [
				{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
								minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
				},
				{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						typeOptions: {
								minValue: 1,
						},
						default: 1,
						description: 'The page number to retrieve',
				},
		],
	},
];
