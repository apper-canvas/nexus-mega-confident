export default async function generateAvatar(request) {
    try {
        const { name } = await request.json();
        
        if (!name || typeof name !== 'string') {
            return new Response(
                JSON.stringify({ error: 'Name is required and must be a string' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        // Construct cybernetic cyborg-themed avatar generation prompt
        const prompt = `Cybernetic portrait of ${name.trim()}, cyborg theme, futuristic android features, mechanical enhancements, circuit patterns integrated into skin, metallic textures, neon blue and purple accents, glowing tech elements, sci-fi aesthetic, cyberpunk style, high-tech professional look, advanced robotics, digital augmentation`;
        
        return new Response(
            JSON.stringify({ prompt }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to generate avatar prompt' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}