import {
	INodeProperties,
} from 'n8n-workflow';

export const aboutOperations: INodeProperties[] = [
	{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['about'],
				},
			},
			options: [
					{
							action: 'Get system info',
							name: 'Get General System Info',
							value: 'getSystemInfo',
							description: 'Returns general system information and versions of the (supporting) software',
					},
					{
							action: 'Get auth user info',
							name: 'Get Current Authenticated User Info',
							value: 'getUserInfo',
							description: 'Returns the currently authenticated user',
					},
					{
							action: 'Run cron jobs',
							name: 'Cron Jobs Endpoint',
							value: 'runCronJobs',
							description: 'Firefly III has one endpoint for its various cron related tasks. Send a GET to this endpoint to run the cron. The cron requires the CLI token to be present. The cron job will fire for all users',
					},
			],
			default: 'getSystemInfo',
	},
];

// Fields for the About resource
export const aboutFields: INodeProperties[] = [
	// Required SHOWN Fields for Get Cron Info
	{
		displayName: 'CLI Token',
		name: 'cliToken',
		type: 'string',
		default: '',
		typeOptions: { password: true },
		required: true,
		description: 'The CLI token of any user in Firefly III, required to run the cron job',
		displayOptions: {
				show: {
						resource: ['about'],
						operation: ['runCronJobs'],
				},
		},
},
// Additional Optional fields
{
	displayName: 'Additional Options',
	name: 'additionalOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['about'],
			operation: ['runCronJobs'],
		},
	},
	options: [
		{
			displayName: 'Date',
			name: 'date',
			type: 'string',
			default: '',
			description: 'A date formatted YYYY-MM-DD. This can be used to make the cron job pretend it\'s running on another day.',
	},
	{
			displayName: 'Force',
			name: 'force',
			type: 'boolean',
			default: false,
			description: 'Whether to forces the cron job to fire, regardless of whether it has fired before. This may result in double transactions or weird budgets, so be careful.',
	},
	]
},
];
