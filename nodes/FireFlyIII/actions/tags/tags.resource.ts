/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const tagsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
		options: [
			{
				name: 'List Tags',
				value: 'listTags',
				description: 'Retrieve all tags',
				action: 'List tags',
			},
			{
				name: 'Get Tag',
				value: 'getTag',
				description: 'Retrieve a single tag by name',
				action: 'Get tag',
			},
			{
				name: 'Create Tag',
				value: 'createTag',
				description: 'Create a new tag',
				action: 'Create tag',
			},
			{
				name: 'Update Tag',
				value: 'updateTag',
				description: 'Update an existing tag',
				action: 'Update tag',
			},
			{ name: 'Delete Tag', value: 'deleteTag', description: 'Delete a tag', action: 'Delete tag' },
			{
				name: 'Get Transactions by Tag',
				value: 'getTransactionsByTag',
				description: 'Retrieve transactions linked to a tag',
				action: 'Get transactions by tag',
			},
		],
		default: 'listTags',
	},
];

export const tagsFields: INodeProperties[] = [
	{
		displayName: 'Target Tag Name/ID',
		name: 'tagNameId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['getTag', 'updateTag', 'deleteTag', 'getTransactionsByTag'],
			},
		},
		description: 'Targeted Name/ID of the tag (used in API PATH)',
		hint: 'If you use the tag itself, and it contains international (non-ASCII) characters, your milage may vary.',
	},
	{
		displayName: 'New Tag Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['createTag', 'updateTag'],
			},
		},
		description: 'New name of the tag (used in API BODY)',
	},
	// Extra Tag Options
	{
		displayName: 'Extra Tag Options',
		name: 'extraOptions',
		type: 'collection',
		placeholder: 'Add Extra Tag Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['createTag', 'updateTag'],
			},
		},
		options: [
			{
				displayName: 'Tag Date',
				name: 'date',
				type: 'string',
				default: '',
				description: 'Optional date of the tag',
				hint: 'Format: YYYY-MM-DD',
			},
			{
				displayName: 'Tag Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Optional description of the tag',
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
				resource: ['tags'],
				operation: ['listTags', 'getTransactionsByTag'],
			},
		},
	},
	// Date Range Filters
	{
		displayName: 'Date Range Filters',
		name: 'dateRangeFilters',
		type: 'collection',
		placeholder: 'Add Date Range Filters',
		default: {},
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['getTransactionsByTag'],
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
];
