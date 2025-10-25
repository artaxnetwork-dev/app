import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Get additional request information
    const headers = Object.fromEntries(request.headers.entries());
    const url = request.url;
    const method = request.method;
    const timestamp = new Date().toISOString();
    
    // Echo back the data with additional metadata
    const response = {
      message: "Echo endpoint - returning your data",
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
    // Handle JSON parsing errors
    return NextResponse.json(
      { 
        error: "Invalid JSON in request body",
        message: "Please ensure your request contains valid JSON",
        timestamp: new Date().toISOString()
      }, 
      { status: 400 }
    );
  }
}

// Optional: Add a GET method to show endpoint information
export async function GET() {
  return NextResponse.json({
    message: "Echo API Endpoint",
    description: "Send a POST request with JSON data to echo it back",
    usage: "POST /api/echo",
    example: {
      method: "POST",
      url: "/api/echo",
      body: {
        "name": "John Doe",
        "email": "john@example.com",
        "message": "Hello World"
      }
    }
  });
}