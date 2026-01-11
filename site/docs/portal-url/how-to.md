# Portal URL API - How-To Guide

This guide shows you how to generate and use Portal URLs for different integration scenarios.

## How to Open Incident List

Display a list of active incidents in the NG SOS portal.

### Endpoint
```
GET /incident-list
```

### Basic Usage

```html
<a href="https://portal.ng-sos.com/incident-list">View All Incidents</a>
```

### With Filters

```javascript
const url = new URL('https://portal.ng-sos.com/incident-list');
url.searchParams.append('status', 'active');
url.searchParams.append('type', 'medical');
url.searchParams.append('region', 'prague');

// Result: https://portal.ng-sos.com/incident-list?status=active&type=medical&region=prague
```

### Available Parameters
- `status`: Filter by status (active, resolved, all)
- `type`: Filter by type (medical, fire, police, other)
- `region`: Filter by region (prague, brno, ostrava, etc.)
- `priority`: Filter by priority (low, medium, high, critical)
- `dateFrom`: Start date (ISO 8601 format)
- `dateTo`: End date (ISO 8601 format)

### Response

The user is redirected to the portal showing a filtered incident list:
```
https://portal.ng-sos.com/incident-list?type=medical&region=prague
```

## How to View Incident Details

Open a specific incident's detail page.

### Endpoint
```
GET /incident-detail
```

### Required Parameters
- `incidentId`: The unique incident identifier

### Example

```javascript
function viewIncident(incidentId) {
  const url = `https://portal.ng-sos.com/incident-detail?incidentId=${incidentId}`;
  window.location.href = url;
}

// Usage
viewIncident('inc-67890');
```

### With Return URL

```javascript
function viewIncidentWithReturn(incidentId) {
  const returnUrl = encodeURIComponent(window.location.href);
  const url = `https://portal.ng-sos.com/incident-detail?incidentId=${incidentId}&returnUrl=${returnUrl}`;
  window.open(url, '_blank');
}
```

### With Authentication Token

```javascript
async function viewIncidentWithToken(incidentId, apiToken) {
  const url = new URL('https://portal.ng-sos.com/incident-detail');
  url.searchParams.append('incidentId', incidentId);
  url.searchParams.append('token', apiToken);
  
  window.location.href = url.toString();
}
```

## How to Pre-fill Incident Creation Form

Generate a URL that opens the incident creation form with pre-filled data.

### Endpoint
```
GET /create-incident
```

### Example with Location

```javascript
function createIncidentWithLocation(latitude, longitude, type) {
  const url = new URL('https://portal.ng-sos.com/create-incident');
  url.searchParams.append('type', type);
  url.searchParams.append('latitude', latitude);
  url.searchParams.append('longitude', longitude);
  
  return url.toString();
}

// Usage
const incidentUrl = createIncidentWithLocation(50.0755, 14.4378, 'medical');
// Opens form pre-filled with medical incident in Prague
```

### Example with Full Details

```javascript
function createDetailedIncident(data) {
  const url = new URL('https://portal.ng-sos.com/create-incident');
  
  // Required parameters
  url.searchParams.append('type', data.type);
  
  // Location
  if (data.latitude && data.longitude) {
    url.searchParams.append('latitude', data.latitude);
    url.searchParams.append('longitude', data.longitude);
  }
  if (data.address) {
    url.searchParams.append('address', data.address);
  }
  
  // Details
  if (data.description) {
    url.searchParams.append('description', data.description);
  }
  if (data.priority) {
    url.searchParams.append('priority', data.priority);
  }
  
  // Reporter information
  if (data.reporterName) {
    url.searchParams.append('reporterName', data.reporterName);
  }
  if (data.reporterPhone) {
    url.searchParams.append('reporterPhone', data.reporterPhone);
  }
  
  return url.toString();
}

// Usage
const url = createDetailedIncident({
  type: 'medical',
  latitude: 50.0755,
  longitude: 14.4378,
  address: 'Palladium Shopping Center, Prague',
  description: 'Person collapsed on escalator',
  priority: 'high',
  reporterName: 'John Doe',
  reporterPhone: '+420123456789'
});
```

### Available Parameters
- `type`: Incident type (required) - medical, fire, police, other
- `latitude`, `longitude`: GPS coordinates
- `address`: Human-readable address
- `description`: Incident description (max 2000 chars)
- `priority`: Priority level - low, medium, high, critical
- `reporterName`: Name of person reporting
- `reporterPhone`: Contact phone number
- `reporterEmail`: Contact email
- `tags`: Comma-separated tags

### Mobile Integration Example

```javascript
// Get user's location and create incident
navigator.geolocation.getCurrentPosition((position) => {
  const url = createDetailedIncident({
    type: 'medical',
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    description: 'Emergency assistance needed',
    priority: 'high'
  });
  
  // Open in mobile browser
  window.location.href = url;
});
```

## How to Open Incident Archive

Access historical incidents with advanced filtering.

### Endpoint
```
GET /incident-archive
```

### Example with Date Range

```javascript
function viewIncidentArchive(startDate, endDate, type) {
  const url = new URL('https://portal.ng-sos.com/incident-archive');
  url.searchParams.append('dateFrom', startDate);
  url.searchParams.append('dateTo', endDate);
  if (type) {
    url.searchParams.append('type', type);
  }
  
  return url.toString();
}

// View medical incidents from last month
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
const url = viewIncidentArchive(
  lastMonth.toISOString(),
  new Date().toISOString(),
  'medical'
);
```

### Available Parameters
- `dateFrom`: Start date (ISO 8601)
- `dateTo`: End date (ISO 8601)
- `type`: Incident type
- `region`: Geographic region
- `status`: Status filter
- `search`: Free-text search query
- `page`: Page number for pagination
- `pageSize`: Results per page (default: 50, max: 200)

### Advanced Search Example

```javascript
function searchArchive(searchParams) {
  const url = new URL('https://portal.ng-sos.com/incident-archive');
  
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key]) {
      url.searchParams.append(key, searchParams[key]);
    }
  });
  
  return url.toString();
}

// Usage
const archiveUrl = searchArchive({
  search: 'shopping center',
  type: 'medical',
  region: 'prague',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  page: 1,
  pageSize: 100
});
```

## How to Handle Return Navigation

Allow users to return to your application after portal interaction.

### Using Return URL

```javascript
function openPortalWithReturn(endpoint, params) {
  const url = new URL(`https://portal.ng-sos.com/${endpoint}`);
  
  // Add your parameters
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  // Add return URL
  const returnUrl = `${window.location.origin}/callback`;
  url.searchParams.append('returnUrl', encodeURIComponent(returnUrl));
  
  window.location.href = url.toString();
}

// Usage
openPortalWithReturn('create-incident', {
  type: 'medical',
  latitude: 50.0755,
  longitude: 14.4378
});
```

### Handling Return Callback

```javascript
// On your callback page
function handlePortalReturn() {
  const params = new URLSearchParams(window.location.search);
  
  const incidentId = params.get('incidentId');
  const status = params.get('status');
  
  if (status === 'created' && incidentId) {
    console.log(`Incident ${incidentId} was created successfully`);
    // Update your application state
  } else if (status === 'cancelled') {
    console.log('User cancelled the operation');
  }
}

// Call on page load
handlePortalReturn();
```

## How to Embed Portal in iFrame

Embed portal views within your application.

### Basic iFrame

```html
<iframe 
  src="https://portal.ng-sos.com/incident-list?token=YOUR_TOKEN"
  width="100%" 
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts allow-forms">
</iframe>
```

### Dynamic iFrame with React

```jsx
import React, { useState } from 'react';

function IncidentPortal({ incidentId, apiToken }) {
  const [url] = useState(() => {
    const portalUrl = new URL('https://portal.ng-sos.com/incident-detail');
    portalUrl.searchParams.append('incidentId', incidentId);
    portalUrl.searchParams.append('token', apiToken);
    portalUrl.searchParams.append('embedded', 'true');
    return portalUrl.toString();
  });

  return (
    <div className="portal-container">
      <iframe
        src={url}
        width="100%"
        height="600"
        frameBorder="0"
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="NG SOS Portal"
      />
    </div>
  );
}
```

### iFrame Communication

```javascript
// Parent page - send message to iFrame
const iframe = document.getElementById('portal-iframe');
iframe.contentWindow.postMessage({
  action: 'refreshIncidents'
}, 'https://portal.ng-sos.com');

// Listen for messages from iFrame
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://portal.ng-sos.com') return;
  
  if (event.data.type === 'incidentCreated') {
    console.log('New incident:', event.data.incidentId);
    // Update your application
  }
});
```

## Best Practices

### URL Generation
- Always use `URLSearchParams` to properly encode parameters
- Validate required parameters before generating URLs
- Keep URLs under 2000 characters
- Use meaningful parameter names

### Security
- Never include sensitive tokens in URLs that will be logged
- Use POST for sensitive operations
- Implement CSRF protection
- Validate returnUrl domains

### User Experience
- Open detail views in new tabs (`target="_blank"`)
- Provide clear navigation back to your app
- Show loading indicators during redirects
- Handle errors gracefully

### Error Handling

```javascript
async function safeRedirect(url) {
  try {
    // Validate URL
    new URL(url);
    
    // Check if portal is accessible
    const response = await fetch('https://portal.ng-sos.com/health');
    if (!response.ok) {
      throw new Error('Portal is unavailable');
    }
    
    // Redirect
    window.location.href = url;
  } catch (error) {
    console.error('Failed to redirect to portal:', error);
    // Show error message to user
    alert('Unable to access NG SOS Portal. Please try again later.');
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: Blank page after redirect
- **Solution**: Check if all required parameters are provided
- **Solution**: Verify API token is valid and not expired
- **Solution**: Check browser console for errors

**Issue**: Parameters not applied in portal
- **Solution**: Ensure parameters are properly URL-encoded
- **Solution**: Check parameter names match specification
- **Solution**: Verify data types (numbers as strings in URLs)

**Issue**: Authentication failures
- **Solution**: Include valid token parameter or ensure session cookies
- **Solution**: Check token expiration time
- **Solution**: Verify CORS configuration for your domain

**Issue**: iFrame not loading
- **Solution**: Check CSP and X-Frame-Options headers
- **Solution**: Ensure proper sandbox attributes
- **Solution**: Verify domain is whitelisted for embedding

## Integration Examples

### HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>NG SOS Integration</title>
</head>
<body>
  <button onclick="openIncidentList()">View Incidents</button>
  <button onclick="createIncident()">Report Incident</button>
  
  <script>
    function openIncidentList() {
      window.open('https://portal.ng-sos.com/incident-list', '_blank');
    }
    
    function createIncident() {
      navigator.geolocation.getCurrentPosition((pos) => {
        const url = new URL('https://portal.ng-sos.com/create-incident');
        url.searchParams.append('type', 'medical');
        url.searchParams.append('latitude', pos.coords.latitude);
        url.searchParams.append('longitude', pos.coords.longitude);
        window.open(url.toString(), '_blank');
      });
    }
  </script>
</body>
</html>
```

### React Component

```jsx
import React from 'react';

function EmergencyButton({ type, location, description }) {
  const handleEmergency = () => {
    const url = new URL('https://portal.ng-sos.com/create-incident');
    url.searchParams.append('type', type);
    url.searchParams.append('latitude', location.lat);
    url.searchParams.append('longitude', location.lng);
    url.searchParams.append('description', description);
    url.searchParams.append('priority', 'high');
    
    window.open(url.toString(), '_blank');
  };

  return (
    <button onClick={handleEmergency} className="emergency-btn">
      Report {type} Emergency
    </button>
  );
}
```

## Additional Resources

- [Portal URL API Reference](./api-reference)
- [Getting Started Guide](../getting-started.md)
- [EMS Documentation](../ems/overview.md)
- [PSAP Connector Documentation](../psap-connector/overview.md)

## Support

For integration assistance:
- Email: mdybal@medicalit.eu

