import apper from 'https://cdn.apper.io/actions/apper-actions.js';

apper.serve(async (req) => {
    try {
        const body = await req.json();
        const { name } = body;
        
        if (!name || typeof name !== 'string' || !name.trim()) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Name is required' 
                }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        const prompt = `Medieval fantasy portrait of ${name.trim()}, Game of Thrones style, noble house member, regal posture, ornate medieval clothing with house sigils, fur-trimmed cloak, leather armor details, Westeros atmosphere, dramatic lighting, castle backdrop, fantasy realism, high fantasy aesthetic, dignified expression, medieval warrior nobility, cinematic quality, epic fantasy portrait`;
        
        const apiKey = await apper.getSecret('OPENAI_API_KEY');
        if (!apiKey) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'AI service not configured' 
                }),
                { 
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ 
                model: 'dall-e-3',
                prompt,
                n: 1,
                size: '1024x1024',
                quality: 'standard'
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'AI service error',
                    message: errorData?.error?.message || response.statusText 
                }),
                { 
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        const data = await response.json();
        const avatarUrl = data?.data?.[0]?.url;
        
        if (!avatarUrl) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'No avatar URL received from AI service' 
                }),
                { 
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        return new Response(
            JSON.stringify({ 
                success: true,
                avatarUrl,
                prompt 
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
                error: 'Failed to generate avatar',
                message: error.message 
            }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
});