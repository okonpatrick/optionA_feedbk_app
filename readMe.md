# Feedbk.app

## Overview
Feedbk.app is a low-code, effortless solution for collecting and analyzing uninstall feedback from users, helping developers and product owners gain meaningful insights to improve their products.

## Background
The most valuable feedback a developer can receive comes from users who decide to stop using their product. Capturing this feedback at the moment of uninstall provides critical insights into user expectations, product gaps, and potential issues that may have been missed during development or testing.

### Benefits of Uninstall Feedback Collection:
- Identifies discrepancies between product descriptions and user expectations.
- Allows users to provide direct feedback rather than leaving negative reviews.
- Helps prioritize high-impact features.
- Exposes product breakages undetected during testing.
- Serves as a measure of product quality and user satisfaction.

### Current Issues with Traditional Feedback Collection:
Many apps and extensions rely on Google Forms or similar tools to collect feedback, but these methods have limitations:
- Lack of contextual information (e.g., crash data, OS details, app version).
- No built-in data insights or clustering for actionable analysis.
- Poorly designed feedback forms that are long, confusing, or lack localization.
- Tailored solutions are often expensive or too complex for basic feedback collection.

## Goal
Feedbk.app provides an efficient, developer-friendly, and cost-effective solution to uninstall feedback collection. It aims to be:
- **Effortless**: Minimal setup for developers.
- **Insightful**: Captures meaningful data and provides actionable insights.
- **Customizable**: Tailored to align with brand identity.

[Watch an overview of the idea](https://app.screencastify.com/v3/watch/5KjJFZGXzBwCVb3OeirT)

## Initial Scope: Browser Extensions
The first implementation of Feedbk.app will focus on Chrome browser extensions due to:
- Chrome’s built-in uninstall event hooks.
- The lack of an SDK for extension development, making a plug-and-play feedback tool highly valuable.
- The guarantee that users are online at the time of uninstall.
- Ease of identifying extensions that lack uninstall feedback and contacting their developers for potential adoption.

## Future Expansion
Beyond Chrome extensions, Feedbk.app can scale to:
- GitHub apps
- Salesforce apps
- WordPress plugins
- Shopify/Wix plugins
- Slack apps

Additionally, the platform can expand vertically to include:
- In-app feedback collection for mobile apps
- Crash log collection
- User journey analysis
- Uninstall detection for various platforms

## Technical Overview
Feedbk.app consists of the following components:
- **Data Stores**: NoSQL-based for flexibility and optimized read-heavy operations.
- **Serverless Function**: Facilitates data access and transformation.
- **User Interface**: Displays feedback insights for developers and product owners.

### Data Stores
#### 1. AppInfo Table
Stores static application information such as:
- Name
- ID
- Version
- Description
- Logo URL

> **Key Considerations:**
> - The table size remains stable over time.
> - Entries may require updates, e.g., if a developer changes their contact email.
> - Optimized for read-heavy operations.

### Development Resources
For a quick guide on Chrome extension development, check out:
- [Writing Extensions for Chrome: A Developer’s Guide](https://daily.dev/blog/writing-extensions-for-chrome-a-developers-guide)
- [Create a Chrome Extension from Scratch Step-by-Step (2024)](https://example.com)

## Getting Started
To integrate Feedbk.app into your Chrome extension:
1. Sign up on Feedbk.app.
2. Install the SDK (coming soon).
3. Configure the uninstall event trigger.
4. Start collecting real-time feedback!

## Contributing
We welcome contributions! To get involved:
- Fork the repository
- Submit feature requests or bug reports
- Join our community discussions

## License
Feedbk.app is licensed under MIT. See [LICENSE](LICENSE) for details.

## Contact
For support or inquiries, reach out to [support@feedbk.app](mailto:support@feedbk.app).

