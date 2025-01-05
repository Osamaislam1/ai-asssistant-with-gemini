export function extractTopics(content: string): string[] {
  // Extract programming-related topics from the content
  const topics = new Set<string>();
  
  const commonTopics = [
    'javascript', 'python', 'react', 'node', 'typescript',
    'api', 'database', 'testing', 'debugging', 'optimization'
  ];

  commonTopics.forEach(topic => {
    if (content.toLowerCase().includes(topic)) {
      topics.add(topic);
    }
  });

  return Array.from(topics);
}

export function extractCodeSnippets(content: string): string[] {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const matches = content.match(codeBlockRegex) || [];
  return matches.map(block => block.replace(/```/g, '').trim());
}