# Types of Zaikio Integration

[[toc]]

Integrations with Zaikio can broadly be grouped into 5 categories, each with its own approach and requirements for integration.

- Single integration (e.g. a Print Service Provider)
- On-premise application (e.g. desktop apps, mobile apps, virtual appliances run on customer hardware)
- Single-tenant application (i.e. a single instance of your product hosts a single customer)
- Multi-tenant application (e.g. a cloud-hosted SaaS product)
- Device integration

It's important to categorise your application correctly into the right kind at the start of development, as it will have implications for how you develop your integration safely, performantly and stably.

## How do I know what type of Integration I need?

A series of simple questions can help you identify the kind of integration you require.

1. Are you integrating for internal purposes within a company? If yes, jump to [Integrating Zaikio Platform with a Private App](/integration/internal-projects.html)
2. Since you are adding Zaikio integration to another product, is that product a device, such as a printing press or folding machine? If yes, jump to [Integrating Zaikio Platform for Devices]()
3. Since you are adding Zaikio integration to a software product, is your software run on-premise? If yes, jump to [Integrating Zaikio Platform for on-Premise/native Applications](/integration/native-apps.html)
4. Alternatively, do you host a single installation of your software for each of your customers as a managed service - we would consider this to be a single-tenant deployment model, and you can find the integration guide here at [Integrating Zaikio Platform for single-tenant Applications](/integration/single-tenant-apps.html)
4. If none of the above were true, you're likely to be adding Zaikio integration to a multi-tenanted, SaaS style application. The guide you require is [Integrating Zaikio Platform for multi-tenant Applications](/integration/multi-tenant-apps.html)

