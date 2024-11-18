/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const categoriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['categories'],
			},
		},
		options: [
			{
				name: 'List Categories',
				value: 'listCategories',
				description: 'Retrieve all categories',
				action: 'List categories',
			},
			{
				name: 'Get Category',
				value: 'getCategory',
				description: 'Retrieve a single category by ID',
				action: 'Get category',
			},
			{
				name: 'Create Category',
				value: 'createCategory',
				description: 'Create a new category',
				action: 'Create category',
			},
			{
				name: 'Update Category',
				value: 'updateCategory',
				description: 'Update an existing category',
				action: 'Update category',
			},
			{
				name: 'Delete Category',
				value: 'deleteCategory',
				description: 'Delete a category',
				action: 'Delete category',
			},
			{
				name: 'Get Transactions by Category',
				value: 'getTransactionsByCategory',
				description: 'Retrieve transactions linked to a category',
				action: 'Get transactions by category',
			},
		],
		default: 'listCategories',
	},
];

export const categoriesFields: INodeProperties[] = [
	// Fields for each operation
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['categories'],
				operation: ['getCategory', 'updateCategory', 'deleteCategory', 'getTransactionsByCategory'],
			},
		},
		description: 'The ID of the category',
	},

	// Fields for createCategory and updateCategory
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['categories'],
				operation: ['createCategory', 'updateCategory'],
			},
		},
		description: 'The name of the category',
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['categories'],
				operation: ['createCategory', 'updateCategory'],
			},
		},
		description: 'The Notes in the category',
	},
	// Date Range Filter
	{
		displayName: 'Date Range Filters',
		name: 'dateRangeFilters',
		type: 'collection',
		placeholder: 'Add Date Range Filters',
		default: {},
		displayOptions: {
			show: {
				resource: ['categories'],
				operation: ['getTransactionsByCategory'],
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

	// Pagination Options
	{
		displayName: 'Pagination Options',
		name: 'paginationOptions',
		type: 'collection',
		placeholder: 'Add Pagination Options',
		default: {},
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
				default: 1,
				description: 'The page number',
			},
		],
		displayOptions: {
			show: {
				resource: ['categories'],
				operation: ['listCategories', 'getTransactionsByCategory'],
			},
		},
	},
];
