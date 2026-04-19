## GitHub Copilot Chat

- Extension: 0.44.0 (prod)
- VS Code: 1.116.0 (560a9dba96f961efea7b1612916f89e5d5d4d679)
- OS: win32 10.0.26200 x64
- GitHub Account: Signed Out

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.207.73.85 (92 ms)
- DNS ipv6 Lookup: Error (15 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (0 ms)
- Electron fetch (configured): HTTP 200 (73 ms)
- Node.js https: HTTP 200 (79 ms)
- Node.js fetch: HTTP 200 (68 ms)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.21 (15 ms)
- DNS ipv6 Lookup: Error (14 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (0 ms)
- Electron fetch (configured): HTTP 200 (813 ms)
- Node.js https: HTTP 200 (809 ms)
- Node.js fetch: HTTP 200 (852 ms)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 20.199.39.224 (18 ms)
- DNS ipv6 Lookup: Error (27 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (428 ms)
- Node.js https: HTTP 200 (444 ms)
- Node.js fetch: HTTP 200 (427 ms)

Connecting to https://mobile.events.data.microsoft.com: HTTP 404 (158 ms)
Connecting to https://dc.services.visualstudio.com: HTTP 404 (832 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (803 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (794 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (288 ms)

Number of system certificates: 94

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).