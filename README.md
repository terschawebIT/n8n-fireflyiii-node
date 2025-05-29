# n8n Firefly III Node

This repository contains a custom node for [n8n](https://n8n.io/), an open-source workflow automation tool. The node integrates with [Firefly III](https://www.firefly-iii.org/), a self-hosted personal finance manager.

🤖 **AI-Agent Ready**: This node is optimized for use with n8n AI Agents and can be used as a tool in automated workflows.

## Features

- ✅ **Comprehensive API Coverage**: Many of Firefly III endpoints implemented, including transactions, search, export and insights
- 🤖 **AI-Agent Compatible**: Designed to work seamlessly with n8n AI Agents as a tool
- 🔄 **Modern n8n Support**: Uses latest n8n-workflow APIs and NodeConnectionType
- 📊 **Structured Outputs**: All operations return standardized success/error responses perfect for AI processing
- 🔍 **Advanced Search**: Full-text search across transactions, accounts, categories and more
- 📈 **Insights & Analytics**: Get financial insights grouped by various criteria
- 📤 **Data Export**: Export your financial data in various formats

## AI Agent Integration

This node is specifically designed to work with n8n AI Agents. AI Agents can use this node as a tool to:

- **Manage Transactions**: Create, update, delete and search financial transactions
- **Handle Accounts**: Create and manage different account types (asset, expense, revenue)
- **Organize Categories**: Create and manage transaction categories
- **Tag Management**: Add and manage tags for better organization
- **Rule Automation**: Create and trigger financial rules for automation
- **Search & Analytics**: Search through financial data and generate insights
- **Data Export**: Export financial reports and data
- **System Management**: Get system information and run maintenance tasks

### AI Agent Capabilities

```json
{
  "capabilities": [
    "manage_transactions",
    "manage_accounts", 
    "manage_categories",
    "manage_tags",
    "manage_rules",
    "search_financial_data",
    "export_financial_data",
    "insights_and_analytics",
    "system_information"
  ]
}
```

## Supported Endpoints

This node supports many of Firefly III API endpoints, such as:

- **/api/v1/transactions**: Create, list, update, and delete transactions.
- **/api/v1/accounts**: Retrieve, create, update, and delete account details.
- **/api/v1/categories**: List, create, update, and delete categories.
- **/api/v1/tags**: Retrieve, create, update, and delete tags.
- **/api/v1/rules**: Manage rules and rule groups.
- **/api/v1/search**: Full-text search across all data types.
- **/api/v1/insight**: Generate financial insights and analytics.
- **/api/v1/data/export**: Export financial data in various formats.
- **/api/v1/about**: Retrieve system and user information.
- **/api/v1/cron**: Run cron jobs.

## Usage

### Regular Workflow Usage

1. Open your n8n instance.
2. Create a new workflow.
3. Add the Firefly III node to your workflow.
4. Configure the node with your Firefly III OAuth2 credentials.
5. Select the desired operation (e.g., Create Transaction, Retrieve Accounts).
6. Execute the workflow to automate your personal finance tasks.

### AI Agent Usage

1. Install the node in your n8n instance
2. Configure your Firefly III OAuth2 credentials
3. Create an AI Agent workflow
4. The Firefly III node will automatically be available as a tool for the AI Agent
5. The AI can now manage your finances through natural language commands

## Configuration

To use this node, you need to configure OAuth2 credentials for your Firefly III instance:

1. Log in to your Firefly III instance.
2. Go to Profile → OAuth → Create New Client
3. Set the redirect URL to your n8n webhook URL
4. Copy the Client ID and Client Secret
5. In n8n, create new Firefly III OAuth2 credentials with:
   - Your Firefly III base URL
   - Client ID and Secret from step 4
   - Authorization and Token URLs (usually `{base_url}/oauth/authorize` and `{base_url}/oauth/token`)

## Output Format

All operations return a standardized format perfect for AI Agent processing:

```json
{
  "success": true,
  "operation": "createTransaction",
  "resource": "transactions", 
  "message": "Transaktion erfolgreich erstellt",
  "data": {
    // API response data
  }
}
```

## Installation

```bash
npm install n8n-nodes-fireflyiii
```

Or install directly in n8n Community Nodes section.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [n8n](https://n8n.io/) - The workflow automation platform
- [Firefly III](https://www.firefly-iii.org/) - Personal finance manager
