/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';
import { createTransactionFields } from './createTransaction.fields';

export const transactionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
			},
		},
		options: [
			{
				name: 'List Transactions',
				value: 'listTransactions',
				description: 'Retrieve all transactions',
				action: 'List transactions',
			},
			{
				name: 'Get Transaction',
				value: 'getTransaction',
				description: 'Retrieve a single transaction',
				action: 'Get transaction',
			},
			{
				name: 'Create Transaction',
				value: 'createTransaction',
				description: 'Create a new transaction',
				action: 'Create transaction',
			},
			{
				name: 'Update Transaction',
				value: 'updateTransaction',
				description: 'Update an existing transaction',
				action: 'Update transaction',
			},
			{
				name: 'Delete Transaction',
				value: 'deleteTransaction',
				description: 'Delete a transaction',
				action: 'Delete transaction',
			},
			{
				name: 'Get Attachments',
				value: 'getAttachments',
				description: 'Retrieve attachments for a transaction',
				action: 'Get attachments',
			},
			{
				name: 'Get Piggy Bank Events',
				value: 'getPiggyBankEvents',
				description: 'Retrieve piggy bank events for a transaction',
				action: 'Get piggy bank events',
			},
			{
				name: 'List Transaction Links for a Journal',
				value: 'listTransactionLinks',
				description: 'Lists all the transaction links for an individual journal (individual split)',
				action: 'List a journal transaction links',
			},
			{
				name: 'Get Transaction Journal',
				value: 'getTransactionJournal',
				description:
					'Get a single transaction, based on one of the underlying transaction journals (transaction splits)',
				action: 'Get transaction by journal - split',
			},
			{
				name: 'Delete Split From Transaction',
				value: 'deleteTransactionSplit',
				description: 'Delete an individual journal (split) from a transaction',
				action: 'Delete split from transaction',
			},
		],
		default: 'listTransactions',
	},
];

export const transactionsFields: INodeProperties[] = [
	// Custom clarification notice for using the transaction ID
	{
		displayName: 'The ID below should be the transaction journal / the split ID',
		name: 'Info',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactionLinks', 'getTransactionJournal', 'deleteTransactionSplit'],
			},
		},
		description: 'No description',
	},

	// ----------------------------------
	//     		Top Common Field
	// ----------------------------------
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: [
					'getTransaction',
					'updateTransaction',
					'deleteTransaction',
					'getAttachments',
					'getPiggyBankEvents',
					'listTransactionLinks',
					'getTransactionJournal',
					'deleteTransactionSplit',
				],
			},
		},
		description: 'The ID of the transaction',
	},
	// ----------------------------------
	//    TRANSACTION CREATE/UPDATE FIELDS
	// ----------------------------------
	// General Transaction Call Settings
	{
		displayName: 'Transactions Call Settings',
		name: 'transactionSettings',
		type: 'collection',
		placeholder: 'Add Transaction Settings',
		default: {
			error_if_duplicate_hash: true,
			apply_rules: true,
		},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['createTransaction', 'updateTransaction'],
			},
		},
		options: [
			{
				displayName: 'Error If Duplicate Hash',
				name: 'error_if_duplicate_hash',
				type: 'boolean',
				default: true,
				description: 'Whether to throw an error if a duplicate hash is detected',
			},
			{
				displayName: 'Apply Rules',
				name: 'apply_rules',
				type: 'boolean',
				default: false,
				description: 'Whether to apply rules to the transaction',
			},
			{
				displayName: 'Fire Webhooks',
				name: 'fire_webhooks',
				type: 'boolean',
				default: true,
				description: 'Whether to trigger webhooks for the transaction',
			},
			{
				displayName: 'Group Title',
				name: 'group_title',
				type: 'string',
				default: '',
				description:
					'Title of the transaction if it has been split in more than one piece. Empty otherwise.',
			},
		],
	},
	// CREATE Transaction(s) Data Fields
	{
		displayName: 'Transaction(s)',
		name: 'transactionsData',
		type: 'fixedCollection',
		placeholder: 'Add a Transaction',
		required: true,
		description:
			'The transaction(s) details to create in the call. NOTE: Type, Date, Amount, and Description are required fields.',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['createTransaction'],
			},
		},
		options: [
			{
				name: 'transaction',
				displayName: 'Transaction Data',
				values: [
					{
						displayName: 'Transaction Fields',
						name: 'transactionFields',
						type: 'collection',
						placeholder: 'Add Fields',
						default: {},
						options: [...createTransactionFields],
					},
				],
			},
		],
	},
	// UPDATE Transaction(s) Data Fields
	{
		displayName: 'Transaction(s)',
		name: 'transactionsData',
		type: 'fixedCollection',
		placeholder: 'Add a Transaction',
		required: true,
		description:
			'The transaction(s) details to update in the call. For updating transactions with Splits <a href="https://docs.firefly-iii.org/references/firefly-iii/api/specials/" target="_blank">Read This First</a>.',
		typeOptions: {
			multipleValues: true,
		},
		default: {
			transaction: [{}],
		},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['updateTransaction'],
			},
		},
		options: [
			{
				name: 'transaction',
				displayName: 'Transaction Data',
				values: [
					{
						displayName: 'Transaction Fields',
						name: 'transactionFields',
						type: 'collection',
						placeholder: 'Add Fields',
						default: {},
						options: [
							{
								displayName: 'Tsx Journal ID (if Update)',
								name: 'transaction_journal_id',
								type: 'string',
								default: '',
								description:
									'Transaction journal ID of current transaction (split) - only when updating Splits',
								hint: 'Do Not Use This Field when Creating New Transaction',
							},
							...createTransactionFields,
						],
					},
				],
			},
		],
	},
	// ----------------------------------
	//    Get All List Filter Collections (Type & Date)
	// ----------------------------------
	{
		displayName: 'Transaction Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Transaction Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
			},
		},
		options: [
			{
				displayName: 'Transaction Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Withdrawal', value: 'withdrawal' },
					{ name: 'Deposit', value: 'deposit' },
					{ name: 'Transfer', value: 'transfer' },
					{ name: 'Opening Balance', value: 'opening_balance' },
				],
				default: '',
				description: 'Filter transactions by type',
			},
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'string',
				default: '',
				description: 'Start date for transactions (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'end',
				type: 'string',
				default: '',
				description: 'End date for transactions (YYYY-MM-DD)',
			},
			{
				displayName: 'Custom Transaction Type',
				name: 'customType',
				type: 'string',
				default: '',
				description: 'Instead of the dropdown, incase some weird transaction type is used',
				hint: 'Will be overwritten by the dropdown if set',
			},
		],
	},
	// ----------------------------------
	//      Pagination Options
	// ----------------------------------
	{
		displayName: 'Pagination Options',
		name: 'paginationOptions',
		type: 'collection',
		placeholder: 'Add Pagination Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: [
					'listTransactions',
					'getAttachments',
					'getPiggyBankEvents',
					'listTransactionLinks',
				],
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
