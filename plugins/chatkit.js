import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

export default async ({ store }, inject) => {
    const chatManager = new ChatManager({
        instanceLocator: 'v1:us1:21ab6b22-6ce8-4746-a296-0a34f106d7d9',
        userId: String(store.state.Auth.user.id),
        tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/21ab6b22-6ce8-4746-a296-0a34f106d7d9/token' })
    })

    try {
        let currentUser = await chatManager.connect()
        inject('chatkit', { 
            currentUser
        })
    } catch (error) {
        alert('chatkit error')
        console.log('Error on connection', error)
    }
}