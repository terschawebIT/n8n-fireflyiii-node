/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const createTransactionFields: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Withdrawal', value: 'withdrawal' },
			{ name: 'Deposit', value: 'deposit' },
			{ name: 'Transfer', value: 'transfer' },
			{ name: 'Reconciliation', value: 'reconciliation' },
			{ name: 'Opening Balance', value: 'opening_balance' },
		],
		default: 'withdrawal',
		description: 'The type of transaction',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		default: '',
		description: 'Date of the transaction (YYYY-MM-DD or ISO 8601 format)',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		default: '',
		description: 'Amount of the transaction',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Description of the transaction',
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		description: 'Order of this entry in the list of transactions',
	},
	{
		displayName: 'Currency ID',
		name: 'currency_id',
		type: 'string',
		default: '',
		description:
			"Currency ID. Default is the source account's currency, or the user's default currency. The value you submit may be overruled by the source or destination account.",
	},
	{
		displayName: 'Currency Code',
		name: 'currency_code',
		type: 'string',
		default: '',
		description:
			"Currency code. Default is the source account's currency, or the user's default currency. The value you submit may be overruled by the source or destination account.",
	},
	{
		displayName: 'Foreign Amount',
		name: 'foreign_amount',
		type: 'string',
		default: '',
		description: 'The amount in a foreign currency',
	},
	{
		displayName: 'Foreign Currency ID',
		name: 'foreign_currency_id',
		type: 'string',
		default: '',
		description:
			'Currency ID of the foreign currency. Is required when you submit a foreign amount.',
	},
	{
		displayName: 'Foreign Currency Code',
		name: 'foreign_currency_code',
		type: 'string',
		default: '',
		description:
			'Currency code of the foreign currency. Can be used instead of the foreign_currency_id, but this or the ID is required when submitting a foreign amount.',
	},
	{
		displayName: 'Budget ID',
		name: 'budget_id',
		type: 'string',
		default: '',
		description: 'The budget ID for this transaction',
	},
	{
		displayName: 'Category ID',
		name: 'category_id',
		type: 'string',
		default: '',
		description: 'The category ID for this transaction',
	},
	{
		displayName: 'Category Name',
		name: 'category_name',
		type: 'string',
		default: '',
		description:
			'The name of the category to be used. If the category is unknown, it will be created. If the ID and the name point to different categories, the ID overrules the name.',
	},
	{
		displayName: 'Source Account ID',
		name: 'source_id',
		type: 'string',
		default: '',
		description:
			'ID of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account.',
	},
	{
		displayName: 'Source Account Name',
		name: 'source_name',
		type: 'string',
		default: '',
		description:
			'Name of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account. Can be used instead of the source_id. If the transaction is a deposit, the source_name can be filled in freely: the account will be created based on the name.',
	},
	{
		displayName: 'Destination Account ID',
		name: 'destination_id',
		type: 'string',
		default: '',
		description:
			'ID of the destination account. For a deposit or a transfer, this must always be an asset account. For withdrawals this must be an expense account.',
	},
	{
		displayName: 'Destination Account Name',
		name: 'destination_name',
		type: 'string',
		default: '',
		description:
			'Name of the destination account. You can submit the name instead of the ID. For everything except transfers, the account will be auto-generated if unknown, so submitting a name is enough.',
	},
	{
		displayName: 'Reconciled',
		name: 'reconciled',
		type: 'boolean',
		default: false,
		description:
			'Whether the transaction has been reconciled already or not. When you set this, the amount can no longer be edited by the user.',
	},
	{
		displayName: 'Piggy Bank ID',
		name: 'piggy_bank_id',
		type: 'number',
		default: 0,
		description: 'Optional. Use either this or the piggy bank name.',
	},
	{
		displayName: 'Piggy Bank Name',
		name: 'piggy_bank_name',
		type: 'string',
		default: '',
		description: 'Optional. Use either this or the piggy bank ID.',
	},
	{
		displayName: 'Bill ID',
		name: 'bill_id',
		type: 'string',
		default: '',
		description: 'Optional. Use either this or the bill name.',
	},
	{
		displayName: 'Bill Name',
		name: 'bill_name',
		type: 'string',
		default: '',
		description: 'Optional. Use either this or the bill ID.',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		description: 'Comma-separated tags for the transaction',
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		description: 'Optional transaction notes',
	},
	{
		displayName: 'Internal Reference',
		name: 'internal_reference',
		type: 'string',
		default: '',
		description: 'Reference to internal reference of other systems',
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'string',
		default: '',
		description: 'Reference to external ID in other systems',
	},
	{
		displayName: 'External URL',
		name: 'external_url',
		type: 'string',
		default: '',
		description: 'External, custom URL for this transaction',
	},
];
