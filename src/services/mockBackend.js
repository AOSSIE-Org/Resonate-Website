
const DELAY = 500; // Simulate network latency

const getStore = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const setStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Initial Mock Data
if (!localStorage.getItem('posts')) {
    setStore('posts', [
        {
            id: '1',
            userId: 'user-1',
            content: 'Just launched my new social app! 🚀 #coding #react',
            likes: 5,
            timestamp: new Date().toISOString(),
            user: {
                id: 'user-1',
                name: 'Alex Johnson',
                avatar: 'https://i.pravatar.cc/150?u=user-1'
            }
        },
        {
            id: '2',
            userId: 'user-2',
            content: 'Loving the new blue and yellow theme! 🎨',
            likes: 12,
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            user: {
                id: 'user-2',
                name: 'Sarah Lee',
                avatar: 'https://i.pravatar.cc/150?u=user-2'
            }
        }
    ]);
}

export const mockApi = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const user = {
                        id: 'current-user',
                        name: 'Demo User',
                        email,
                        avatar: 'https://i.pravatar.cc/150?u=current-user'
                    };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject('Invalid credentials');
                }
            }, DELAY);
        });
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    logout: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem('currentUser');
                resolve();
            }, DELAY);
        });
    },

    getPosts: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const posts = getStore('posts');
                resolve(posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            }, DELAY);
        });
    },

    createPost: async (content) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                const newPost = {
                    id: Date.now().toString(),
                    userId: user.id,
                    content,
                    likes: 0,
                    timestamp: new Date().toISOString(),
                    user: {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                };
                const posts = getStore('posts');
                setStore('posts', [newPost, ...posts]);
                resolve(newPost);
            }, DELAY);
        });
    },


    likePost: async (postId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const posts = getStore('posts');
                const updatedPosts = posts.map(p =>
                    p.id === postId ? { ...p, likes: p.likes + 1 } : p
                );
                setStore('posts', updatedPosts);
                resolve();
            }, 200);
        })
    },

    // Audio Platform Features
    getLiveRooms: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'room-1',
                        title: '🎵 Lo-Fi Beats & Chill',
                        host: 'Alex Johnson',
                        listeners: 24,
                        tags: ['Music', 'Chill'],
                        participants: [
                            { id: 'u1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=user-1', isSpeaking: true },
                            { id: 'u3', name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?u=u3', isSpeaking: false },
                            { id: 'u4', name: 'Sara Kim', avatar: 'https://i.pravatar.cc/150?u=u4', isSpeaking: false }
                        ]
                    },
                    {
                        id: 'room-2',
                        title: '🚀 Startup Talk: AI Trends',
                        host: 'Elon M.',
                        listeners: 156,
                        tags: ['Tech', 'Business'],
                        participants: [
                            { id: 'u5', name: 'Elon M.', avatar: 'https://i.pravatar.cc/150?u=u5', isSpeaking: false },
                            { id: 'u6', name: 'Naval R.', avatar: 'https://i.pravatar.cc/150?u=u6', isSpeaking: true }
                        ]
                    }
                ]);
            }, DELAY);
        });
    },

    getRoomDetails: async (roomId) => {
        // Simulate fetching room details
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: roomId,
                    title: roomId === 'room-1' ? '🎵 Lo-Fi Beats & Chill' : '🚀 Startup Talk: AI Trends',
                    host: roomId === 'room-1' ? 'Alex Johnson' : 'Elon M.',
                    tags: roomId === 'room-1' ? ['Music', 'Chill'] : ['Tech', 'Business'],
                    participants: [
                        { id: 'p1', name: 'Host User', avatar: 'https://i.pravatar.cc/150?u=host', isSpeaking: true, isMuted: false },
                        { id: 'p2', name: 'Listener One', avatar: 'https://i.pravatar.cc/150?u=l1', isSpeaking: false, isMuted: true },
                        { id: 'p3', name: 'Co-Host', avatar: 'https://i.pravatar.cc/150?u=ch', isSpeaking: false, isMuted: false },
                        { id: 'p4', name: 'New User', avatar: 'https://i.pravatar.cc/150?u=u3', isSpeaking: false, isMuted: false }
                    ]
                });
            }, DELAY);
        });
    },

    findMatch: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 'match-user-1',
                    name: 'Sarah Connor',
                    avatar: 'https://i.pravatar.cc/150?u=stranger',
                    interests: ['React', 'Music', 'Travel', 'AI']
                });
            }, 3000); // 3 second delay to simulate searching
        });
    }
};

