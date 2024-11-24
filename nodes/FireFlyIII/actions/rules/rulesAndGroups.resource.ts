/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const rulesAndGroupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
			},
		},
		default: 'listGroups',
		options: [
			// Rule Groups Operations
			{
				name: 'List Rule Groups',
				value: 'listGroups',
				description: 'Retrieve a list of all rule groups',
				action: 'List rule groups',
			},
			{
				name: 'Get Rule Group',
				value: 'getGroup',
				description: 'Get a single rule group by ID',
				action: 'Get a rule group',
			},
			{
				name: 'List Rules in Group',
				value: 'listGroupRules',
				description: 'List all rules in a rule group',
				action: 'List rules in group',
			},
			{
				name: 'Test Rule Group',
				value: 'testGroup',
				description: 'Test which transactions would be hit by the rule group',
				action: 'Test rule group',
			},
			{
				name: 'Trigger Rule Group',
				value: 'triggerGroup',
				description: 'Fire the rule group on your transactions',
				action: 'Trigger rule group',
			},
			// Rules Operations
			{
				name: 'List Rules',
				value: 'listRules',
				description: 'Retrieve a list of all rules',
				action: 'List rules',
			},
			{
				name: 'Get Rule',
				value: 'getRule',
				description: 'Get a single rule by ID',
				action: 'Get rule',
			},
			{
				name: 'Test Rule',
				value: 'testRule',
				description: 'Test which transactions would be hit by the rule',
				action: 'Test rule',
			},
			{
				name: 'Trigger Rule',
				value: 'triggerRule',
				description: 'Fire the rule on your transactions',
				action: 'Trigger rule',
			},
		],
	},
];

export const rulesAndGroupsFields: INodeProperties[] = [
	// ID Field for operations that require a rule group ID
	{
		displayName: 'Rule/Group ID',
		name: 'ruleGroupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
				operation: [
					'getGroup',
					'listGroupRules',
					'testGroup',
					'triggerGroup',
					'getRule',
					'testRule',
					'triggerRule',
				],
			},
		},
		description: 'The ID of the rule or group to operate on',
	},

	// Date Filters for "Test & Trigger"
	{
		displayName: 'Date Range Filters',
		name: 'dateRangeFilters',
		type: 'collection',
		placeholder: 'Add Date Range Filters',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
				operation: ['testGroup', 'triggerGroup', 'testRule', 'triggerRule'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'string',
				default: '={{ $now.minus(30,\'days\').toFormat("yyyy-MM-dd") }}',
				description: 'Start date for testing transactions (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'end',
				type: 'string',
				default: '',
				description: 'End date for testing transactions (YYYY-MM-DD)',
			},
		],
	},

	// Optional Account IDs for "Test & Trigger"
	{
		displayName: 'Account IDs',
		name: 'accounts',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
				operation: ['testGroup', 'triggerGroup', 'testRule', 'triggerRule'],
			},
		},
		description: 'Comma-separated list of account IDs',
	},

	// Optional Search & Trigger Limits collection for rule group test
	{
		displayName: 'Test Limits',
		name: 'testLimits',
		type: 'collection',
		placeholder: 'Add Test Limits',
		default: {},
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
				operation: ['testGroup'],
			},
		},
		options: [
			{
				displayName: 'Search Limit',
				name: 'search_limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 200,
				description:
					"Max number of transactions to search for. Don't set this too high, or it will take Firefly III very long to run the test.",
			},
			{
				displayName: 'Triggered Limit',
				name: 'triggered_limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 15,
				description: 'Max number of transactions to trigger',
				hint: "Maximum number of transactions the rule group can actually trigger on, before Firefly III stops. I would suggest setting this to 10 or 15. Don't go above the user's page size, because browsing to page 2 or 3 of a test result would fire the test again, making any navigation efforts very slow.",
			},
		],
	},

	// Pagination Fields for "List & Test"
	// Pagination options
	{
		displayName: 'Pagination Options',
		name: 'paginationOptions',
		type: 'collection',
		placeholder: 'Add Pagination Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['rulesAndGroups'],
				operation: ['listGroups', 'listGroupRules', 'testGroup', 'listRules'],
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
