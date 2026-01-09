# Portal URL API - Overview

The Portal URL API provides deep linking capabilities for the NG SOS web portal, enabling third-party applications to integrate seamlessly with the NG SOS platform through URL-based navigation.

## What is Portal URL API?

The Portal URL API is a simple but powerful interface that allows external applications to generate URLs pointing to specific views and forms within the NG SOS portal. Instead of building complex UI integrations, you can redirect users to pre-configured portal pages with context-specific parameters.

## Key Capabilities

### Deep Linking
Create direct links to specific portal pages:
- Incident list with filters
- Individual incident details
- Pre-filled incident creation forms
- Incident archive with search parameters

### Pre-filled Forms
Launch the portal with forms populated with data:
- Incident type pre-selected
- Location information pre-filled
- Description template applied
- Priority and tags set

### Context Preservation
Maintain user context across systems:
- Return URLs for navigation back to source application
- Session continuity through secure tokens
- State preservation in URL parameters

## Use Cases

### Use Case 1: Emergency Dispatcher Dashboard
A dispatcher dashboard displays active incidents. When a dispatcher clicks an incident:
1. Dashboard generates a Portal URL with incident ID
2. User is redirected to NG SOS portal
3. Portal displays detailed incident view
4. Dispatcher performs actions in portal
5. Portal redirects back to dashboard when complete

### Use Case 2: Mobile App Integration
A mobile app detects an emergency situation:
1. App collects location and incident details
2. Generates Portal URL with pre-filled incident form
3. Opens portal in mobile browser
4. User confirms/edits details and submits
5. Portal creates incident and shows confirmation

### Use Case 3: Third-Party Report System
An external system needs to file an incident report:
1. System generates Portal URL with incident data
2. Authorized user clicks link
3. Portal displays pre-filled form for review
4. User confirms and submits
5. Incident is created in NG SOS

### Use Case 4: Archive Search
An analyst needs to review past incidents:
1. Generate Portal URL with archive filters (date range, type, region)
2. Portal displays filtered incident archive
3. Analyst reviews historical data
4. Export or additional filtering available in portal

## API Organization

The Portal URL API consists of simple GET endpoints that return web pages:

- **Incident List** (`/incident-list`): View active incidents
- **Incident Details** (`/incident-detail`): View specific incident
- **Create Incident** (`/create-incident`): Pre-filled incident form
- **Incident Archive** (`/incident-archive`): Historical incident search

## Getting Started

To use the Portal URL API:

1. Review the [Getting Started guide](../getting-started.md) for authentication
2. Check the [Portal URL How-To guide](./how-to.md) for URL generation
3. Explore the [OpenAPI specification](./api-reference.mdx)

## URL Structure

Portal URLs follow a consistent pattern:

```
https://portal.ng-sos.com/{endpoint}?param1=value1&param2=value2
```

### Authentication

Authentication is handled through:
- **Session cookies**: For logged-in users
- **API tokens**: For programmatic access (passed as query parameter or header)
- **OAuth redirect**: For third-party applications

## Data Model

### Query Parameters

**Common Parameters**:
- `token`: API authentication token (alternative to cookies)
- `returnUrl`: URL to redirect after action completion
- `lang`: Language code (en, cs, de, etc.)

**Incident Parameters**:
- `incidentId`: Unique incident identifier
- `type`: Incident type (medical, fire, police, other)
- `latitude`, `longitude`: Location coordinates
- `address`: Human-readable address
- `description`: Incident description
- `priority`: Priority level (low, medium, high, critical)

**Filter Parameters**:
- `dateFrom`, `dateTo`: Date range for archive
- `status`: Incident status filter
- `region`: Geographic region filter

## Security Considerations

### URL Security
- Never include sensitive data in URLs that will be logged
- Use POST for sensitive operations (not GET)
- Validate all parameters server-side
- Implement CSRF protection

### Token Handling
- API tokens in URLs have limited lifetime (5 minutes default)
- Single-use tokens for sensitive operations
- Rate limiting on URL generation

### Cross-Origin
- CORS headers configured for approved domains
- Referer checking for additional security
- CSP headers to prevent XSS

## Browser Compatibility

The Portal URL API works with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

Portal URL endpoints are optimized for:
- Fast redirect times (< 100ms)
- Minimal data transfer
- Efficient parameter parsing
- Cached static assets

## Limitations

### URL Length
- Maximum URL length: 2000 characters
- Consider POST for large data payloads
- Use URL shortener for very long URLs

### Parameter Size
- Individual parameters limited to 1000 characters
- Description field limited to 2000 characters
- Use ellipsis for truncated text

## Integration Patterns

### Pattern 1: Simple Redirect
Direct browser redirect for basic integration:
```html
<a href="https://portal.ng-sos.com/incident-list">View Incidents</a>
```

### Pattern 2: Programmatic Generation
Generate URLs server-side with parameters:
```javascript
function generateIncidentUrl(incident) {
  const params = new URLSearchParams({
    type: incident.type,
    latitude: incident.location.lat,
    longitude: incident.location.lng,
    description: incident.description
  });
  return `https://portal.ng-sos.com/create-incident?${params}`;
}
```

### Pattern 3: Popup Integration
Open portal in popup window:
```javascript
function openIncidentInPortal(incidentId) {
  const url = `https://portal.ng-sos.com/incident-detail?incidentId=${incidentId}`;
  window.open(url, 'ngsos', 'width=1200,height=800');
}
```

### Pattern 4: iFrame Embedding
Embed portal views in your application:
```html
<iframe 
  src="https://portal.ng-sos.com/incident-list?token=YOUR_TOKEN"
  width="100%" 
  height="600"
  sandbox="allow-same-origin allow-scripts">
</iframe>
```

## Versioning

Portal URL API follows semantic versioning:
- **Current version**: 1.0.0
- Backward compatible changes increment minor version
- Breaking changes increment major version

URL structure is stable; new parameters are additive.

## Monitoring

Track Portal URL API usage:
- Request count and response times
- Parameter validation errors
- Authentication failures
- User agent and referrer statistics

## Next Steps

- Learn [how to generate URLs](./how-to.md) for different scenarios
- Review the [complete API reference](./api-reference.mdx)
- Explore [EMS](../ems/overview.md) and [PSAP Connector](../psap-connector/overview.md) APIs
