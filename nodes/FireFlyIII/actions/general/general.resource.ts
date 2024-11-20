/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const generalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['general'],
			},
		},
		options: [
			{
				name: 'Search All API',
				value: 'searchAll',
				description: 'Search for transactions or accounts',
				action: 'Query search',
			},
			// New operation
			{
				name: 'Insights',
				value: 'getInsights',
				description:
					'The "insight" endpoints try to deliver sums, balances and insightful information in the broadest sense of the word',
				action: 'Get general insights',
			},
		],
		default: 'searchAll',
	},
];

// Search Operation Fields
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
				resource: ['general'],
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
		displayName:
			'Check out <a href="https://docs.firefly-iii.org/how-to/firefly-iii/features/search/" target="_blank">Intro to Search</a> for an overview, or jump to <a href="https://docs.firefly-iii.org/references/firefly-iii/search/" target="_blank">Full Search Options Reference</a> for indepth customization.',
		name: 'Tip',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['searchAll'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'queryString',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['searchAll'],
			},
		},
		type: 'string',
		default: '',
		required: true,
		description: 'The search query string',
	},

	// Account-specific fields
	{
		displayName: 'Account Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['general'],
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
				resource: ['general'],
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
				resource: ['general'],
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

// Insights Operation Fields
export const insightsFields: INodeProperties[] = [
	// ----------------------------------
	//     		Top Common Fields
	// ----------------------------------
	{
		displayName: 'Insights On',
		name: 'insight',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
			},
		},
		options: [
			{ name: 'Expenses', value: 'expense' },
			{ name: 'Income', value: 'income' },
			{ name: 'Transfers', value: 'transfer' },
		],
		default: 'expense',
		description: 'The type of transaction',
	},
	// Group insights by
	// General Info Notice TO SHOW ON TOP to check API Docs
	{
		displayName:
			"Some Group by options doesn't work with all Transaction types, try it or check API Docs to learn more.",
		name: 'Tip',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Group By',
		name: 'groupBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
			},
		},
		options: [
			{ name: 'Asset', value: 'asset', description: 'Group by asset account' },
			{ name: 'Expense', value: 'expense', description: 'Group by expense account' },
			{ name: 'Revenue', value: 'revenue', description: 'Group by revenue account' },
			{ name: 'Total', value: 'total', description: 'Show total of specified type' },
			{ name: 'Category', value: 'category', description: 'Group by category' },
			{ name: 'No Category', value: 'no-category', description: 'Without a category' },
			{ name: 'Tag', value: 'tag', description: 'Group by tag' },
			{ name: 'No Tag', value: 'no-tag', description: 'Without any tag' },
			{ name: 'Budget', value: 'budget', description: 'Group by budget' },
			{ name: 'No Budget', value: 'no-budget', description: 'Without any budget' },
			{ name: 'Bill', value: 'bill', description: 'Group by bill' },
			{ name: 'No Bill', value: 'no-bill', description: 'Without any bill' },
		],
		default: 'asset',
		description: 'The type of transaction',
	},
	// The Mandatory start-end Date Range Fields
	// Date Range Filter
	{
		displayName: 'Date Range Filters',
		name: 'dateRangeFilters',
		type: 'collection',
		placeholder: 'Add Date Range Filters',
		default: {
			start: '',
			end: '',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'string',
				default: '',
				description: 'Filter results starting from this date (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'end',
				type: 'string',
				default: '',
				description: 'Filter results up to this date (YYYY-MM-DD)',
			},
		],
	},
	// Optional Accounts ids to filter as array[integer] or comma-separated string
	{
		displayName: 'Account IDs',
		name: 'accounts',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
			},
		},
		description: 'Comma-separated list of account IDs',
	},
	// ----------------------------------
	//     	Conditional Fields
	// ----------------------------------
	// Optional Category IDs to filter as array[integer] or comma-separated string
	{
		displayName: 'Category IDs',
		name: 'categories',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
				groupBy: ['category'],
			},
		},
		description: 'Comma-separated list of category IDs',
	},
	// Optional Tag IDs to filter as array[integer] or comma-separated string
	{
		displayName: 'Tag IDs',
		name: 'tags',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
				groupBy: ['tag'],
			},
		},
		description: 'Comma-separated list of tag IDs',
	},
	// Optional Budget IDs to filter as array[integer] or comma-separated string
	{
		displayName: 'Budget IDs',
		name: 'budgets',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
				groupBy: ['budget'],
			},
		},
		description: 'Comma-separated list of budget IDs',
	},
	// Optional Bill IDs to filter as array[integer] or comma-separated string
	{
		displayName: 'Bill IDs',
		name: 'bills',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['general'],
				operation: ['getInsights'],
				groupBy: ['bill'],
			},
		},
		description: 'Comma-separated list of bill IDs',
	},

];
