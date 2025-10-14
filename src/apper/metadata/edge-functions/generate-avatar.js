export default async function handler(event) {
    try {
        // Parse request body
        const body = JSON.parse(event.body || '{}');
        const { name } = body;
        
        // Validate input
        if (!name || typeof name !== 'string' || !name.trim()) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Name is required' })
            };
        }
        
        // Construct Game of Thrones themed avatar generation prompt
        const prompt = `Medieval fantasy portrait of ${name.trim()}, Game of Thrones style, noble house member, regal posture, ornate medieval clothing with house sigils, fur-trimmed cloak, leather armor details, Westeros atmosphere, dramatic lighting, castle backdrop, fantasy realism, high fantasy aesthetic, dignified expression, medieval warrior nobility, cinematic quality, epic fantasy portrait`;
        
        // Call AI image generation service (example using a hypothetical API)
        const apiKey = process.env.AI_IMAGE_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'AI service not configured' })
            };
        }
        
        const response = await fetch('https://api.example.com/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            throw new Error(`AI service error: ${response.statusText}`);
        }
        
        const data = await response.json();
        const avatarUrl = data?.imageUrl || data?.url;
        
        if (!avatarUrl) {
            throw new Error('No avatar URL received from AI service');
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                avatarUrl,
                prompt 
            })
        };
    } catch (error) {
        console.error('Avatar generation error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to generate avatar',
                message: error.message 
            })
        };
    }
}