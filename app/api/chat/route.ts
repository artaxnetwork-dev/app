import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const headers = Object.fromEntries(request.headers.entries());
    const url = request.url;
    const method = request.method;
    const timestamp = new Date().toISOString();
    
    let body;
    const contentType = headers['content-type'] || '';
    
    // Handle different content types
    if (contentType.includes('application/json')) {
      // Parse JSON data
      body = await request.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      // Parse form data
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      // Try to parse as text
      try {
        const text = await request.text();
        body = text || null;
      } catch {
        body = null;
      }
    }
    
    // Echo back the chat data with additional metadata
    const response = {
      message: "Chat endpoint - returning your data",
      timestamp,
      request: {
        method,
        url,
        headers: {
          'content-type': headers['content-type'],
          'user-agent': headers['user-agent'],
          'content-length': headers['content-length'],
        },
        body
      }
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Handle any parsing errors
    return NextResponse.json(
      { 
        error: "Error parsing request body",
        message: "Please check your request format",
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 400 }
    );
  }
}

// Optional: Add a GET method to show endpoint information
export async function GET() {
  return NextResponse.json({
    message: "Chat API Endpoint",
    description: "Send a POST request with chat data to echo it back",
    usage: "POST /api/chat",
    expectedFormat: {
      sessionId: "string (UUID format)",
      action: "string (e.g., 'sendMessage')",
      chatInput: "string (user message)"
    },
    example: {
      method: "POST",
      url: "/api/chat",
      body: {
        "sessionId": "fe5d6ca5dd9a435d9ee56ffdf75f09dd",
        "action": "sendMessage",
        "chatInput": "hey"
      }
    }
  });
}