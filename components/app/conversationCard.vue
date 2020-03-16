<template>
    <nuxt-link class="conversation-card" exact-active-class="conversation-card--active" :to="`/conversations/${conversation.id}`">
        <div>
            <el-avatar shape="circle" :size="40" fit="cover" :src="image"></el-avatar>
        </div>
        <div class="conversation-card__content hidden-sm-and-down">
            <div class="conversation-card__head">
                <div class="conversation-card__title">{{ title }}</div>
            </div>
            <div class="conversation-card__body">
                <div class="conversation-card__message long-and-truncated">
                    <template v-if="typingUser">
                        {{ typingUser }} is typing ...
                    </template>
                    <template v-else-if="lastMessage">
                        <template v-if="lastMessage.user.id != $auth().id">
                            <b>{{ lastMessage.user.name.split(' ')[0] }} - </b>
                        </template>
                        {{ lastMessage.content }}
                    </template>
                </div>
                <div v-if="lastMessage" class="conversation-card__time">
                    {{ $timeFromNow(lastMessage.createdAt) }}
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
import { PubSub } from 'pubsub-js'

export default {
    props: {
        conversation: { type: Object, required: true }
    },
    data() {
        return {
            lastMessage: null,
            typingUser: ''
        }
    },
    computed: {
        participant() {
            return this.conversation.participants.filter(u => u.id !== this.$auth().id)[0]
        },
        image() {
            return this.participant.avatar
        },
        title() {
            return this.participant.name
        },
    },
    mounted() {
        this.$chatkit.currentUser.subscribeToRoomMultipart({
            roomId: this.conversation.roomId,
            hooks: {
                onMessage: message => {
                    let data = {
                        id: message.id,
                        content: message.parts[0].payload.content,
                        createdAt: message.createdAt,
                        user: this.conversation.participants.find(p => p.id == message.senderId)
                    }
                    this.lastMessage = data
                    PubSub.publish(this.conversation.roomId + '-message', data)
                },
                onUserStartedTyping: user => {
                    if (user.id != this.$auth().id) {
                        this.typingUser = user.name
                        PubSub.publish(this.conversation.roomId + '-typing', user.name)
                    }
                },
                onUserStoppedTyping: user => {
                    this.typingUser = ''
                    PubSub.publish(this.conversation.roomId + '-typing', '')
                },
            },
            messageLimit: 1
        })
    },
}
</script>

<style lang="scss">
.conversation-card {
    padding: 16px;
    display: flex;
    color: #ffffff;
    text-decoration: none;
    &:hover {
        background: #8F38B122;
    }
    &--active {
        background: #8F38B133;
    }
    &__content {
        margin-left: 16px;
        flex-grow: 1;
        line-height: 21px;
        min-width: 0;
    }
    &__head {
        display: flex;
        justify-content: space-between;
    }
    &__body {
        display: flex;
        justify-content: space-between;
        color: #D0D0D0;
    }
    &__title {
        font-weight: 700;
    }
    &__message {
        font-size: 13px;
    }
    &__time {
        font-size: 13px;
    }
}
</style>