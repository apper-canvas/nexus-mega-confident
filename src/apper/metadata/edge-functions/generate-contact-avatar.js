import apper from "https://cdn.apper.io/actions/apper-actions.js";

apper.serve(async (req) => {
  try {
    const { name } = await req.json();
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Valid contact name is required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const cleanName = name.trim().replace(/\s+/g, '-');
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=7c3aed,3b82f6,a78bfa&fontSize=40`;
    
    const avatarResponse = await fetch(avatarUrl);
    
    if (!avatarResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to generate avatar from external service'
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const svgContent = await avatarResponse.text();
    const base64Avatar = `data:image/svg+xml;base64,${btoa(svgContent)}`;

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: base64Avatar
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred during avatar generation'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});